import styled, { css } from 'styled-components';

interface BooksPageProps {
	$home?: boolean;
	$detail?: boolean;
	$search?: boolean;
}

export const BookImg = styled.img`
	width: 116px;
	height: 164px;
	text-align: center;
	border-radius: 10px;
`;

export const Books = styled.section<BooksPageProps>`
	img {
		width: 116px;
		height: 164px;
		text-align: center;
		border-radius: 10px;
	}

	/* ${({ $home }) =>
		$home &&
		css`
			padding: 20px;
			display: flex;
			justify-content: center;
			gap: 30px;
			flex-wrap: wrap;

			img {
				filter: grayscale(100%);
				&:hover {
					filter: grayscale(0%);
				}
			}
		`} */

	${({ $search }) =>
		$search &&
		css`
			padding: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
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
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				&:hover {
					text-decoration: underline;
				}
			}
		`}
`;
