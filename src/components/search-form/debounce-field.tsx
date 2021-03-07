import {useField, useFormikContext} from 'formik'
import React, {SyntheticEvent, useState} from 'react'
import styled, {css} from 'styled-components'
import {ReactComponent as RemoveIcon} from './remove.svg'

const InputWrapper = styled.div`
	position: relative;
	min-width: 260px;
	background-color: ${({theme}) => theme.dark};
	padding: 0 12px;
	box-shadow: 0 0 0 2px rgb(134 140 160 / 2%);
	color: ${({theme}) => theme.white};
	border-radius: 4px;
	${({error}: {error: boolean}) =>
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
const LocationFilter = styled.ul`
	position: absolute;
	left: 0;
	right: 0;
	list-style: none;
	padding: 12px;
	color: ${({theme}) => theme.white};
	background-color: ${({theme}) => theme.dark};
	border-radius: 4px;
`

const FilterItem = styled.li`
	padding-top: 8px;
	padding-bottom: 8px;
`

const Tag = styled.div`
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

const InputC = styled.div`
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

type City = {
	id: string
	name: string
}

type Location = {
	id: string
	city: City
}

const initialLocation = {id: '', name: ''}

let clearTimeoutFunction: () => void

export default React.memo(function DebounceField(props: Props) {
	const [field, meta, helpers] = useField(props)
	const {setFieldValue} = useFormikContext()
	const {debounceTime, placeholder, fieldName} = props
	const [locations, setLocations] = useState<Location[]>([])
	const [selectedLocation, setSelectedLocation] = useState<City>(
		initialLocation
	)
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const onChange = (e: SyntheticEvent) => {
		const {value} = e.target as HTMLFormElement
		helpers.setValue(value)
		return new Promise((resolve) => {
			if (clearTimeoutFunction) clearTimeoutFunction()
			const timerId = setTimeout(async () => {
				const res = await fetch(
					`https://api.skypicker.com/locations?term=${value}&location_types=airport`
				)
				const {locations: rawLocations} = await res.json()
				setLocations(rawLocations)
				setIsFilterOpen(true)
			}, debounceTime)
			clearTimeoutFunction = () => {
				clearTimeout(timerId)
				resolve(true)
			}
		})
	}
	const selectLocation = (city: City) => {
		setSelectedLocation(city)
		setIsFilterOpen(false)
		helpers.setValue('', false)
		setFieldValue(fieldName, city.id)
	}
	return (
		<InputWrapper error={meta.touched && !!meta.error && true}>
			<InputC>
				{selectedLocation.name && (
					<Tag>
						{selectedLocation.name}
						<RemoveButton
							type='button'
							onClick={() => setSelectedLocation(initialLocation)}
						>
							<RemoveIcon />
						</RemoveButton>
					</Tag>
				)}
				<Input {...field} onChange={onChange} placeholder={placeholder} />
			</InputC>
			{locations.length !== 0 && isFilterOpen && (
				<LocationFilter>
					{locations.map((location) => {
						const {id, city} = location
						return (
							<FilterItem key={id} onClick={() => selectLocation(city)}>
								{city.name} - {id}
							</FilterItem>
						)
					})}
				</LocationFilter>
			)}
		</InputWrapper>
	)
})
