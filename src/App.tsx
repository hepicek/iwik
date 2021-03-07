import Navigation from './components/navigation'
import SearchForm from './components/search-form'
import styled from 'styled-components'
import SearchResults from './components/search-results'
import {useSearchResults} from './hooks/use-search-results'
import If from './components/if'
import {ReactComponent as Spinner} from './components/icons/spinner.svg'

export const Container = styled.div`
	width: 100%;
	padding-right: 16px;
	padding-left: 16px;
	margin-right: auto;
	margin-left: auto;

	@media ${({theme}) => theme.sm} {
		max-width: 542px;
	}

	@media ${({theme}) => theme.md} {
		max-width: 752px;
	}

	@media ${({theme}) => theme.lg} {
		max-width: 972px;
	}

	@media ${({theme}) => theme.xl} {
		max-width: 1172px;
	}
`

const SearchBox = styled.div`
	min-width: 320px;
	backdrop-filter: blur(20px);
	background: rgba(16 18 27 / 40%);
	border-radius: 14px;
	padding: 24px;
	position: relative;
	z-index: 10;
`

function App() {
	const [searchResults, status, getSearchResults] = useSearchResults()
	return (
		<div className=''>
			<Navigation />
			<Container>
				<SearchBox>
					<SearchForm getSearchResults={getSearchResults} />
				</SearchBox>
				<If condition={status === 'loading'}>
					<Spinner />
				</If>
				<If condition={status === 'error'}>Ups, something went wrong.</If>
				<If condition={status === 'success'}>
					<SearchResults searchResults={searchResults} />
				</If>
			</Container>
		</div>
	)
}

export default App
