import {getSearchUrl} from './get-url-with-search-params'

describe('.getSearchUrl', () => {
	it('returns base url with path', () => {
		const baseUrl = 'https://api.skypicker.com'
		const path = '/path'
		const url = getSearchUrl(path)
		expect(url.toString()).toBe(`${baseUrl}${path}`)
	})
	it('returns url with search params', () => {
		const baseUrl = 'https://api.skypicker.com'
		const path = '/path'
		const searchParams = {
			from: 'prague',
			to: 'dubai',
		}
		const url = getSearchUrl(path, searchParams)
		expect(url.toString()).toBe(`${baseUrl}${path}?from=prague&to=dubai`)
	})
})
