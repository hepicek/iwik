import {validate} from './validate'

const required = 'Required'

describe('.validate', () => {
	it('returns error object for missing from value', () => {
		expect(
			validate({flyFrom: '', from: '', flyTo: '', to: '', dateFrom: ''})
		).toStrictEqual({from: required})
	})

	it('returns error object for missing flyTo value', () => {
		expect(
			validate({
				flyFrom: 'prague',
				from: 'prague',
				flyTo: '',
				to: '',
				dateFrom: '',
			})
		).toStrictEqual({flyTo: required})
	})
	it('returns error object for missing dateFrom value', () => {
		expect(
			validate({
				flyFrom: 'prague',
				from: 'prague',
				flyTo: 'dubai',
				to: 'dubai',
				dateFrom: '',
			})
		).toStrictEqual({dateFrom: required})
	})
	it('passes validation', () => {
		expect(
			validate({
				flyFrom: 'prague',
				from: 'prague',
				flyTo: 'dubai',
				to: 'dubai',
				dateFrom: '2021-03-08',
			})
		).toStrictEqual({})
	})
})
