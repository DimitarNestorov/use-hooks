import { useEffect, MutableRefObject } from 'react'

type Handler = (event: MouseEvent | TouchEvent) => void

export function useOnClickOutside<T extends Node>(
	ref: MutableRefObject<T>,
	handler: Handler,
	useDependencies = false,
): void {
	useEffect(
		() => {
			const listener = (event: MouseEvent | TouchEvent): void => {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || !(event.target instanceof Node) || ref.current.contains(event.target)) {
					return
				}

				handler(event)
			}

			document.addEventListener('mousedown', listener)
			document.addEventListener('touchstart', listener)

			return () => {
				document.removeEventListener('mousedown', listener)
				document.removeEventListener('touchstart', listener)
			}
		},
		// eslint-disable-next-line react-hooks/reactive-deps
		useDependencies ? [ref, handler] : [],
		// Empty array ensures that effect is only run on mount and unmount
	)
}
