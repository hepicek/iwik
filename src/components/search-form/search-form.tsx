import {Formik, Form, Field} from 'formik'
import DebounceField from './debounce-field'
import styled, {css} from 'styled-components'
import {Button} from '../buttons'
import {GetSearchResults} from '../../hooks/use-search-results'
import {validate} from './validate'

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
	${({error}: {error: boolean}) =>
		error &&
		css`
			border: 1px solid ${({theme}) => theme.red};
		`}
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
		<Formik
			initialValues={initialValues}
			validate={validate}
			onSubmit={getSearchResults}
			validateOnBlur={false}
		>
			{({isSubmitting, touched, errors}) => (
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
					<Input
						name='dateFrom'
						type='date'
						error={touched.dateFrom && !!errors.dateFrom && true}
					/>
					<Button type='submit' disabled={isSubmitting}>
						Submit
					</Button>
				</FormLayout>
			)}
		</Formik>
	)
}
