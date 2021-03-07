import {SearchResult} from './types'
import styled from 'styled-components'
import Card from './card'
import NoResults from './no-results'

const ResultsWrapper = styled.div`
	min-width: 320px;
	width: 700px;
	margin: 24px auto;
`

type Props = {
	searchResults: SearchResult[]
}

const ResultsMessage = styled.p`
	color: ${({theme}) => theme.white};
`

export default function SearchResults({searchResults}: Props) {
	return (
		<ResultsWrapper>
			{searchResults.length === 0 ? (
				<NoResults />
			) : (
				<>
					<ResultsMessage>Displaying results for next 7 days</ResultsMessage>
					{searchResults.map((travelInfo) => {
						return <Card key={travelInfo.id} travelInfo={travelInfo} />
					})}
				</>
			)}
		</ResultsWrapper>
	)
}
