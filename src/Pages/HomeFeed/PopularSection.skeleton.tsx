import { Box } from '@mui/material';
import { Shimmer } from '../../Styles/Common';
import { useMediaQueries } from '../../Hook/useMediaQueries';

export const PopularSectionSkeleton = () => {
	const { isDownLG, isDownMD } = useMediaQueries();

	return (
		<Box
			component='li'
			sx={{
				width: `${
					(isDownMD && '100%') ||
					(isDownLG && 'calc((100% - 20px) / 2)') ||
					'calc((100% - 20px) / 3)'
				}`,
				height: '120px',
				display: 'flex',
				paddingRight: '20px',
				marginBottom: '10px',
			}}
		>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					gap: '20px',
				}}
			>
				<Box
					sx={{
						width: '5%',
						height: '27px',
						borderRadius: '5px',
						overflow: 'hidden',
						flexShrink: 0,
						backgroundColor: 'background.book',
					}}
				>
					<Shimmer />
				</Box>
				<Box
					sx={{
						width: '80px',
						height: '100%',
						borderRadius: '5px',
						overflow: 'hidden',
						flexShrink: 0,
						backgroundColor: 'background.book',
					}}
				>
					<Shimmer />
				</Box>
				<Box
					sx={{
						width: 'calc(90% - 140px)',
						display: 'flex',
						flexDirection: 'column',
						gap: '3px',
						overflow: 'hidden',
					}}
				>
					<Box
						sx={{
							height: '25px',
							overflow: 'hidden',
							backgroundColor: 'background.book',
						}}
					>
						<Shimmer />
					</Box>
					<Box
						sx={{
							height: '20px',
							overflow: 'hidden',
							backgroundColor: 'background.book',
						}}
					>
						<Shimmer />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
