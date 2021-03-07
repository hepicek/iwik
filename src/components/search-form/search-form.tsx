import {Formik, Form, Field} from 'formik'
import DebounceField from './debounce-field'
import styled from 'styled-components'
import {Button} from '../buttons'
import {GetSearchResults} from '../../hooks/use-search-results'

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

const initialValues = {
	flyFrom: '',
	to: '',
	from: '',
	flyTo: '',
	dateFrom: '',
}

type Props = {
	getSearchResults: GetSearchResults
}

export default function SearchForm({getSearchResults}: Props) {
	return (
		<Formik initialValues={initialValues} onSubmit={getSearchResults}>
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
					<Button type='submit' disabled={isSubmitting}>
						Submit
					</Button>
				</FormLayout>
			)}
		</Formik>
	)
}
