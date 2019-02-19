import { useReducer, useCallback, Reducer } from 'react'

interface State<T> {
	past: T[]
	present: T
	future: T[]
}

interface Action<T> {
	type: 'REDO' | 'UNDO' | 'SET' | 'CLEAR'
	newPresent?: T
	initialPresent?: T
}

interface History<T> {
	state: T
	set(newPresent: T): void
	undo(): void
	redo(): void
	clear(): void
	canUndo: boolean
	canRedo: boolean
}

// Our reducer function to handle state changes based on action
function reducer<T>(state: State<T>, action: Action<T>): State<T> {
	const { past, present, future } = state

	switch (action.type) {
		case 'UNDO':
			const previous = past[past.length - 1]
			const newPast = past.slice(0, past.length - 1)

			return {
				past: newPast,
				present: previous,
				future: [present, ...future],
			}
		case 'REDO':
			const next = future[0]
			const newFuture = future.slice(1)

			return {
				past: [...past, present],
				present: next,
				future: newFuture,
			}
		case 'SET':
			const { newPresent } = action

			if (newPresent === present) {
				return state
			}
			return {
				past: [...past, present],
				present: newPresent,
				future: [],
			}
		case 'CLEAR':
			const { initialPresent } = action

			return {
				past: [],
				future: [],
				present: initialPresent,
			}
	}
}

export function useHistory<T>(initialPresent: T): History<T> {
	const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(reducer, {
		// Array of previous state values updated each time we push a new state
		past: [],
		present: initialPresent,
		// Will contain "future" state values if we undo (so we can redo)
		future: [],
	})

	const canUndo = state.past.length !== 0
	const canRedo = state.future.length !== 0

	// Setup our callback functions
	// We memoize with useCallback to prevent unecessary re-renders

	const undo = useCallback(() => {
		if (canUndo) {
			dispatch({ type: 'UNDO' })
		}
	}, [canUndo, dispatch])

	const redo = useCallback(() => {
		if (canRedo) {
			dispatch({ type: 'REDO' })
		}
	}, [canRedo, dispatch])

	const set = useCallback(newPresent => dispatch({ type: 'SET', newPresent }), [dispatch])

	const clear = useCallback(() => dispatch({ type: 'CLEAR', initialPresent }), [dispatch, initialPresent])

	// If needed we could also return past and future state
	return { state: state.present, set, undo, redo, clear, canUndo, canRedo }
}
