import {SearchResult} from './types'
import styled from 'styled-components'
import Card from './card'

const ResultsWrapper = styled.div`
	min-width: 320px;
	width: 700px;
	margin: 24px auto;
`

type Props = {
	searchResults: SearchResult[]
}

export default function SearchResults({searchResults}: Props) {
	console.log(searchResults)
	return (
		<ResultsWrapper>
			{searchResults.map((travelInfo) => {
				return <Card key={travelInfo.id} travelInfo={travelInfo} />
			})}
		</ResultsWrapper>
	)
}
