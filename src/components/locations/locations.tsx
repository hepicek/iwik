import React from 'react'
import styled from 'styled-components'
import {Location, City} from './types'

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

type Props = {
	locations: Location[]
	selectLocation: (city: City) => void
}

export default function Locations({locations, selectLocation}: Props) {
	if (locations.length !== 0) {
		return null
	}
	return (
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
	)
}
