import logo from './iwik-logo.png'
import {DarkButton} from '../buttons'
import styled from 'styled-components'
import {useSetUser, useUser} from '../../context/login-context'
import {LoginState, SetLogin} from '../types'

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`

type Props = {
	setLogin: SetLogin
}

export default function Navigation({setLogin}: Props) {
	const user = useUser()
	const {removeValue} = useSetUser()

	const handleLogin = () => {
		let status: LoginState = 'login'
		if (user?.name) {
			status = 'logout'
			removeValue()
		}
		setLogin(status)
	}
	return (
		<Header>
			<img src={logo} className='' alt='logo' width={55} height={60} />
			<DarkButton onClick={handleLogin}>
				{user?.name ? 'Logout' : 'Signup'}
			</DarkButton>
		</Header>
	)
}
