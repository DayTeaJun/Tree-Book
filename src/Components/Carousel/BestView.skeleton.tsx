import { Box } from '@mui/material';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { Shimmer } from '../../Styles/Common';

export const BestViewSkeleton = () => {
	const { isDownSM, isDownMD } = useMediaQueries();
	const itemsPerPage = isDownSM ? 3 : isDownMD ? 4 : 6;

	return (
		<Box
			component='ul'
			sx={{
				width: '100%',
				minHeight: isDownSM ? '220px' : isDownMD ? '260px' : '250px',
				display: 'flex',
				alignItems: 'stretch',
				gap: '20px',
				padding: '0 30px',
			}}
		>
			{Array.from({ length: itemsPerPage }).map((_, index) => (
				<Box
					component='li'
					sx={{
						width: isDownSM
							? 'calc((100% - 40px) / 3)'
							: isDownMD
							? 'calc((100% - 60px) / 4)'
							: 'calc((100% - 100px) / 6)',
						borderRadius: '5px',
						overflow: 'hidden',
						display: 'flex',
						flexDirection: 'column',
						gap: '5px',
					}}
					key={index}
				>
					<Box
						sx={{
							width: '100%',
							height: 'calc(100% - 83px)',
							borderRadius: '5px',
							overflow: 'hidden',
						}}
					>
						<Shimmer />
					</Box>
					<Box
						sx={{
							backgroundColor: 'background.book',
							width: '100%',
							height: '24px',
							borderRadius: '5px',
							overflow: 'hidden',
						}}
					>
						<Shimmer />
					</Box>
					<Box
						sx={{
							backgroundColor: 'background.book',
							width: '100%',
							height: '22px',
							borderRadius: '5px',
							overflow: 'hidden',
						}}
					>
						<Shimmer />
					</Box>
					<Box
						sx={{
							backgroundColor: 'background.book',
							width: '100%',
							height: '22px',
							borderRadius: '5px',
							overflow: 'hidden',
						}}
					>
						<Shimmer />
					</Box>
				</Box>
			))}
		</Box>
	);
};
