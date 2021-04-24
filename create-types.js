const { join: pathJoin, relative: pathRelative } = require("path");
const { existsSync } = require("fs");
const { readFile, writeFile, mkdir } = require("fs/promises");
const postcss = require("postcss");
const importPlugin = require("postcss-import-url");
const declarePlugin = require("postcss-ts-classnames");

const dirName = process.cwd();
const cssPath = pathJoin(dirName, "cdn", "cirrus.css");

const typeOutputDir = pathJoin(dirName, "dist");
const typeOutput = pathJoin(typeOutputDir, "cirrus.d.ts");

const green = "\x1b[32m%s\x1b[0m";
const normal = "%s";
const greenNormal = `${green}${normal}`;
const encoding = "utf-8";

(async () => {
  try {
    const css = await readFile(cssPath, encoding);

    if (!existsSync(typeOutputDir)) {
      await mkdir(typeOutputDir);
    }

    await postcss([
      importPlugin,
      declarePlugin({ dest: typeOutput, isModule: true }),
    ]).process(css, { from: cssPath, to: "discarded" });

    console.log(
      greenNormal,
      "Processed",
      ` : ${pathRelative(dirName, cssPath)}`
    );

    await new Promise((resolve) => setTimeout(resolve, 250));

    if (!existsSync(typeOutput)) {
      throw new Error("Failed to create types");
    }

    const rawResult = await readFile(typeOutput, encoding);

    if (!rawResult.length) {
      throw new Error("Results is empty");
    }

    const fixedResult = rawResult.replace("ClassNames", "Cirrus");

    await writeFile(typeOutput, fixedResult, encoding);

    console.log(
      greenNormal,
      "Declared",
      ` : ${pathRelative(dirName, typeOutput)}`
    );
  } catch (error) {
    console.error(error);
  }
})();
