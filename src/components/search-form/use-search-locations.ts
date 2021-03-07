import {SyntheticEvent, useCallback, useState} from 'react'
import {FieldHelperProps, useFormikContext} from 'formik'
import {getLocations} from './get-locations'
import {Location, City} from '../locations/types'

let clearTimeoutFunction: () => void
const initialLocation = {id: '', name: ''}

type Options = {
	debounceTime: number
	fieldName: string
}

export function useSearchLocations(
	options: Options,
	helpers: FieldHelperProps<string>
) {
	const {debounceTime, fieldName} = options
	const {setFieldValue} = useFormikContext()
	const [locations, setLocations] = useState<Location[]>([])
	const [selectedLocation, setSelectedLocation] = useState<City>(
		initialLocation
	)
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	const searchLocations = useCallback(
		(e: SyntheticEvent) => {
			const {value} = e.target as HTMLFormElement
			helpers.setValue(value)
			return new Promise((resolve) => {
				if (clearTimeoutFunction) clearTimeoutFunction()
				const timerId = setTimeout(async () => {
					const rawLocations = await getLocations(value)
					setLocations(rawLocations)
					setIsFilterOpen(true)
				}, debounceTime)
				clearTimeoutFunction = () => {
					clearTimeout(timerId)
					resolve(true)
				}
			})
		},
		[debounceTime, helpers]
	)

	const selectLocation = (city: City) => {
		setSelectedLocation(city)
		setIsFilterOpen(false)
		helpers.setValue('', false)
		setFieldValue(fieldName, city.id)
	}

	const removeLocation = () => {
		setSelectedLocation(initialLocation)
	}

	return {
		searchLocations,
		selectLocation,
		removeLocation,
		selectedLocation: selectedLocation.name,
		locations,
		isFilterOpen,
	}
}
