import {render, screen, waitFor} from '@testing-library/react'
import Login from './login'
import userEvent from '@testing-library/user-event'

describe('.Login', () => {
	test('renders and submits login form', async () => {
		const setLogin = jest.fn()
		render(<Login setLogin={setLogin} />)

		userEvent.type(screen.getByPlaceholderText(/your name/i), 'John')
		userEvent.type(screen.getByPlaceholderText(/password/i), '123456')

		userEvent.click(screen.getByRole('button', {name: /submit/i}))

		await waitFor(() => expect(setLogin).toHaveBeenCalledWith(undefined))
	})
})
