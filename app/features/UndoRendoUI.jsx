'use client'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from 'redux-undo'

import { selectCount } from './UndoRendoSlice.js'

export function Counter() {
	const { value } = useSelector(selectCount)

	const dispatch = useDispatch()

	return (
		<div>
			<div>
				<button
					aria-label='Undo last change'
					onClick={() => dispatch(ActionCreators.undo())}
					style={{ marginLeft: 10 }}
				>
					Undo
				</button>
				<button
					aria-label='Undo last change'
					onClick={() => dispatch(ActionCreators.redo())}
					style={{ marginLeft: 10 }}
				>
					Redo
				</button>
			</div>
		</div>
	)
}
