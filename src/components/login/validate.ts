import {FormikErrors} from 'formik'
import {LoginValues} from './login'

const required = 'Required'

export function validate(values: LoginValues) {
	let errors: FormikErrors<LoginValues> = {}
	if (!values.name) {
		errors.name = required
	} else if (!values.password) {
		errors.password = required
	}
	return errors
}
