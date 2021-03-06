export type SearchResult = {
	id: string
	cityFrom: string
	cityTo: string
	price: string
	aTime: number
	dTime: number
	nightsInDest: number
	duration: {
		departure: number
		return: number
		total: number
	}
}
