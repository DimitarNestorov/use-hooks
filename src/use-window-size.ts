import { useState, useEffect } from 'react'

interface WindowSize {
	width: number
	height: number
}

const isClient = typeof window === 'object'

function getSize(): WindowSize {
	return {
		width: isClient ? window.innerWidth : undefined,
		height: isClient ? window.innerHeight : undefined,
	}
}

export function useWindowSize(): WindowSize {
	const [windowSize, setWindowSize] = useState(getSize)

	useEffect(() => {
		if (!isClient) {
			return
		}

		function handleResize(): void {
			setWindowSize(getSize())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, []) // Empty array ensures that effect is only run on mount and unmount

	return windowSize
}
