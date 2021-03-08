import SearchForm from '../components/search-form'
import If from '../components/if'
import {ReactComponent as Spinner} from '../components/icons/spinner.svg'
import SearchResults from '../components/search-results'
import PopularPlaces from '../components/popular-places'
import styled from 'styled-components'
import {useSearchResults} from '../components/search-form/use-search-results'
import {useUser} from '../context/login-context'

const SearchBox = styled.div`
	min-width: 320px;
	backdrop-filter: blur(20px);
	background: rgba(16 18 27 / 40%);
	border-radius: 14px;
	padding: 24px;
	position: relative;
	z-index: 10;
`
const Title = styled.h1`
	font-size: 48px;
	padding-top: 48px;
	padding-bottom: 48px;
	text-align: center;
`

export default function Homepage() {
	const user = useUser()
	const limit = user?.name ? 50 : 6
	const [searchResults, status, getSearchResults] = useSearchResults(limit)

	return (
		<>
			<SearchBox>
				<SearchForm getSearchResults={getSearchResults} />
			</SearchBox>
			<If condition={status === 'loading'}>
				<Spinner />
			</If>
			<If condition={status === 'error'}>
				<Title>Ups, something went wrong.</Title>
			</If>
			<If condition={status === 'success'}>
				<SearchResults searchResults={searchResults} />
			</If>
			<If condition={!status}>
				<Title>Start your travel today</Title>
				<PopularPlaces getSearchResults={getSearchResults} />
			</If>
		</>
	)
}
