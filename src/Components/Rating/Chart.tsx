import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	registerables,
} from 'chart.js';
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

const labels = [0, 1, 2, 3, 4, 5];

export const Chart = () => {
	const theme = useTheme() as any;

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
				}}
			>
				{`별점분포`}
			</Typography>
			<Bar
				options={options}
				data={{
					labels: ['0', '1', '2', '3', '4', '5'],
					datasets: [
						{
							label: '별점 분포',
							data: [3, 2, 4, 5, 6, 7],
							backgroundColor: theme.palette.background.hover,
						},
					],
				}}
			/>
			<Box
				sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component='p' fontSize='1.1em' fontWeight='bold'>
						3.5
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
						4
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
						3
					</Typography>
					<Typography component='p' fontSize='0.7em'>
						많이 준 별점
					</Typography>
				</Box>
			</Box>
		</>
	);
};
