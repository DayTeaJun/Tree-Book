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
		width: 100%;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
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

	form > input {
		width: 50%;
		height: 30px;
		padding: 5px;
		margin: 10px 0;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	form > div > input {
		width: 100%;
		height: 100%;
		position: absolute;
		opacity: 0;
		z-index: 1;
		cursor: pointer;
	}

	form > div > label {
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
	}

	form > div:nth-child(1) {
		width: 110px;
		height: 110px;
		margin-bottom: 10px;
		padding: 0;
		display: flex;
		position: relative;
		cursor: pointer;
	}

	form > div:last-child {
		display: flex;
		gap: 20px;
	}

	div > button {
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
