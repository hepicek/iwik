import {useEffect, useState} from 'react'

type UseLocalStorage = [string | undefined, (value: string) => void, () => void]

export function useLocalStorage(
	key: string,
	initialValue?: string
): UseLocalStorage {
	const [storedValue, setStoredValue] = useState(initialValue)

	useEffect(() => {
		try {
			const item = localStorage.getItem(key)
			setStoredValue(item || initialValue)
		} catch (error) {
			console.error(error)
			setStoredValue(initialValue)
		}
	}, [initialValue, key])

	const setValue = (value: string) => {
		if (typeof window === 'undefined') {
			return
		}
		try {
			setStoredValue(value)
			localStorage.setItem(key, value)
		} catch (error) {
			console.error(error)
		}
	}

	const removeValue = () => {
		setStoredValue(undefined)
		localStorage.removeItem(key)
	}
	return [storedValue, setValue, removeValue]
}
