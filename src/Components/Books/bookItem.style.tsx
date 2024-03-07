import styled from 'styled-components';

export const ContainerBookImg = styled.div`
	width: 100px;
	height: 140px;
	text-align: center;
	border-radius: 10px;
`;

const Container = styled.div`
	border: 0.5px #eee solid;
	background-color: #fff;
	padding: 10px;
	width: 120px;
	height: 200px;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		transform: translateY(-0.5em);
		transition: transform 0.5s;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
			rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	}
`;

const H2 = styled.h2`
	font-size: 14px;
	font-weight: bold;
	margin-top: 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const P = styled.p`
	font-size: 12px;
	color: #a1a1a1;
	margin-top: 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Price = styled.p`
	font-size: 12px;
	font-weight: bold;
	margin-top: 5px;
	text-align: end;
`;

export const B = {
	Container,
	H2,
	P,
	Price,
};
