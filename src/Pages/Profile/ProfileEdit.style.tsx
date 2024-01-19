import styled from 'styled-components';
import { a11y } from '../../Styles/Common';

const Main = styled.main`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
	padding: 20px 24px;
	gap: 15px;
`;

const H1 = styled.h1`
	font-size: 1.5em;
	font-weight: bold;
`;

const P = styled.p`
	font-size: 0.8em;
`;

const Img = styled.img`
	width: 100%;
	border-radius: 50%;
	object-fit: cover;
	flex-shrink: 0;
`;

const Form = styled.form`
	width: 100%;
	border-left: 1px solid #ccc;
	padding-left: 20px;
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	width: 50%;
	height: 30px;
	padding: 5px;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const ContainerImg = styled.div`
	width: 110px;
	height: 110px;
	margin-bottom: 10px;
	padding: 0;
	display: flex;
	position: relative;
	cursor: pointer;
`;
const Label = styled.label`
	${a11y}
`;

const ImgInput = styled.input`
	width: 100%;
	height: 100%;
	position: absolute;
	opacity: 0;
	z-index: 1;
	cursor: pointer;
`;

const ContainerBtn = styled.div`
	display: flex;
	gap: 20px;
`;

const Button = styled.button`
	width: 50px;
	height: 30px;
	font-size: 1em;
	font-weight: bold;
	border: none;
	border-radius: 4px;
	background-color: green;
	color: white;
	cursor: pointer;
`;

const PValid = styled.p`
	font-size: 0.7em;
	padding: 8px 0;
	color: red;
`;

export const PE = {
	Main,
	H1,
	P,
	Img,
	Form,
	Input,
	ContainerImg,
	ContainerBtn,
	Label,
	ImgInput,
	Button,
	PValid,
};
