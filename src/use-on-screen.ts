import { useState, useEffect, MutableRefObject } from 'react'

export function useOnScreen<T extends Element>(
	ref: MutableRefObject<T>,
	rootMargin = '0px',
	useDependencies = false,
): boolean {
	// State and setter for storing whether element is visible
	const [isIntersecting, setIntersecting] = useState(false)

	useEffect(
		() => {
			const observer = new IntersectionObserver(
				([entry]) => {
					// Update our state when observer callback fires
					setIntersecting(entry.isIntersecting)
				},
				{
					rootMargin,
				},
			)
			if (ref.current) {
				observer.observe(ref.current)
			}
			return () => {
				observer.unobserve(ref.current)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		useDependencies ? [ref, rootMargin] : [],
		// Empty array ensures that effect is only run on mount and unmount
	)

	return isIntersecting
}
