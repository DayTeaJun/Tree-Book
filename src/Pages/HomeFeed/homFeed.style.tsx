import styled, { keyframes } from 'styled-components';

const bannermove = keyframes`
    0% {
      transform: translate(0, 0);
  }
  100% {
      transform: translate(-50%, 0);
  }
`;

export const HomeFeedSection = styled.section`
	overflow: hidden;
	position: relative;
	width: 1080px; // 이미지 보여지는 뷰 부분
	height: 200px;

	div {
		width: 1080px; // 원본+클론의 총 합
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
		animation: ${bannermove} 10s linear infinite;
		gap: 20px;
	}

	img {
		border-radius: 5px;
	}
`;
