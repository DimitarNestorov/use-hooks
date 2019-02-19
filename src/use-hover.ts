import { useRef, useState, useEffect, MutableRefObject } from 'react'

export function useHover<T>(): [MutableRefObject<T>, boolean] {
	const [value, setValue] = useState(false)

	const ref = useRef(null)

	const node = ref.current
	useEffect(() => {
		if (node) {
			const handleMouseOver = (): void => setValue(true)
			const handleMouseOut = (): void => setValue(false)

			node.addEventListener('mouseover', handleMouseOver)
			node.addEventListener('mouseout', handleMouseOut)

			return () => {
				node.removeEventListener('mouseover', handleMouseOver)
				node.removeEventListener('mouseout', handleMouseOut)
			}
		}
	}, [node]) // Recall only if ref changes

	return [ref, value]
}
