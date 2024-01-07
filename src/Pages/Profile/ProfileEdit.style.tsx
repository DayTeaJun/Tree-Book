import styled from 'styled-components';

export const ProfileEditMain = styled.main`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
	padding: 20px 24px;
	gap: 15px;

	h1 {
		font-size: 1.5em;
		font-weight: bold;
	}

	p {
		font-size: 0.8em;
	}

	img {
		width: 150px;
	}

	& > div {
		display: flex;
		gap: 20px;
	}

	form {
		width: 100%;
		border-left: 1px solid #ccc;
		padding-left: 20px;
		display: flex;
		flex-direction: column;
	}

	a {
		margin-top: 20px;
		padding: 10px 12px;
		font-size: 1.1em;
		border-radius: 10px;
		background-color: skyblue;
		color: white;
	}

	input {
		width: 50%;
		height: 30px;
		padding: 5px;
		margin: 10px 0;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	form > div {
		display: flex;
		gap: 20px;
	}

	div > button,
	a {
		width: 50px;
		height: 30px;
		font-size: 1em;
		font-weight: bold;
		border: none;
		border-radius: 4px;
		background-color: skyblue;
		color: white;
		cursor: pointer;
	}
`;
