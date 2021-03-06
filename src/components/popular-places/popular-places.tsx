import styled from 'styled-components'
import dayjs from 'dayjs'
import {GetSearchResults} from '../search-form/use-search-results'
import {Button} from '../buttons'

const Grid = styled.div`
	display: grid;
	gap: 32px 32px;
	margin-bottom: 32px;
	@media ${({theme}) => theme.xl} {
		grid-template-columns: 1fr 1fr 1fr;
	}
`

const PlaceCard = styled.div`
	background-image: url(${({img}: {img: string}) => img});
	background-repeat: no-repeat;
	height: 320px;
	display: flex;
	align-items: flex-end;
`

const Place = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 16px;
`

const Name = styled.p`
	font-size: 24px;
	color: ${({theme}) => theme.white};
	padding: 0;
	margin: 0;
`

const Title = styled.h2`
	font-size: 24px;
	padding-top: 24px;
	padding-bottom: 24px;
	text-align: center;
	@media ${({theme}) => theme.xl} {
		font-size: 24px;
		padding-top: 24px;
		padding-bottom: 24px;
		text-align: center;
	}
`

const popularPlaces = [
	{
		name: 'Dubai',
		image: 'https://images.kiwi.com/photos/385x320/dubai_ae.webp',
		to: 'dubai_ae',
	},
	{
		name: 'Las Palmas de Gran Canaria',
		image: 'https://images.kiwi.com/photos/385x320/las-palmas_es.webp',
		to: 'las-palmas_es',
	},
	{
		name: 'Tenerife',
		image: 'https://images.kiwi.com/photos/385x320/tenerife_es.webp',
		to: 'tenerife_es',
	},
]

type Props = {
	getSearchResults: GetSearchResults
}

export default function PopularPlaces({getSearchResults}: Props) {
	return (
		<>
			<Title>Most Popular Places</Title>
			<Grid>
				{popularPlaces.map((place) => {
					return (
						<PlaceCard key={place.name} img={place.image}>
							<Place>
								<Name>{place.name}</Name>
								<Button
									onClick={() => {
										getSearchResults({
											flyFrom: 'prague_cz',
											to: place.to,
											dateFrom: dayjs().format(),
											flyTo: '',
											from: '',
										})
									}}
								>
									See Flights
								</Button>
							</Place>
						</PlaceCard>
					)
				})}
			</Grid>
		</>
	)
}
