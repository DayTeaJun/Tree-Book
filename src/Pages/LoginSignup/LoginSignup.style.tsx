import styled from 'styled-components';

export const SignupForm = styled.form`
	max-width: 360px;
	margin: 60px auto;
	padding: 20px;
	border: solid 1px black;
	border-radius: 5px;

	legend {
		font-size: 1.5em;
		font-weight: bold;
	}

	label {
		display: block;
		margin: 30px 0;
	}

	input {
		display: block;
		width: 100%;
		padding: 8px;
		border: none;
		border-bottom: 1px solid #ccc;
	}

	button {
		font-size: 1em;
		margin-top: 40px;
		float: right;
		padding: 12px 18px;
		border-radius: 10px;
		color: #fff;
		background-color: skyblue;
		border: none;
		font-weight: bold;
		cursor: pointer;
	}
`;
