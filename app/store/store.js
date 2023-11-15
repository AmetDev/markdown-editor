import { configureStore } from '@reduxjs/toolkit'
import undoable from 'redux-undo'
import counterReducer from '../features/UndoRendoSlice.js'

export const store = configureStore({
	reducer: { counter: undoable(counterReducer) },
})
