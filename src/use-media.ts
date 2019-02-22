import { useState, useEffect, useCallback, useMemo } from 'react'

function arrayFindIndex<T>(array: T[], predicate: (value: T) => boolean): number {
	let index = 0

	for (const item of array) {
		if (predicate(item)) {
			return index
		}
		index++
	}

	return -1
}

export function useMedia<T>(queries: string[], values: T[], defaultValue: T, useDependencies = false): T {
	// Array containing a media query list for each query
	const mediaQueryLists = useMemo(
		() => queries.map(q => window.matchMedia(q)),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		useDependencies ? [queries] : [],
	)

	// Function that gets value based on matching media query
	const getValue = useCallback(
		(): T => {
			// Get index of first media query that matches
			const index = arrayFindIndex(mediaQueryLists, mql => mql.matches)
			// Return related value or defaultValue if none
			return typeof values[index] !== 'undefined' ? values[index] : defaultValue
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		useDependencies ? [mediaQueryLists, values, defaultValue] : [],
	)

	// State and setter for matched value
	const [value, setValue] = useState(getValue)

	useEffect(
		() => {
			// Event listener callback
			// Note: By defining getValue outside of useEffect we ensure that it has ...
			// ... current values of hook args (as this hook callback is created once on mount).
			const handler = (): void => setValue(getValue)
			// Set a listener for each media query with above handler as callback.
			mediaQueryLists.forEach(mql => mql.addListener(handler))
			// Remove listeners on cleanup
			return () => mediaQueryLists.forEach(mql => mql.removeListener(handler))
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		useDependencies ? [mediaQueryLists, setValue, getValue] : [],
	)

	return value
}
