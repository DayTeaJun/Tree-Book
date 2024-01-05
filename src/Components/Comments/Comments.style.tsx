import styled from 'styled-components';

export const CommentsForm = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 20px;

	form > div {
		margin-top: 30px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 20px;
		height: 40px;
	}

	h4 {
		font-size: 1.2em;
		font-weight: bold;
	}

	label {
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
	}

	input {
		flex-grow: 1;
		height: 100%;
		padding: 10px;
		margin: 10px 0;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
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
	}
`;

export const CommentsList = styled.div`
	margin-top: 30px;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	padding: 10px 20px;

	div {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	a {
		font-size: 1.1em;
		font-weight: bold;
		cursor: pointer;
	}

	div > p {
		font-size: 1.1em;
		font-weight: bold;
		color: #a1a1a1;
		padding-left: 20px;
	}

	& > p {
		font-size: 1em;
	}

	button {
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
	}
`;
