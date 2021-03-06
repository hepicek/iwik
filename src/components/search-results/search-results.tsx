import {SearchResult} from './types'
import styled from 'styled-components'
import {DarkButton} from '../buttons'

const ResultsWrapper = styled.div`
	min-width: 320px;
	width: 700px;
	margin: 24px auto;
`

const Card = styled.div`
	backdrop-filter: blur(20px);
	background: rgba(16 18 27 / 40%);
	border-radius: 14px;
	padding: 24px;
	margin-bottom: 24px;
	color: ${({theme}) => theme.white};
	display: flex;
	justify-content: space-between;
`

const PriceBox = styled.div`
	background-color: ${({theme}) => theme.white};
	color: ${({theme}) => theme.dark};
	padding: 12px;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Price = styled.p`
	font-size: 24px;
`

type Props = {
	searchResults: SearchResult[]
}

export default function SearchResults({searchResults}: Props) {
	console.log(searchResults)
	return (
		<ResultsWrapper>
			{searchResults.map((item) => {
				const {
					id,
					cityFrom,
					cityTo,
					price,
					aTime,
					dTime,
					nightsInDest,
					duration: {departure, return: returnTime, total},
				} = item
				return (
					<Card key={id}>
						<div>
							<div>
								<p>{}</p>
								<p>{cityFrom}</p>
								<p>{cityTo}</p>
							</div>
							<div>
								<p>{cityTo}</p>
								<p>{cityFrom}</p>
							</div>
						</div>
						<PriceBox>
							<Price>{price} €</Price>
							<DarkButton>Book</DarkButton>
						</PriceBox>
					</Card>
				)
			})}
		</ResultsWrapper>
	)
}
