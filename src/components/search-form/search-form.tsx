import {Formik, Form, Field} from 'formik'
import DebounceField from './debounce-field'
import styled from 'styled-components'

const FormLayout = styled(Form)`
	display: flex;
	justify-content: space-around;
`

const Button = styled.button`
	background-color: #fefffe;
	border: none;
	padding: 8px 26px;
	color: #000000;
	border-radius: 20px;
	cursor: pointer;
	transition: 0.3s;
	white-space: nowrap;
	outline: none;
	opacity: 0.85;
	text-decoration: none;
	&:disabled {
		opacity: 0.25;
		cursor: unset;
	}
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
export default function SearchForm() {
	return (
		<Formik
			initialValues={{
				flyFrom: '',
				to: '',
				dateFrom: '',
				dateTo: '',
				flyTo: '',
				from: '',
			}}
			onSubmit={async (values) => {
				alert(JSON.stringify(values, null, 2))
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
					<Input name='dateTo' type='date' />

					<Button type='submit' disabled={isSubmitting}>
						Submit
					</Button>
				</FormLayout>
			)}
		</Formik>
	)
}
