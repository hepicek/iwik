import {ReactComponent as RemoveIcon} from '../search-form/remove.svg'
import styled from 'styled-components'

const Wrapper = styled.div`
	height: 20px;
	background-color: #fefffe;
	padding: 4px 8px;
	margin-right: 4px;
	color: #000000;
	white-space: nowrap;
	opacity: 0.85;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 8px;
`

const RemoveButton = styled.button`
	background-color: inherit;
	border: none;
	outline: none;
	svg {
		width: 24px;
	}
`
type Props = {
	selectedLocation: string
	onClick: () => void
}

export default function Tag({selectedLocation, onClick}: Props) {
	if (!selectedLocation) {
		return null
	}
	return (
		<Wrapper>
			{selectedLocation}
			<RemoveButton type='button' onClick={onClick}>
				<RemoveIcon />
			</RemoveButton>
		</Wrapper>
	)
}
