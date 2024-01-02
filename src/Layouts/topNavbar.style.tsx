import styled, { css } from 'styled-components';
import HomeOutline from '../Assets/home-line.svg';
interface TopNavbarProps {
	$formTag?: boolean;
	$linkTag?: boolean;
}

export const TopNavbarStyle = styled('header')<TopNavbarProps>`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 5px;
	gap: 10px;

	strong {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(0, -50%);
		font-size: 1.2em;
		cursor: pointer;
	}
	${({ $linkTag }) =>
		$linkTag &&
		css`
			& > a {
				width: 50px;
				height: 50px;
				background: #2e2e2e;
				color: #fff;
				font-weight: bold;
				border-radius: 10px;
				background: url(${HomeOutline}) no-repeat center;
			}
		`}

	${({ $formTag }) =>
		$formTag &&
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
