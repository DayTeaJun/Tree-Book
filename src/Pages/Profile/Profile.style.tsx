import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.main`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid black;
	border-radius: 10px;
	padding: 20px 24px;
	min-height: 200px;
	gap: 10px;
`;

const Container = styled.div`
	width: 100%;
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
`;

const Img = styled.img`
	width: 150px;
	height: 150px;
`;

const ALink = styled(Link)`
	margin-top: 20px;
	padding: 10px 12px;
	font-size: 1.1em;
	border-radius: 10px;
	background-color: green;
	color: white;
`;

const PLiked = styled.p`
	font-size: 16px;
`;
const Strong = styled.strong`
	color: green;
	font-weight: bold;
`;

export const P = {
	Main,
	Img,
	ALink,
	PLiked,
	Strong,
	Container,
};
