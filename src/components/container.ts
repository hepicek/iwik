import styled from 'styled-components'

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
