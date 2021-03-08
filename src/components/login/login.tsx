import {Form, Formik, useField} from 'formik'
import {validate} from './validate'
import {Button} from '../buttons'
import {Input} from '../input'
import styled, {css} from 'styled-components'
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
`

const InputWrapper = styled.div`
	width: 100%;
	margin-bottom: 24px;
	input {
		width: 100%;
		margin-bottom: 4px;

		${({error}: {error?: boolean}) =>
			error &&
			css`
				border: 1px solid ${({theme}) => theme.red};
			`}
	}
	p {
		margin: 0;
		color: ${({theme}) => theme.red};
		text-align: right;
		font-size: 12px;
	}
`

type TextInputProps = {
	type: string
	name: string
	placeholder: string
}

const TextInput = (props: TextInputProps) => {
	const [field, meta] = useField(props)
	return (
		<InputWrapper error={meta.touched && meta.error ? true : undefined}>
			<Input {...field} {...props} />
			{meta.touched && meta.error ? <p>{meta.error}</p> : null}
		</InputWrapper>
	)
}

export type LoginValues = {
	name: string
	password: string
}

type Props = {
	setLogin: SetLogin
}
export default function Login({setLogin}: Props) {
	const {setValue} = useSetUser()
	return (
		<Formik
			initialValues={{name: '', password: ''}}
			validate={validate}
			onSubmit={(values, actions) => {
				if (setValue) {
					setValue(JSON.stringify(values))
				}
				setLogin(undefined)
				actions.setSubmitting(false)
			}}
		>
			{({isSubmitting}) => (
				<LoginForm>
					<TextInput type='text' name='name' placeholder='Your Name' />
					<TextInput type='password' name='password' placeholder='Password' />
					<Button type='submit' disabled={isSubmitting}>
						Submit
					</Button>
				</LoginForm>
			)}
		</Formik>
	)
}
