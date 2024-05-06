import { Chart as ChartJS, Title, Tooltip, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';

ChartJS.register(Title, Tooltip, ...registerables);

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
	},
	scales: {
		y: {
			display: false,
		},
		x: {
			grid: {
				display: false,
			},
		},
	},
};

export const Chart = ({ userDocument }: { userDocument: any }) => {
	const theme = useTheme() as any;

	const ratingValues = Object.values(userDocument) as Array<number>;
	const sum = ratingValues.reduce((sum, current) => sum + current, 0);
	const ratingAvg = sum / ratingValues.length;

	const ratingArray = Array.from(
		{ length: 6 },
		(_, index) => userDocument[index] || 0
	);
	const maxValue = Math.max(...ratingArray);
	const ratingMax = ratingArray.indexOf(maxValue);

	return (
		<>
			<Typography
				component='p'
				fontSize='1.1em'
				fontWeight='bold'
				color='text.primary'
				sx={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: '10px',
				}}
			>
				{`별점분포`}
			</Typography>
			<Box
				sx={{
					height: '80%',
					display: 'flex',
				}}
			>
				<Bar
					options={options}
					data={{
						labels: ['0', '1', '2', '3', '4', '5'],
						datasets: [
							{
								label: '별점 분포',
								data: ratingArray,
								backgroundColor: theme.palette.background.hover,
							},
						],
					}}
				/>
			</Box>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-around',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component='p' fontSize='1.1em' fontWeight='bold'>
						{ratingAvg.toFixed(1)}
					</Typography>
					<Typography component='p' fontSize='0.7em'>
						별점 평균
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component='p' fontSize='1.1em' fontWeight='bold'>
						{sum}
					</Typography>
					<Typography component='p' fontSize='0.7em'>
						별점 개수
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component='p' fontSize='1.1em' fontWeight='bold'>
						{ratingMax}
					</Typography>
					<Typography component='p' fontSize='0.7em'>
						많이 준 별점
					</Typography>
				</Box>
			</Box>
		</>
	);
};
