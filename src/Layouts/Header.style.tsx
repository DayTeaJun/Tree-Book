import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { a11y } from '../Styles/Common';

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
	display: flex;
	justify-content: center;
	border-radius: 5px;
	background-color: #eee;
	padding: 20px;
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
	border-bottom: solid 1px black;
	&:focus {
		outline: none;
	}
`;

const Button = styled.button`
	border: none;
	background-color: #fff;
	cursor: pointer;
`;

const ALink = styled(Link)`
	display: flex;
	align-items: center;
	gap: 5px;
	font-size: 1em;
	font-weight: bold;
	cursor: pointer;

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
