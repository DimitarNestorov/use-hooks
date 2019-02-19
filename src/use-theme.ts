import { useLayoutEffect } from 'react'

export function useTheme(theme: { [key: string]: string }): void {
	useLayoutEffect(() => {
		// Iterate through each value in theme object
		for (const key in theme) {
			// Update css variables in document's root element
			document.documentElement.style.setProperty(`--${key}`, theme[key])
		}
	}, [theme]) // Only call again if theme object reference changes
}
