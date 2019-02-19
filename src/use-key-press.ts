import { useState, useEffect } from 'react'

export function useKeyPress(targetKey: string, useDependencies: true): boolean {
	// State for keeping track of whether key is pressed
	const [keyPressed, setKeyPressed] = useState(false)

	// Add event listeners
	useEffect(
		() => {
			// If pressed key is our target key then set to true
			function downHandler({ key }: KeyboardEvent): void {
				if (key === targetKey) {
					setKeyPressed(true)
				}
			}

			// If released key is our target key then set to false
			function upHandler({ key }: KeyboardEvent): void {
				if (key === targetKey) {
					setKeyPressed(false)
				}
			}

			window.addEventListener('keydown', downHandler)
			window.addEventListener('keyup', upHandler)
			// Remove event listeners on cleanup
			return () => {
				window.removeEventListener('keydown', downHandler)
				window.removeEventListener('keyup', upHandler)
			}
		},
		// eslint-disable-next-line react-hooks/reactive-deps
		useDependencies ? [targetKey] : [], // Empty array ensures that effect is only run on mount and unmount
	)

	return keyPressed
}
