import {useLocalStorage} from './use-local-storage'
import {renderHook, act} from '@testing-library/react-hooks'

describe('.useLocalStorage', () => {
	it('retrieves value from local storage', () => {
		const key = 'user'
		const defaultValue = 'JoeDoe'

		localStorage.setItem(key, defaultValue)
		const {result} = renderHook(() => useLocalStorage(key))

		expect(result.current[0]).toBe(defaultValue)
	})
	it('sets value to local storage', () => {
		const key = 'user'
		const defaultValue = 'JoeDoe'

		const {result} = renderHook(() => useLocalStorage(key))

		act(() => result.current[1](defaultValue))
		expect(result.current[0]).toBe(defaultValue)
	})
	it('removes stored value from local storage', () => {
		const key = 'user'
		const value = 'JoeDoe'

		localStorage.setItem(key, value)
		const {result} = renderHook(() => useLocalStorage(key))

		act(() => result.current[2]())
		expect(result.current[0]).toBe(undefined)
	})
})
