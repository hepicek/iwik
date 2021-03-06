import styled from 'styled-components'

export const Button = styled.button`
	background-color: ${({theme}) => theme.white};
	color: ${({theme}) => theme.dark};
	border: none;
	padding: 8px 26px;
	border-radius: 20px;
	cursor: pointer;
	transition: 0.3s;
	white-space: nowrap;
	outline: none;
	opacity: 0.85;
	text-decoration: none;
	&:disabled {
		opacity: 0.25;
		cursor: unset;
	}
`

export const DarkButton = styled(Button)`
	background-color: ${({theme}) => theme.dark};
	color: ${({theme}) => theme.white};
`
