import {Formik, Form, Field} from 'formik'
import DebounceField from './debounce-field'
import styled from 'styled-components'
import {getSearchUrl} from '../../utils/set-search-params'
import {SearchResult} from '../search-results'
import {Button} from '../buttons'
import dayjs from 'dayjs'

const FormLayout = styled(Form)`
	display: flex;
	justify-content: space-around;
`

const Input = styled(Field)`
	border: none;
	background-color: ${({theme}) => theme.dark};
	border-radius: 4px;
	font-size: 15px;
	font-weight: 500;
	padding: 0 20px;
	box-shadow: 0 0 0 2px rgb(134 140 160 / 2%);
	background-size: 14px;
	line-height: 40px;
	background-repeat: no-repeat;
	background-position: 16px 48%;
	color: ${({theme}) => theme.white};
	outline: none;
	::-webkit-calendar-picker-indicator {
		filter: invert(1);
	}
`

type Props = {
	setSearchResults: (results: SearchResult[]) => void
}

export default function SearchForm({setSearchResults}: Props) {
	return (
		<Formik
			initialValues={{
				flyFrom: '',
				to: '',
				dateFrom: '',
				returnFrom: '',
				flyTo: '',
				from: '',
			}}
			onSubmit={async (values) => {
				const departureDate = dayjs(values.dateFrom).format('DD/MM/YYYY')
				const returnDate = dayjs(values.returnFrom).format('DD/MM/YYYY')

				const searchParams = {
					v: 3,
					partner: 'skypicker',
					locale: 'en',
					flyFrom: values.flyFrom,
					to: values.to,
					dateFrom: departureDate,
					dateTo: departureDate,
					returnFrom: returnDate,
					returnTo: returnDate,
					limit: 10,
				}
				const url = getSearchUrl('/flights', searchParams)
				const res = await fetch(url.toString())
				const {data} = await res.json()
				setSearchResults(data)
			}}
		>
			{({isSubmitting}) => (
				<FormLayout>
					<DebounceField
						debounceTime={500}
						name='from'
						fieldName='flyFrom'
						placeholder='From'
					/>
					<DebounceField
						debounceTime={500}
						name='flyTo'
						fieldName='to'
						placeholder='To'
					/>

					<Input name='dateFrom' type='date' />
					<Input name='returnFrom' type='date' />

					<Button type='submit' disabled={isSubmitting}>
						Submit
					</Button>
				</FormLayout>
			)}
		</Formik>
	)
}
