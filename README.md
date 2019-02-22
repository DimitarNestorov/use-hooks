# use-hooks

[![npm version](https://badge.fury.io/js/use-hooks.svg)](https://www.npmjs.com/package/use-hooks) [![Greenkeeper badge](https://badges.greenkeeper.io/dimitarnestorov/use-hooks.svg)](https://greenkeeper.io/)

[https://usehooks.com](https://usehooks.com) as an npm package with TypeScript type definitions.

## Installation

```sh
npm install use-hooks
```

```sh
yarn add use-hooks
```

## Available hooks
- [useAnimation](https://usehooks.com/useAnimation/)\* ([demo](https://codesandbox.io/s/7j04olj760))
- [useDarkMode](https://usehooks.com/useDarkMode/)\* ([demo](https://codesandbox.io/s/40m8ovpzr7))
- [useDebounce](https://usehooks.com/useDebounce/) ([demo](https://codesandbox.io/s/91lo30r4wo))
- [useHistory](https://usehooks.com/useHistory/)\* ([demo](https://codesandbox.io/s/5382vkz054))
- [useHover](https://usehooks.com/useHover/) ([demo](https://codesandbox.io/s/8lj6jpn3o9))
- [useKeyPress](https://usehooks.com/useKeyPress/)\* ([demo](https://codesandbox.io/s/jyml5p003))
- [useLocalStorage](https://usehooks.com/useLocalStorage/) ([demo](https://codesandbox.io/s/q3q2nn21j6))
- [useLockBodyScroll](https://usehooks.com/useLockBodyScroll/) ([demo](https://codesandbox.io/s/vq0wz0y87l))
- [useMedia](https://usehooks.com/useMedia/)\* ([demo](https://codesandbox.io/s/xlln407mz4))
- [useOnClickOutside](https://usehooks.com/useOnClickOutside/)\* ([demo](https://codesandbox.io/s/rrqrvy13yq))
- [useOnScreen](https://usehooks.com/useOnScreen/)\* ([demo](https://codesandbox.io/s/j21q4m6l85))
- [usePrevious](https://usehooks.com/usePrevious/) ([demo](https://codesandbox.io/s/34llmr78x1))
- [useScript](https://usehooks.com/useScript/)\* ([demo](https://codesandbox.io/s/k9lv484n4o))
- [useTheme](https://usehooks.com/useTheme/) ([demo](https://codesandbox.io/s/zy4l76ozm))
- [useWhyDidYouUpdate](https://usehooks.com/useWhyDidYouUpdate/) ([demo](https://codesandbox.io/s/kx0p932lpr))
- [useWindowSize](https://usehooks.com/useWindowSize/)\* ([demo](https://codesandbox.io/s/6j22r2y623))

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
