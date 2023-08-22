import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Popup } from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { toastOptions } from '../../config/toast'
import { removeItem } from '../../store/slice/todo'
import Button from '../Button'
import cls from './Item.module.scss'

const Item = ({ item, boardId }) => {
	const dispatch = useDispatch()
	const [isModalOpen, setIsModalOpen] = useState(false)

	function deleteItem() {
		dispatch(removeItem({ boardId, itemId: item.id }))
		setIsModalOpen(false)

		toast.success('Item deleted successfully!', toastOptions)
	}

	return (
		<div className={cls.item} draggable={false}>
			{item.title}
			{boardId === 2 && (
				<Popup trigger={<Button>Видалити</Button>} modal nested>
					{close => (
						<div className={cls.modal}>
							<Button className={cls.modal__close} onClick={close}>
								&times;
							</Button>
							<div className={cls.modal__header}>Підтвердіть дію</div>
							<div className={cls.modal__content}>
								Ви впевнені, що хочете видалити цей елемент?
							</div>
							<div className={cls.modal__actions}>
								<Button
									className={cls['modal__button-agree']}
									onClick={() => {
										deleteItem()
										close()
									}}
								>
									Так
								</Button>
								<Button
									className={cls['modal__button-disagree']}
									onClick={close}
								>
									Відмінити
								</Button>
							</div>
						</div>
					)}
				</Popup>
			)}
		</div>
	)
}

Item.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired,
	boardId: PropTypes.number.isRequired,
}

export default Item
