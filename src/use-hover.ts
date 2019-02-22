import { useRef, useState, useEffect, MutableRefObject } from 'react'

export function useHover<T>(): [MutableRefObject<T>, boolean] {
	const [value, setValue] = useState(false)

	const ref = useRef(null)

	useEffect(() => {
		const node = ref.current
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref.current]) // Recall only if ref changes

	return [ref, value]
}
