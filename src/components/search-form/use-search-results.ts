import dayjs from 'dayjs'
import {getSearchUrl} from '../../utils/get-url-with-search-params'
import {useCallback, useState} from 'react'
import {SearchResult} from '../search-results'

export type FormValues = {
	flyFrom: string
	to: string
	dateFrom: string
	flyTo: string
	from: string
	sort?: string
}

export type GetSearchResults = (values: FormValues) => Promise<void>

type Status = 'loading' | 'success' | 'error' | undefined

type UseSearchResults = [
	searchResults: SearchResult[],
	status: Status,
	getSearchResults: GetSearchResults
]

export function useSearchResults(limit = 6): UseSearchResults {
	const [searchResults, setSearchResults] = useState<SearchResult[]>([])
	const [status, seStatus] = useState<Status>()

	const getSearchResults = useCallback(
		async (values) => {
			const departureDate = dayjs(values.dateFrom).format('DD/MM/YYYY')
			const dateTo = dayjs(values.dateFrom).add(7, 'day').format('DD/MM/YYYY')
			const searchParams = {
				v: 3,
				partner: 'skypicker',
				locale: 'en',
				flyFrom: values.flyFrom,
				to: values.to,
				dateFrom: departureDate,
				dateTo,
				limit,
				sort: values.sort || 'date',
			}
			const url = getSearchUrl('/flights', searchParams)

			seStatus('loading')
			try {
				const res = await fetch(url.toString())
				const body = await res.json()

				if (!res.ok) {
					throw new Error('Failed to fetch: Flights')
				}

				seStatus('success')
				setSearchResults(body.data)
			} catch (err) {
				console.error(err)
				seStatus('error')
			}
		},
		[limit]
	)

	return [searchResults, status, getSearchResults]
}
