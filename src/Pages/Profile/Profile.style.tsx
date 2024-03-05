import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface SkeletonProps {
	isSkeleton?: boolean;
}

const Main = styled.main`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid black;
	border-radius: 10px;
	padding: 20px 24px;
	min-height: 330px;
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
	min-width: 30%;
	min-height: 286px;
	flex-shrink: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	border-right: solid 1px #eee;
`;

const ContainerLiked = styled.div`
	width: calc(70% - 160px);
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const ContainerImg = styled.div`
	width: 200px;
	height: 200px;
	border-radius: 1em;
	border: 1px solid #eee;
	flex-shrink: 1;
	overflow: hidden;
`;

const ALink = styled(Link)`
	padding: 10px 20px;
	font-size: 1em;
	font-weight: 700;
	border-radius: 50px;
	color: white;
	background-color: #006600;
	&:hover {
		background-color: #009b00;
	}
`;

const PP = styled.p`
	font-size: 16px;
	text-align: center;
`;

const H1 = styled.h1<SkeletonProps>`
	font-size: 16px;
	font-weight: bold;
`;

const Strong = styled.strong`
	color: green;
	font-weight: bold;
`;

export const P = {
	Main,
	Section,
	H1,
	ALink,
	PP,
	Strong,
	ContainerImg,
	ContainerBook,
	ContainerLiked,
	ContainerProfile,
};
