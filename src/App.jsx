import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Board from './components/Board'
import Loader from './components/Loader'
import { toastOptions } from './config/toast'
import { addItem, removeItem } from './store/slice/todo'
import { fetchTodo } from './store/slice/todo/asyncActions'

const App = () => {
	const dispatch = useDispatch()
	const boards = useSelector(state => state.todo.boards)
	const status = useSelector(state => state.todo.status)

	useEffect(() => {
		dispatch(fetchTodo())
	}, [dispatch])

	const onDragEnd = result => {
		if (!result.destination) {
			return
		}

		const sourceBoardId = parseInt(result.source.droppableId, 10)
		const destinationBoardId = parseInt(result.destination.droppableId, 10)
		const itemId = parseInt(result.draggableId, 10)

		if (
			(sourceBoardId === 1 &&
				(destinationBoardId === 2 || destinationBoardId === 3)) ||
			(sourceBoardId === 2 && destinationBoardId === 3)
		) {
			const sourceIndex = boards.findIndex(board => board.id === sourceBoardId)
			const itemToMove = boards[sourceIndex].items.find(
				item => item.id === itemId
			)

			dispatch(removeItem({ boardId: sourceBoardId, itemId }))
			dispatch(addItem({ boardId: destinationBoardId, item: itemToMove }))

			toast.success('Drag-and-drop successful!', toastOptions)
		} else if (sourceBoardId > destinationBoardId) {
			toast.error(
				"Can't move from a larger column to a smaller column.",
				toastOptions
			)
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='app'>
				{status === 'loading' && <Loader />}
				{status === 'success' &&
					boards.map(board => (
						<Board key={board.id} board={board} boards={boards} />
					))}
			</div>
			<ToastContainer />
		</DragDropContext>
	)
}

export default App
