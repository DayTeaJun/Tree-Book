import styled from 'styled-components';

export const Layout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const MediaLayout = styled.div`
	width: 100%;
	padding: 10px 0;

	@media (min-width: 1023px) {
		width: 830px;
	}

	@media (min-width: 1439px) {
		width: 1024px;
	}
`;
