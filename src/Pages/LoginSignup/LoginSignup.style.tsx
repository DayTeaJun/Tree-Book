import styled from 'styled-components';
import { a11y } from '../../Styles/Common';

const Form = styled.form`
	max-width: 360px;
	margin: 20px auto;
	padding: 20px;
	border: solid 1px black;
	border-radius: 5px;
`;

const Container = styled.div`
	width: 110px;
	height: 110px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	position: relative;
	cursor: pointer;
`;

const Img = styled.img`
	width: 100%;
	border-radius: 50%;
	object-fit: cover;
	flex-shrink: 0;
`;

const ImgInput = styled.input`
	width: 100%;
	height: 100%;
	position: absolute;
	opacity: 0;
	z-index: 1;
	cursor: pointer;
`;

const ImgLabel = styled.label`
	${a11y}
`;

const Legend = styled.legend`
	font-size: 1.5em;
	font-weight: bold;
`;

const Label = styled.label`
	display: block;
	margin: 30px 0;
`;

const Input = styled.input`
	display: block;
	width: 100%;
	padding: 8px 0;
	border: none;
	border-bottom: 1px solid #ccc;
	outline: none;
`;

const P = styled.p`
	height: 30px;
	font-size: 0.7em;
	padding: 8px 0;
	color: red;
`;

const Button = styled.button`
	font-size: 1em;
	margin-top: 40px;
	float: right;
	padding: 12px 18px;
	border-radius: 10px;
	color: #fff;
	background-color: green;
	border: none;
	font-weight: bold;
	cursor: pointer;
`;

export const LS = {
	Form,
	Container,
	Img,
	ImgInput,
	ImgLabel,
	Legend,
	Label,
	Input,
	P,
	Button,
};
