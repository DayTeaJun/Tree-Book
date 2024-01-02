import styled from 'styled-components';

export const CommentsStyle = styled.div`
	ul {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

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

	input {
		flex-grow: 1;
		height: 100%;
		padding: 10px;
		margin: 10px 0;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		width: 100px;
		height: 100%;
		padding: 5px;
		font-size: 1em;
		font-weight: bold;
		border: none;
		border-radius: 4px;
		background-color: skyblue;
		color: white;
	}
`;
