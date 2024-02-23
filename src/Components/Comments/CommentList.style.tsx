import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Section = styled.section`
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 10px;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	border: 1px solid #ccc;
	padding: 20px;
`;

const ContainerImg = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;
`;

const ContainerImgBtn = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

const ContainerImgLink = styled.div`
	display: flex;
	gap: 10px;
`;

const ALink = styled(Link)`
	font-size: 1.1em;
	font-weight: bold;
	cursor: pointer;
`;

const ContainerDateBtn = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const ContainerNameComment = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const ContainerNameDate = styled.div`
	display: flex;
	gap: 20px;
`;

const PDate = styled.p`
	font-size: 1.1em;
	font-weight: bold;
	color: #a1a1a1;
`;

const PComment = styled.p`
	font-size: 1em;
`;

const Button = styled.button`
	width: 80px;
	height: 30px;
	padding: 5px;
	font-size: 1em;
	font-weight: bold;
	border: none;
	border-radius: 4px;
	background-color: green;
	color: white;
	flex-shrink: 0;
	cursor: pointer;
`;

const LikeButton = styled.button`
	width: 24px;
	font-weight: 100;
	background: inherit;
	border: none;
	box-shadow: none;
	border-radius: 0;
	padding: 0;
	overflow: visible;
	cursor: pointer;
`;

export const CL = {
	Section,
	Wrapper,
	ContainerImg,
	ContainerImgBtn,
	ContainerImgLink,
	ALink,
	ContainerDateBtn,
	ContainerNameComment,
	ContainerNameDate,
	PDate,
	PComment,
	Button,
	LikeButton,
};
