import {Form, Formik} from 'formik'
import {validate} from '../search-form/validate'
import {Button} from '../buttons'
import {Input} from '../input'
import styled from 'styled-components'
import {useSetUser} from '../../context/login-context'
import {SetLogin} from '../types'

const LoginForm = styled(Form)`
	width: 320px;
	backdrop-filter: blur(20px);
	background: rgba(16 18 27 / 40%);
	border-radius: 14px;
	padding: 24px;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	input {
		margin-bottom: 24px;
	}
`

type Props = {
	setLogin: SetLogin
}
export default function Login({setLogin}: Props) {
	const {setValue} = useSetUser()
	return (
		<Formik
			initialValues={{name: '', password: ''}}
			// validate={validate}
			onSubmit={(values, actions) => {
				if (setValue) {
					setValue(JSON.stringify(values))
				}
				setLogin(undefined)
				actions.setSubmitting(false)
			}}
		>
			{({isSubmitting, touched, errors}) => (
				<LoginForm>
					<Input type='text' name='name' placeholder='Your Name' />
					<Input type='password' name='password' placeholder='Password' />
					<Button type='submit' disabled={isSubmitting}>
						Submit
					</Button>
				</LoginForm>
			)}
		</Formik>
	)
}
