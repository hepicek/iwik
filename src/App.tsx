import Navigation from './components/navigation'
import styled from 'styled-components'
import If from './components/if'
import Login from './components/login/login'
import {useState} from 'react'
import {LoginState} from './components/types'
import {useUser} from './context/login-context'
import Homepage from './homepage'
import {Container} from './components/container'

const Note = styled.p`
	position: fixed;
	bottom: 24px;
`

function App() {
	const [login, setLogin] = useState<LoginState>()
	const user = useUser()
	return (
		<Container>
			<Navigation setLogin={setLogin} />
			{login === 'login' ? <Login setLogin={setLogin} /> : <Homepage />}
			<If condition={!user?.name}>
				<Note>
					Note: Your search results are limited to 5 items. Please, signup to
					unlock full search.
				</Note>
			</If>
		</Container>
	)
}

export default App
