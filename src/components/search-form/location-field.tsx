import {useField} from 'formik'
import React from 'react'
import styled, {css} from 'styled-components'
import {useSearchLocations} from './use-search-locations'
import Tag from '../locations/tag'
import Locations from '../locations/locations'

const Wrapper = styled.div`
	position: relative;
	min-width: 260px;
	background-color: ${({theme}) => theme.dark};
	padding: 0 12px;
	box-shadow: 0 0 0 2px rgb(134 140 160 / 2%);
	color: ${({theme}) => theme.white};
	border-radius: 4px;
	${({error}: {error?: boolean}) =>
		error &&
		css`
			border: 1px solid ${({theme}) => theme.red};
		`}
`
const Input = styled.input`
	width: 100%;
	height: 90%;
	background-color: ${({theme}) => theme.dark};
	color: ${({theme}) => theme.white};
	border: none;
	outline: none;
	:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px ${({theme}) => theme.dark} inset;
		-webkit-text-fill-color: ${({theme}) => theme.white};
	}
`

const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
`

type Props = {
	debounceTime: number
	name: string
	placeholder: string
	fieldName: string
}

export default React.memo(function DebounceField(props: Props) {
	const {debounceTime, placeholder, fieldName} = props
	const [field, meta, helpers] = useField(props)
	const {
		selectedLocation,
		searchLocations,
		selectLocation,
		removeLocation,
		locations,
		isFilterOpen,
	} = useSearchLocations({debounceTime, fieldName}, helpers)

	return (
		<Wrapper error={meta.touched && !!meta.error ? true : undefined}>
			<InputWrapper>
				<Tag selectedLocation={selectedLocation} onClick={removeLocation} />
				<Input
					{...field}
					onChange={searchLocations}
					placeholder={placeholder}
				/>
			</InputWrapper>
			{isFilterOpen && (
				<Locations locations={locations} selectLocation={selectLocation} />
			)}
		</Wrapper>
	)
})
