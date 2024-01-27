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

const Section = styled.section`
	width: 100%;
	display: flex;
	overflow: hidden;
	gap: 20px;
`;

const ContainerBook = styled.div`
	width: 100%;
	display: flex;
	padding: 15px 0;
	gap: 10px;
	overflow-x: auto;
	overflow-y: hidden;
	&::-webkit-scrollbar {
		width: 8px;
		height: 8px;
		border-radius: 6px;
	}
	&::-webkit-scrollbar-thumb {
		background: green;
		border-radius: 6px;
	}
`;

const ContainerProfile = styled.div`
	width: 30%;
	flex-shrink: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	border-right: solid 1px #eee;
`;

const ContainerLiked = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	gap: 10px;
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
	text-align: center;
`;

const Strong = styled.strong`
	color: green;
	font-weight: bold;
`;

export const P = {
	Main,
	Section,
	Img,
	ALink,
	PLiked,
	Strong,
	ContainerBook,
	ContainerLiked,
	ContainerProfile,
};
