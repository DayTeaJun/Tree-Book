import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { a11y } from '../Styles/Common';

const Header = styled.header`
	position: relative;
	display: flex;
	flex-direction: column;
	padding-top: 15px;
`;

const LinkHome = styled(Link)`
	font-size: 35px;
	font-weight: bold;
	text-align: center;
	color: Green;
	font-family: 'OG_Renaissance_Secret-Rg';
`;

const Container = styled.div`
	position: absolute;
	border-radius: 5px;
	background-color: #eee;
	padding: 20px;
	top: 50%;
	right: 0;
	transform: translate(0, -50%);
`;

const Strong = styled.strong`
	position: absolute;
	border-radius: 5px;
	background-color: #eee;
	padding: 20px;
	top: 50%;
	right: 0;
	transform: translate(0, -50%);
	font-size: 1em;
	cursor: pointer;
`;

const Form = styled.form`
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 5px;
	gap: 10px;
`;

const Label = styled.label`
	${a11y}
`;

const Input = styled.input`
	font-size: 16px;
	font-weight: bold;
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

const ALink = styled(Link)`
	font-size: 1em;
	font-weight: bold;
	cursor: pointer;

	&:nth-child(1) {
		margin-right: 10px;
		padding-right: 10px;
		border-right: 2px #fff solid;
	}
`;

export const H = {
	Header,
	Container,
	Strong,
	LinkHome,
	Form,
	Label,
	Input,
	Button,
	ALink,
};
