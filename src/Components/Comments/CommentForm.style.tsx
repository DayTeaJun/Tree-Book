import styled from 'styled-components';
import { a11y } from '../../Styles/Common';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 10px;
	gap: 10px;
`;

const H2 = styled.h2`
	font-size: 1.2em;
	font-weight: bold;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	gap: 20px;
	height: 40px;
`;

const Label = styled.label`
	${a11y}
`;

const Input = styled.input`
	flex-grow: 1;
	height: 100%;
	padding: 10px;
	margin: 10px 0;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const Button = styled.button`
	width: 80px;
	height: 100%;
	padding: 5px;
	font-size: 1em;
	font-weight: bold;
	border: none;
	border-radius: 4px;
	background-color: green;
	color: white;
	cursor: pointer;
`;

export const CF = {
	Form,
	H2,
	Container,
	Label,
	Input,
	Button,
};
