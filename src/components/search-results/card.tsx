import {useState} from 'react'
import dayjs from 'dayjs'
import {DarkButton} from '../buttons'
import styled from 'styled-components'
import {SearchResult} from './types'
import {ReactComponent as Airplane} from './airplane.svg'

const CardWrapper = styled.li`
	backdrop-filter: blur(20px);
	background: rgba(16 18 27 / 40%);
	border-radius: 14px;
	padding: 24px;
	margin-bottom: 24px;
	color: ${({theme}) => theme.white};
	display: flex;
	justify-content: space-between;
	&:last-child {
		-webkit-mask-image: -webkit-gradient(
			linear,
			left top,
			left bottom,
			from(rgba(0, 0, 0, 1)),
			to(rgba(0, 0, 0, 0))
		);
		opacity: 0.2;
		&:after {
          content: '';
          z-index: 10;
          display: flex;
          position: absolute;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
	}
`

const PriceBox = styled.div`
	background-color: ${({theme}) => theme.white};
	color: ${({theme}) => theme.dark};
	padding: 12px;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	button {
		margin-top: auto;
	}
	min-width: 180px;
`
const Airport = styled.span`
	color: ${({theme}) => theme.gray};
`

const Price = styled.p`
	font-size: 32px;
`

const Flight = styled.span`
	background-color: #c06c84;
	padding: 4px 8px;
	border-radius: 16px;
`

const ThankYou = styled.div`
	text-align: center;
	svg {
		height: 60px;
	}
`

type Props = {
	travelInfo: SearchResult
}

export default function Card({travelInfo}: Props) {
	const [book, setBook] = useState(false)
	const {
		id,
		cityFrom,
		cityTo,
		price,
		aTime,
		dTime,
		fly_duration,
		flyFrom,
		flyTo,
	} = travelInfo

	return (
		<CardWrapper key={id}>
			<div>
				<p>{dayjs.unix(dTime).format('ddd. DD')}</p>
				<p>
					● {dayjs.unix(dTime).format('HH:mm')} {cityFrom}{' '}
					<Airport>{flyFrom}</Airport>
				</p>
				<p>
					⇣ <Flight>{fly_duration}</Flight>
				</p>
				<p>
					● {dayjs.unix(aTime).format('HH:mm')} {cityTo}{' '}
					<Airport>{flyTo}</Airport>
				</p>
				<p>{dayjs.unix(aTime).format('ddd. DD')}</p>
			</div>
			<PriceBox>
				{book ? (
					<ThankYou>
						<p>Thank you for your order.</p>
						<Airplane />
						<p>Enjoy your flight.</p>
					</ThankYou>
				) : (
					<>
						<Price>{price} €</Price>
						<DarkButton large onClick={() => setBook(true)}>
							Book
						</DarkButton>
					</>
				)}
			</PriceBox>
		</CardWrapper>
	)
}
