# use-hooks

[![npm version](https://badge.fury.io/js/use-hooks.svg)](https://www.npmjs.com/package/use-hooks)

[https://usehooks.com](https://usehooks.com) as an npm package with TypeScript type definitions.

## Installation

```sh
npm install use-hooks
```

```sh
yarn add use-hooks
```

## Available hooks
- [useAnimation](https://usehooks.com/useAnimation/)\*
- [useDarkMode](https://usehooks.com/useDarkMode/)\*
- [useDebounce](https://usehooks.com/useDebounce/)
- [useHistory](https://usehooks.com/useHistory/)\*
- [useHover](https://usehooks.com/useHover/)
- [useKeyPress](https://usehooks.com/useKeyPress/)\*
- [useLocalStorage](https://usehooks.com/useLocalStorage/)
- [useLockBodyScroll](https://usehooks.com/useLockBodyScroll/)
- [useMedia](https://usehooks.com/useMedia/)\*
- [useOnClickOutside](https://usehooks.com/useOnClickOutside/)\*
- [useOnScreen](https://usehooks.com/useOnScreen/)\*
- [usePrevious](https://usehooks.com/usePrevious/)
- [useScript](https://usehooks.com/useScript/)\*
- [useTheme](https://usehooks.com/useTheme/)
- [useWindowSize](https://usehooks.com/useWindowSize/)\*

Hooks marked with "\*" have minor differences (read below).

## Differences

### useAnimation

To supply a custom easing function just pass it as a first argument:

```javascript
import { useAnimation } from 'use-hooks'

const inQuart = (t) => t * t * t * t
function MyComponent() {
	const animation = useAnimation(inQuart, 250)

	// ...
}
```

### useDarkMode

The class name and element are hard coded on the website but in this package they're changable:

```javascript
import { useDarkMode } from 'use-hooks'

const rootElement = document.getElementById('my-root-element')
function App() {
	useDarkMode('my-dark-mode-class-name', rootElement)

	// ...
}
```

### useHistory

Added `initialValue` to the `clear` callbacks dependencies.

### useKeyPress

A second `useDependencies` argument was added allowing the effect to re-run when arguments change.

### useMedia

A fourth `useDependencies` argument was added allowing the effect to re-run when arguments change.

### useOnClickOutside

A third `useDependencies` argument was added allowing the effect to re-run when arguments change.

### useOnScreen

A third `useDependencies` argument was added allowing the effect to re-run when arguments change.

### useScript

Converted an `Array.prototype.includes` call to an `Array.prototype.indexOf` call to support ES5 environments.

### useWindowSize

`isClient` boolean and `getSize` function moved out of hook body.

## Credits
Thanks to [@gabe_ragland](https://twitter.com/gabe_ragland) for creating and maintaining [https://usehooks.com](https://usehooks.com)

Thanks to [@turbobabr](https://github.com/turbobabr) for donating `use-hooks` package name
