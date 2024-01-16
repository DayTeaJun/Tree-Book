import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	padding: 20px;
`;

const Img = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	border: none;
`;

const ContainerImgBtn = styled.div`
	display: flex;
	justify-content: space-between;
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
	gap: 20px;
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
	background-color: skyblue;
	color: white;
	cursor: pointer;
`;

export const CL = {
	Wrapper,
	Img,
	ContainerImgBtn,
	ContainerImgLink,
	ALink,
	ContainerDateBtn,
	ContainerNameComment,
	ContainerNameDate,
	PDate,
	PComment,
	Button,
};
