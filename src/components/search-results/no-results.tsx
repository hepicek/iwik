import styled from 'styled-components'

const Wrapper = styled.div`
	backdrop-filter: blur(20px);
	background: rgba(16 18 27 / 40%);
	border-radius: 14px;
	padding: 24px;
	margin-bottom: 24px;
	color: ${({theme}) => theme.white};
	display: flex;
	justify-content: center;
	font-size: 24px;
`

export default function NoResults() {
	return (
		<Wrapper>
			<p>Sorry, no results available for your search.</p>
		</Wrapper>
	)
}
