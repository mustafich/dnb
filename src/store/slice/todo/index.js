import { createSlice } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import { fetchTodo } from './asyncActions'

const initialState = {
	status: 'loading',
	boards: [
		{
			id: 1,
			title: 'Зробити',
			items: [],
		},
		{
			id: 2,
			title: 'Перевірити',
			items: [],
		},
		{
			id: 3,
			title: 'Зроблено',
			items: [],
		},
	],
}

const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const { boardId, item } = action.payload
			const board = state.boards.find(board => board.id === boardId)
			if (board) {
				board.items.push(item)
			}
		},
		removeItem: (state, action) => {
			const { boardId, itemId } = action.payload
			const board = state.boards.find(board => board.id === boardId)
			if (board) {
				board.items = board.items.filter(item => item.id !== itemId)
			}
		},
		removeAllItemsFromColumn: (state, action) => {
			const boardId = action.payload
			const board = state.boards.find(board => board.id === boardId)
			if (board) {
				board.items = []
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTodo.pending, state => {
				state.status = 'loading'
				state.boards[0].items = []
			})
			.addCase(fetchTodo.fulfilled, (state, { payload }) => {
				state.boards[0].items = payload
				state.status = 'success'
			})
			.addCase(fetchTodo.rejected, state => {
				state.status = 'error'
				state.boards[0].items = []
			})
	},
})

todoSlice.propTypes = {
	name: PropTypes.string.isRequired,
	initialState: PropTypes.shape({
		status: PropTypes.oneOf(['loading', 'success', 'error']).isRequired,
		boards: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				title: PropTypes.string.isRequired,
				items: PropTypes.arrayOf(
					PropTypes.shape({
						id: PropTypes.number.isRequired,
						userId: PropTypes.number.isRequired,
						title: PropTypes.string.isRequired,
						completed: PropTypes.bool.isRequired,
					})
				).isRequired,
			})
		).isRequired,
	}),
}

export const { addItem, removeItem, removeAllItemsFromColumn } =
	todoSlice.actions

export default todoSlice.reducer
