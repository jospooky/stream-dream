import styled from 'styled-components';
import commonCSS from './commonCSS';

export default styled.div `
	@media(min-width: 990px) {
		padding-left: 15rem;
	}
	
	align-items: center;
	
	padding-top: 1rem;
	min-height: calc(100vh - 4rem);

	${commonCSS.flex('column')}
`