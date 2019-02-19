import { useState, useEffect } from 'react'

type EasingFunction = (time: number) => number
type Easing = 'linear' | 'elastic' | 'inExpo' | EasingFunction

const easingFunctions: { [name: string]: EasingFunction } = {
	linear: n => n,
	elastic: n => n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
	inExpo: n => Math.pow(2, 10 * (n - 1)),
}

function useAnimationTimer(duration = 1000, delay = 0): number {
	const [elapsed, setTime] = useState(0)

	useEffect(() => {
		let animationFrame: number
		let timerStop: number
		let start: number

		// Function to be executed on each animation frame
		function onFrame(): void {
			setTime(Date.now() - start)
			loop()
		}

		// Call onFrame() on next animation frame
		function loop(): void {
			animationFrame = requestAnimationFrame(onFrame)
		}

		function onStart(): void {
			// Set a timeout to stop things when duration time elapses
			timerStop = setTimeout(() => {
				cancelAnimationFrame(animationFrame)
				setTime(Date.now() - start)
			}, duration)

			// Start the loop
			start = Date.now()
			loop()
		}

		// Start after specified delay (defaults to 0)
		const timerDelay = setTimeout(onStart, delay)

		// Clean things up
		return () => {
			clearTimeout(timerStop)
			clearTimeout(timerDelay)
			cancelAnimationFrame(animationFrame)
		}
	}, [duration, delay]) // Only re-run effect if duration or delay changes

	return elapsed
}

export function useAnimation(easing: Easing = 'linear', duration = 500, delay = 0): number {
	// The useAnimationTimer hook calls useState every animation frame ...
	// ... giving us elapsed time and causing a rerender as frequently ...
	// ... as possible for a smooth animation.
	const elapsed = useAnimationTimer(duration, delay)
	// Amount of specified duration elapsed on a scale from 0 - 1
	const n = Math.min(1, elapsed / duration)
	// Return altered value based on our specified easing function
	return typeof easing === 'string' ? easingFunctions[easing](n) : easing(n)
}
