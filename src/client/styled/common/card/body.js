import styled from 'styled-components';
import commonCSS from '../commonCSS';

export default styled.div`
	${commonCSS.textColor} ${commonCSS.flex()}
	
    width: 100%;
	height: 100%;
	flex-wrap: wrap;
	margin: 0;
	margin-top: 2rem;
	border: 0;
	padding: 0;

	justify-content: center;
	align-content: center;
	align-items: center;

	background-color: ${commonCSS.primaryColor};

	> div {
		justify-content: space-around;
	}
`;
