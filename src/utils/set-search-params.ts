const baseUrl = 'https://api.skypicker.com'
export const getSearchUrl = (
	url: string,
	params?: {
		[key: string]: any
	}
): URL => {
	const apiUrl = new URL(url, baseUrl)
	if (!params) {
		return apiUrl
	}
	apiUrl.search = new URLSearchParams(params).toString()
	return apiUrl
}
