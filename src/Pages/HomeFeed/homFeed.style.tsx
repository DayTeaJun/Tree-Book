import styled from 'styled-components';

const Section = styled.section`
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	flex-wrap: wrap;
`;

const Container = styled.div`
	padding: 10px;
	width: 150px;
	cursor: pointer;
`;

const H2 = styled.h2`
	text-align: center;
	font-size: 14px;
	font-weight: bold;
	margin-top: 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	&:hover {
		text-decoration: underline;
	}
`;

export const S = {
	Section,
	Container,
	H2,
};
