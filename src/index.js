import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ThemeProvider} from 'styled-components'
import {theme} from './styles/theme'
import GlobalStyle from './styles/global-styles'
import {UserProvider} from './context/login-context'

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<UserProvider>
				<GlobalStyle />
				<App />
			</UserProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
