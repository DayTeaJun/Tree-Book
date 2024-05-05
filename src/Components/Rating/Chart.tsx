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
	);
};
