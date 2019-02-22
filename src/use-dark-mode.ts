import { useEffect } from 'react'

import { useLocalStorage, useMedia } from './'

// Compose our useMedia hook to detect dark mode preference.
// The API for useMedia looks a bit weird, but that's because ...
// ... it was designed to support multiple media queries and return values.
// Thanks to hook composition we can hide away that extra complexity!
// Read the recipe for useMedia to learn more: usehooks.com/useMedia
const usePrefersDarkModeQueries = ['(prefers-color-scheme: dark)']
const usePrefersDarkModeValues = [true]
const usePrefersDarkModeDefaultValue = false
function usePrefersDarkMode(): boolean {
	return useMedia(usePrefersDarkModeQueries, usePrefersDarkModeValues, usePrefersDarkModeDefaultValue, true)
}

export function useDarkMode(
	className = 'dark-mode',
	element = window.document.body,
): [boolean, (value: boolean) => void] {
	// Use our useLocalStorage hook to persist state through a page refresh.
	// Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
	const [enabledState, setEnabledState] = useLocalStorage<boolean>('dark-mode-enabled', undefined)

	// See if user has set a browser or OS preference for dark mode.
	// The usePrefersDarkMode hook composes a useMedia hook (see code below).
	const prefersDarkMode = usePrefersDarkMode()

	// If enabledState is defined use it, otherwise fallback to prefersDarkMode.
	// This allows user to override OS level setting on our website.
	const enabled = typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode

	// Fire off effect that add/removes dark mode class
	useEffect(() => {
		if (enabled) {
			element.classList.add(className)
		} else {
			element.classList.remove(className)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enabled]) // Only re-call effect when value changes

	// Return enabled state and setter
	return [enabled, setEnabledState]
}
