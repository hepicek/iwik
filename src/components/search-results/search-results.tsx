import {SearchResult} from './types'
import styled from 'styled-components'
import Card from './card'
import NoResults from './no-results'
import {ReactComponent as LockIcon} from './lock-icon.svg'
const ResultsWrapper = styled.div`
	min-width: 320px;
	max-width: 700px;
	margin: 24px auto;
`

type Props = {
	searchResults: SearchResult[]
}

const ResultsMessage = styled.p`
	color: ${({theme}) => theme.white};
`
const Cards = styled.ul`
	position: relative;
	padding: 0;
`
const Overlay = styled.div`
	height: 274px;
	font-size: 24px;
	text-align: center;
	color: ${({theme}) => theme.white};
	svg {
		height: 96px;
		fill: ${({theme}) => theme.white};
	}
	margin-top: -150px;
`

export default function SearchResults({searchResults}: Props) {
	return (
		<ResultsWrapper>
			{searchResults.length === 0 ? (
				<NoResults />
			) : (
				<>
					<ResultsMessage>Displaying results for next 7 days</ResultsMessage>
					<Cards>
						{searchResults.map((travelInfo) => {
							return <Card key={travelInfo.id} travelInfo={travelInfo} />
						})}
					</Cards>
					<Overlay>
						<LockIcon />
						<p>
							Your search results are limited to 5 items. Please, signup to
							unlock full search.
						</p>
					</Overlay>
				</>
			)}
		</ResultsWrapper>
	)
}
