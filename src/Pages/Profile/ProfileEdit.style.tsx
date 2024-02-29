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
	gap: 10px;
`;

const Label = styled.label`
	color: #a1a1a1;
	font-weight: bold;
`;

const Input = styled.input`
	width: 50%;
	height: 30px;
	padding: 5px 0;
	border: none;
	border-bottom: 1px solid #ccc;
`;

const ContainerImg = styled.div`
	width: 110px;
	height: 110px;
	margin-bottom: 10px;
	padding: 0;
	display: flex;
	position: relative;
	border: 1px solid #ccc;
	border-radius: 50%;
	cursor: pointer;
`;

const ImgLabel = styled.label`
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
	padding-top: 20px;
	gap: 20px;
`;

const Button = styled.button`
	width: 50px;
	height: 30px;
	font-size: 1em;
	font-weight: bold;
	border: none;
	border-radius: 4px;
	color: white;
	cursor: pointer;
	background-color: #006600;
	&:hover {
		background-color: #009b00;
	}
`;

const PValid = styled.p`
	height: 30px;
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
	ImgLabel,
	ImgInput,
	Button,
	PValid,
};
