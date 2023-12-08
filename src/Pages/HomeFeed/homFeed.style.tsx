import styled, { css, keyframes } from 'styled-components';

const bannermove = keyframes`
    0% {
      transform: translate(100%, 0);
  }
  100% {
      transform: translate(-100%, 0);
  }
`;

export const HomeFeedSection = styled('section')`
	overflow: hidden;
	position: relative;
	height: 200px;

	div {
		width: 820px;
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
