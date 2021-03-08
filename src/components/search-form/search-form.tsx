import {Formik, Form} from 'formik'
import DebounceField from './location-field'
import styled from 'styled-components'
import {Button} from '../buttons'
import {Input} from '../input'
import {GetSearchResults} from './use-search-results'
import {validate} from './validate'

const FormLayout = styled(Form)`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	@media ${({theme}) => theme.xl} {
		flex-direction: row;
	}
	input[type='date'],
	select {
		margin-bottom: 16px;
		@media ${({theme}) => theme.xl} {
			margin-bottom: 0;
		}
	}
	select {
		height: 42px;
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
						error={touched.dateFrom && !!errors.dateFrom ? true : undefined}
					/>
					<Input name='sort' as='select'>
						<option value='date'>Date</option>
						<option value='price'>Price</option>
					</Input>
					<Button type='submit' disabled={isSubmitting}>
						Submit
					</Button>
				</FormLayout>
			)}
		</Formik>
	)
}
