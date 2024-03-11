import styled from 'styled-components';

const BackDrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.35);
`;

const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 3em 4em;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1em;
`;

const H2 = styled.h2`
	font-size: 1.5em;
	font-weight: 700;
	margin-bottom: 0.5em;
`;

const P = styled.p`
	font-size: 1em;
	font-weight: bold;
	color: #7a7a7a;
	white-space: pre-line;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	background-color: #888888;
	color: #fff;
	gap: 1em;
	font-size: 1.1em;
	font-weight: bold;
	border: none;
	padding: 1em 2em;
	cursor: pointer;

	&:hover {
		background-color: #585858;
	}
`;

export const M = {
	BackDrop,
	Container,
	H2,
	P,
	Button,
};
