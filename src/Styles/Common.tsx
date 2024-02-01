import styled, { css } from 'styled-components';

export const a11y = css`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;

export const Shimmer = css`
	background-color: #e0e0e0;
	box-shadow: 0 0 30px 30px #e0e0e0;
	animation: loading 2s infinite;
	@keyframes loading {
		0% {
			transform: translateX(-50%);
		}
		50% {
			transform: translateX(100%);
		}
		100% {
			transform: translate(200%);
		}
	}
`;
