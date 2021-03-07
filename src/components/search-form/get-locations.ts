import {getSearchUrl} from '../../utils/get-url-with-search-params'

export async function getLocations(value: string) {
	const searchparams = {
		term: value,
		location_types: 'airport',
	}
	const url = getSearchUrl('/locations', searchparams)
	try {
		const res = await fetch(url.toString())
		if (!res.ok) {
			throw new Error('Failed to fetch: Lcations')
		}
		const {locations} = await res.json()
		return locations
	} catch (err) {
		console.error(err)
	}
}
