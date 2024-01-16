import styled from 'styled-components';
import { a11y } from '../../Styles/Common';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 20px;
`;

const H2 = styled.h2`
	font-size: 1.2em;
	font-weight: bold;
`;

const Container = styled.div`
	margin-top: 30px;
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
	background-color: skyblue;
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

export const CommentsList = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	padding: 20px;
`;

export const ProfileImg = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	border: none;
`;

export const FlexImgBtn = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const FlexImgLink = styled.div`
	display: flex;
	gap: 10px;
	a {
		font-size: 1.1em;
		font-weight: bold;
		cursor: pointer;
	}
`;

export const FlexDateBtn = styled.div`
	display: flex;
	justify-content: flex-end;
`;

export const FlexNameComment = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const FlexNameDate = styled.div`
	display: flex;
	gap: 20px;
`;

export const CommentDate = styled.p`
	font-size: 1.1em;
	font-weight: bold;
	color: #a1a1a1;
`;

export const DelOrReport = styled.button`
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
