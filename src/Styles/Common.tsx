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

export const Shimmer = styled.div`
	width: 100%;
	height: 100%;
	background-color: #f2f2f2;
	position: relative;

	@keyframes skeleton-gradient {
		0% {
			background-color: rgba(97, 97, 97, 0.5);
		}
		50% {
			background-color: rgba(97, 97, 97, 0.8);
		}
		100% {
			background-color: rgba(97, 97, 97, 0.5);
		}
	}

	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		animation: skeleton-gradient 1.5s infinite ease-in-out;
	}
`;

export const Label = styled.label`
	${a11y}
`;
