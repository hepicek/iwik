import styled, {css} from 'styled-components'
import {Field} from 'formik'

export const Input = styled(Field)`
	border: none;
	background-color: ${({theme}) => theme.dark};
	border-radius: 4px;
	font-size: 15px;
	font-weight: 500;
	padding: 0 20px;
	box-shadow: 0 0 0 2px rgb(134 140 160 / 2%);
	background-size: 14px;
	line-height: 40px;
	background-repeat: no-repeat;
	background-position: 16px 48%;
	color: ${({theme}) => theme.white};
	outline: none;
	::-webkit-calendar-picker-indicator {
		filter: invert(1);
	}
	${({error}: {error?: boolean}) =>
		error &&
		css`
			border: 1px solid ${({theme}) => theme.red};
		`}
`
