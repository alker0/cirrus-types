# cirrus-types

This library is a type declaration of CSS class names in [cirrus-ui](https://github.com/Spiderpig86/Cirrus).


## Install

```bash
npm install @alker0/cirrus-types
```

## Usage

```ts
import { Cirrus } from "@alker0/cirrus-types";

const col: Cirrus = 'col';
```

You can also use the type from global.

```ts
import { Cirrus as CirrusClasses } from "@alker0/cirrus-types";

declare global {
  type Cirrus = CirrusClasses;
}
```

## License
MIT
