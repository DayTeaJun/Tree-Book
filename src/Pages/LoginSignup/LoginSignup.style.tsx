import styled from 'styled-components';
import { a11y } from '../../Styles/Common';

const Container = styled.div`
	width: 100px;
	height: 100px;
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
	z-index: 999;
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
	margin: 20px 0;
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

export const LS = {
	Container,
	Img,
	ImgInput,
	ImgLabel,
	Legend,
	Label,
	Input,
	P,
};
