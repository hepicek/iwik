import React, {useContext, createContext} from 'react'
import {useLocalStorage} from '../hooks/use-local-storage'

export const LOGIN_LS_KEY = 'login'

type User = {
	name: string
	password: string
}

type SetUserState = {
	setValue: (state: string) => void
	removeValue: () => void
}

const UserContext = createContext<User | undefined>(undefined)
const SetUserStateContext = createContext<SetUserState>({
	setValue: () => {},
	removeValue: () => {},
})

type Props = React.PropsWithChildren<{}>

export const UserProvider = ({children}: Props) => {
	const [value, setValue, removeValue] = useLocalStorage(LOGIN_LS_KEY)
	const user = value ? JSON.parse(value) : {name: '', password: ''}
	return (
		<SetUserStateContext.Provider value={{setValue, removeValue}}>
			<UserContext.Provider value={user}>{children}</UserContext.Provider>
		</SetUserStateContext.Provider>
	)
}

export const useUser = () => useContext(UserContext)
export const useSetUser = () => useContext(SetUserStateContext)
