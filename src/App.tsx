import Navigation from './components/navigation'
import SearchForm from './components/search-form'
import styled from 'styled-components'
import {useState} from 'react'
import SearchResults, {SearchResult} from './components/search-results'

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
`

function App() {
	const [searchResults, setSearchResults] = useState<SearchResult[]>([])
	return (
		<div className=''>
			<Navigation />
			<Container>
				<SearchBox>
					<SearchForm setSearchResults={setSearchResults} />
				</SearchBox>
				<SearchResults searchResults={searchResults} />
			</Container>
		</div>
	)
}

export default App
