import styled from 'styled-components';

const Section = styled.section`
	display: flex;
	width: 100%;
	padding: 20px 0;
	gap: 20px;
`;

const SectionSearch = styled.section`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 504px;
	gap: 20px;
	flex-wrap: wrap;
`;

const H2 = styled.h2`
	display: inline-block;
	width: 50%;
	text-align: center;
	font-size: 2em;
	font-weight: 700;
	font-size: green;
	padding-bottom: 15px;
	border-bottom: solid 1px black;
	margin: 0 auto;
	font-family: 'OG_Renaissance_Secret-Rg';
`;

const ContainerBestBook = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 30%;
	height: 100%;
`;

const ContainerBook = styled.div`
	display: flex;
	width: calc(70% + 20px);
	height: 100%;
	gap: 20px;
	flex-wrap: wrap;
	border-left: 1px solid black;
	padding-left: 20px;
`;

export const S = {
	Section,
	SectionSearch,
	ContainerBestBook,
	ContainerBook,
	H2,
};
