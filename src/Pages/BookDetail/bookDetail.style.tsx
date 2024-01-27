import styled from 'styled-components';

const Main = styled.main`
	display: flex;
	flex-direction: column;
`;

const Section = styled.section`
	display: flex;
	gap: 20px;
	padding: 20px;
`;

const ContainerImg = styled.div`
	width: 120px;
	flex-shrink: 1;
	text-align: center;
	border-radius: 10px;
`;

const ContainerH2Likes = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

const Likes = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	height: 30px;
	color: red;
	background-color: #eee;
	border-radius: 5px;
	padding: 3px 5px;
	cursor: pointer;
`;

const P = styled.p`
	font-size: 16px;
	font-weight: bold;
	color: black;
`;

const H2 = styled.h2`
	font-weight: bold;
	font-size: 20px;
	margin-bottom: 5px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const Dl = styled.dl`
	display: flex;
	font-weight: 200;
`;
const Dt = styled.dt`
	flex-shrink: 0;
	width: 80px;
	margin-right: 10px;
	border-right: solid 2px #bab7b6;
	font-weight: 600;
`;

const Dd = styled.dd`
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	word-break: keep-all;
`;

const Alink = styled.a`
	text-align: center;
	font-size: 13px;
	cursor: pointer;
	color: green;
`;

export const D = {
	Main,
	Section,
	ContainerImg,
	ContainerH2Likes,
	Likes,
	P,
	H2,
	Container,
	Dl,
	Dt,
	Dd,
	Alink,
};
