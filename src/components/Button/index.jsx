import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import cls from './Button.module.scss'

const Button = forwardRef(({ children, className, onClick }, ref) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className={`${cls.button} ${className}`}
			ref={ref}
		>
			{children}
		</button>
	)
})

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
}

Button.defaultProps = {
	className: '',
	onClick: () => {},
}

export default Button
