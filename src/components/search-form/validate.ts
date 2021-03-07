import {FormikErrors} from 'formik'
import {FormValues} from './use-search-results'

const required = 'Required'

export function validate(values: FormValues) {
	let errors: FormikErrors<FormValues> = {}
	if (!values.from && !values.flyFrom) {
		errors.from = required
	} else if (!values.flyTo && !values.to) {
		errors.flyTo = required
	} else if (!values.dateFrom) {
		errors.dateFrom = required
	}
	return errors
}
