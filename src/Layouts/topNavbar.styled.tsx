import styled, { css } from 'styled-components';

interface TopNavbarProps {
	formTag: boolean;
}

export const TopNavbar = styled('header')<TopNavbarProps>`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 5px;

	${({ formTag }) =>
		formTag &&
		css`
			form {
				display: flex;
				label {
					clip: rect(1px, 1px, 1px, 1px);
					clip-path: inset(50%);
					width: 1px;
					height: 1px;
					margin: -1px;
					overflow: hidden;
					position: absolute;
				}
				input {
					font-size: 18px;
					margin-right: 10px;
					padding: 0 5px 0 5px;
					border: none;
					border-bottom: solid 1px black;
					&:focus {
						outline: none;
					}
				}
				button {
					border: 0;
					border-radius: 5px;
					background: skyblue;
					padding: 10px;
					color: #fff;
					cursor: pointer;
				}
			}
		`}
`;
