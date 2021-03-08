import Navigation from './components/navigation'
import Login from './components/login'
import {useState} from 'react'
import {LoginState} from './components/types'
import Homepage from './homepage'
import {Container} from './components/container'

function App() {
	const [login, setLogin] = useState<LoginState>()
	return (
		<Container>
			<Navigation setLogin={setLogin} />
			{login === 'login' ? <Login setLogin={setLogin} /> : <Homepage />}
		</Container>
	)
}

export default App
