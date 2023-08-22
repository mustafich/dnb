import { configureStore } from '@reduxjs/toolkit'
import todo from './slice/todo'

export const store = configureStore({
	reducer: {
		todo,
	},
})
