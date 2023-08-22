import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../../config/axios'

export const fetchTodo = createAsyncThunk('todo/fetchTodoStatus', async () => {
	try {
		const response = await instance.get('')
		return response.data
	} catch (error) {
		throw Error('Failed to fetch data from the server')
	}
})
