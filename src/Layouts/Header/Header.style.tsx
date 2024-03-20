import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { a11y } from '../../Styles/Common';

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const LinkHome = styled(Link)`
	text-align: center;
	font-size: 35px;
	font-weight: bold;
	color: Green;
	font-family: 'OG_Renaissance_Secret-Rg';
`;

const Container = styled.div`
	height: 64px;
	display: flex;
	justify-content: center;
	border-radius: 5px;
	background-color: #eee;
	padding: 20px;
	overflow: hidden;
`;

const Form = styled.form`
	display: flex;
	justify-content: center;
	padding: 5px;
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
	border-bottom: solid 1px #d3d3d3;
	&:focus {
		outline: none;
		border-bottom: solid 1px black;
	}
`;

const Button = styled.button`
	border: none;
	background-color: #fff;
	cursor: pointer;
	color: #585858;
`;

const ALink = styled(Link)`
	display: flex;
	align-items: center;
	color: #585858;
	gap: 5px;
	font-size: 1em;
	font-weight: bold;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		color: black;
	}

	img {
		height: 100%;
	}

	&:nth-child(1) {
		margin-right: 10px;
		padding-right: 10px;
		border-right: 2px #fff solid;
	}
`;

export const H = {
	Header,
	Container,
	LinkHome,
	Form,
	Label,
	Input,
	Button,
	ALink,
};
