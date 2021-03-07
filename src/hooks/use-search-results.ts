import dayjs from 'dayjs'
import {getSearchUrl} from '../utils/set-search-params'
import {useCallback, useState} from 'react'
import {SearchResult} from '../components/search-results'

type Values = {
	flyFrom: string
	to: string
	dateFrom: string
	flyTo: string
	from: string
}

export type GetSearchResults = (values: Values) => Promise<void>

type Status = 'loading' | 'success' | 'error' | undefined

type UseSearchResults = [
	searchResults: SearchResult[],
	status: Status,
	getSearchResults: GetSearchResults
]

export function useSearchResults(limit = 5): UseSearchResults {
	const [searchResults, setSearchResults] = useState<SearchResult[]>([])
	const [status, seStatus] = useState<Status>()

	const getSearchResults = useCallback(
		async (values) => {
			const departureDate = dayjs(values.dateFrom).format('DD/MM/YYYY')

			const searchParams = {
				v: 3,
				partner: 'skypicker',
				locale: 'en',
				flyFrom: values.flyFrom,
				to: values.to,
				dateFrom: departureDate,
				dateTo: departureDate,
				limit,
			}
			const url = getSearchUrl('/flights', searchParams)
			seStatus('loading')
			try {
				const res = await fetch(url.toString())
				const {data} = await res.json()
				seStatus('success')
				setSearchResults(data)
			} catch (err) {
				console.error(err)
				seStatus('error')
			}
		},
		[limit]
	)

	return [searchResults, status, getSearchResults]
}
