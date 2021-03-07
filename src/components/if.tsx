import {ReactNode} from 'react'

type Props = {
	children: ReactNode
	condition: boolean
}
export default function If({children, condition}: Props) {
	if (condition) {
		return <>{children}</>
	}

	return null
}
