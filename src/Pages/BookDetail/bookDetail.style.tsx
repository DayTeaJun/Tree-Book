import styled from 'styled-components';

export const BookDetailSection = styled.section`
	display: flex;
	gap: 20px;
	max-width: 800px;
	padding: 20px;

	img {
		height: 100%;
		text-align: center;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 8px;
		a {
			cursor: pointer;
			color: skyblue;
		}
	}
`;
