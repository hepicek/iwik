import {render, screen} from '@testing-library/react'
import App from './App'

describe('.App', () => {
	test('renders homepage', () => {
		render(<App />)
		expect(screen.getByText(/Start your travel today/i)).toBeInTheDocument()
	})
})
