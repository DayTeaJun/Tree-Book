import styled, { keyframes } from 'styled-components';

const animateToastBottom = keyframes`
  0% {
    left: 50%;
    transform: translate(-50%, 100px);
  }
  100% {
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const animateToastTop = keyframes`
  0% {
    left: 50%;
    transform: translate(-50%, -100px);
  }
  100% {
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const Container = styled.div<{ position: 'bottom' | 'top' }>`
	position: fixed;
	z-index: 20;
	display: flex;
	height: 3rem;
	width: 25%;
	max-width: 73rem;
	align-items: center;
	justify-content: center;
	border-radius: 1rem;
	background-color: ${({ theme }) => theme.palette.success.light};
	opacity: 0.9;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
	animation: ${({ position }) =>
			position === 'top' ? animateToastTop : animateToastBottom}
		0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const P = styled.p`
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
	color: ${({ theme }) => theme.palette.common.white};
`;

export const T = {
	Container,
	P,
};
