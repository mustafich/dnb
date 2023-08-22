import PropTypes from 'prop-types'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toast'
import { removeAllItemsFromColumn } from '../../store/slice/todo'
import Button from '../Button'
import Item from '../Item'
import cls from './Board.module.scss'

const Board = ({ board }) => {
	const dispatch = useDispatch()

	const deleteAllItems = () => {
		dispatch(removeAllItemsFromColumn(board.id))

		toast.success('All items deleted successfully!', toastOptions)
	}

	return (
		<div className={cls.root}>
			<Droppable droppableId={board.id.toString()}>
				{provided => (
					<div
						className={cls.board}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<div className={cls.board__title}>{board.title}</div>
						{board.items.map((item, index) => (
							<Draggable
								key={item.id}
								draggableId={item.id.toString()}
								index={index}
							>
								{provided => (
									<div
										className={cls.board__item}
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<Item item={item} boardId={board.id} />
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			{board.id === 3 && board.items.length > 0 && (
				<Button className={cls.button} onClick={deleteAllItems}>
					Видалити всі
				</Button>
			)}
		</div>
	)
}

Board.propTypes = {
	board: PropTypes.shape({
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
	}).isRequired,
}

export default Board
