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

export const Chart = ({
	chartRating,
	props,
}: {
	chartRating: any;
	props: string;
}) => {
	const theme = useTheme() as any;
	console.log(chartRating);

	const ratingValues = Object.values(chartRating) as Array<number>;
	let ratingSum;
	let ratingAvg;
	let ratingArray;
	if (props === 'profile') {
		ratingSum = ratingValues.reduce((acc, cur) => acc + cur, 0);
		ratingAvg =
			Object.entries(chartRating).reduce(
				(acc, [key, value]) => acc + parseInt(key) * (value as number),
				0
			) / ratingSum;

		ratingArray = Array.from(
			{ length: 5 },
			(_, index) => chartRating[index + 1] || 0
		);
	} else {
		ratingSum = Object.keys(chartRating).length;
		ratingAvg = ratingValues.reduce((acc, cur) => acc + cur, 0) / ratingSum;
		ratingArray = Array.from({ length: 6 }, (_, index) => {
			const values = ratingValues.filter((value) => value === index);
			return values.reduce((acc, cur) => (acc as number) + 1, 0);
		}).splice(1);
	}
	const maxValue = Math.max(...ratingArray);
	const ratingMax = ratingArray.indexOf(maxValue) + 1;
	return (
		<>
			<Box
				sx={{
					height: '80%',
					display: 'flex',
				}}
			>
				<Bar
					options={options}
					data={{
						labels: ['1', '2', '3', '4', '5'],
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
						{ratingSum}
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
