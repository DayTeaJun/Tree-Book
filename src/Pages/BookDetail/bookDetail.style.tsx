import styled from 'styled-components';

export const BookDetailSection = styled.section`
	display: flex;
	gap: 20px;
	max-width: 800px;
	padding: 20px;

	h2 {
		font-weight: bold;
		font-size: 20px;
		margin-bottom: 5px;
	}

	img {
		height: 100%;
		text-align: center;
		border-radius: 10px;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 8px;

		dl {
			display: flex;
			font-weight: 200;
			dt {
				flex-shrink: 0;
				width: 80px;
				margin-right: 10px;
				border-right: solid 2px #bab7b6;
				font-weight: 600;
			}
		}

		a {
			text-align: center;
			font-size: 13px;
			cursor: pointer;
			color: skyblue;
		}
	}
`;
