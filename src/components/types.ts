export type LoginState = 'login' | 'logout' | undefined

export type SetLogin = (status: LoginState) => void
