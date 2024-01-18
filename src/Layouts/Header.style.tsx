import styled from 'styled-components';
import HomeOutline from '../Assets/home-line.svg';
import { Link } from 'react-router-dom';
import { a11y } from '../Styles/Common';

const Header = styled.header`
	position: relative;
	display: flex;
	flex-direction: column;
	padding-top: 15px;
`;

const Alink = styled(Link)`
	font-size: 35px;
	font-weight: bold;
	text-align: center;
	color: Green;
	font-family: 'OG_Renaissance_Secret-Rg';
`;

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 5px;
	gap: 10px;
`;

const Strong = styled.strong`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translate(0, -50%);
	font-size: 1.2em;
	cursor: pointer;
`;

const Form = styled.form`
	display: flex;
`;

const Label = styled.label`
	${a11y}
`;

const Input = styled.input`
	font-size: 16px;
	text-align: center;
	margin-right: 10px;
	padding: 5px;
	border: none;
	border-bottom: solid 1px black;
	&:focus {
		outline: none;
	}
`;

const Button = styled.button`
	border: 0;
	border-radius: 5px;
	background: skyblue;
	padding: 10px;
	color: #fff;
	cursor: pointer;
`;

export const H = {
	Header,
	Container,
	Strong,
	Alink,
	Form,
	Label,
	Input,
	Button,
};
