import styled from 'styled-components';

export const SignupForm = styled.form`
	max-width: 360px;
	margin: 20px auto;
	padding: 20px;
	border: solid 1px black;
	border-radius: 5px;

	fieldset > div {
		width: 110px;
		height: 110px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		position: relative;
		cursor: pointer;
	}

	div > img {
		width: 100%;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	div > input {
		width: 100%;
		height: 100%;
		position: absolute;
		opacity: 0;
		z-index: 1;
		cursor: pointer;
	}

	div > label {
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
	}

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
