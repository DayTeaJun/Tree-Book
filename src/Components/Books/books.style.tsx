import styled, { css } from 'styled-components';

interface BooksPageProps {
	Detail?: boolean;
	Home?: boolean;
	Search?: boolean;
}

export const Books = styled.section<BooksPageProps>`
	img {
		width: 116px;
		height: 164px;
		text-align: center;
		border-radius: 10px;
	}

	${({ Search }) =>
		Search &&
		css`
			width: 1080px;
			padding: 20px;
			display: flex;
			justify-content: center;
			gap: 5px;
			flex-wrap: wrap;
			a {
				padding: 10px;
				width: 150px;
			}
			h2 {
				text-align: center;
				font-size: 14px;
				font-weight: bold;
				margin-top: 5px;
			}
		`}

	${({ Detail }) =>
		Detail &&
		css`
			display: flex;
			gap: 20px;
			max-width: 800px;
			padding: 20px;

			h2 {
				font-weight: bold;
				font-size: 20px;
				margin-bottom: 5px;
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
		`}
`;
