import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Ul = styled.ul`
	list-style: none;
`;

const Li = styled.li`
	float: left;
	height: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 30px;
	color: #888;
	font-size: 14px;
	& > a {
		height: 25px;
		line-height: 25px;
	}
`;

const Page = styled(Link)`
	margin: 0 5px;
	cursor: pointer;
	width: 25px;
	border-radius: 30px;
	border: solid 1px rgba(0, 0, 0, 0);
	text-align: center;

	&:hover {
		border: solid 1px #aaa;
	}
`;

const Move = styled.li`
	position: relative;
	cursor: pointer;
	margin: 0 10px;
	&:last-child::after,
	&:first-child::before {
		position: absolute;
		font-size: 20px;
		padding: 0 7px 0px;
	}
	&:first-child {
		text-align: right;

		&::before {
			content: '<';
			left: 0;
		}
	}
	&:last-child::after {
		content: '>';
		right: 0;
	}
	& > a {
		width: 50px;
		display: block;
		z-index: 10;
		&:hover {
			text-decoration: underline;
		}
	}
`;

const Invisible = styled.li`
	visibility: hidden;
`;
const Active = styled(Link)`
	font-weight: 700;
	background: #2f5d62;
	color: white;
`;

export const PN = {
	Ul,
	Li,
	Wrapper,
	Page,
	Move,
	Invisible,
	Active,
};
