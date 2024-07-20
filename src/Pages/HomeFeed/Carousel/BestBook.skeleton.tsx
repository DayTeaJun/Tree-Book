import { Box } from '@mui/material';
import { Shimmer } from '../../../Styles/Common';
import { useMediaQueries } from '../../../Hook/useMediaQueries';

export const BestBookSkeleton = () => {
	const { isDownSM } = useMediaQueries();

	return (
		<Box
			sx={{
				width: '100%',
				padding: '30px 70px',
				display: 'flex',
				justifyContent: 'space-between',
				flexDirection: `${isDownSM ? 'column' : 'row'}`,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: `${!isDownSM && 'space-between'}`,
					width: '70%',
				}}
			>
				{!isDownSM && (
					<>
						<Box
							sx={{
								backgroundColor: 'background.book',
								borderRadius: '5px',
								display: 'inline-block',
								width: '48px',
								height: '28px',
								overflow: 'hidden',
							}}
						>
							<Shimmer />
						</Box>

						<Box
							sx={{
								backgroundColor: 'background.book',
								width: '100%',
								height: '36px',
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
								height: '53px',
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
								height: '27px',
								borderRadius: '5px',
								overflow: 'hidden',
							}}
						>
							<Shimmer />
						</Box>
					</>
				)}
			</Box>
			<Box
				sx={{
					backgroundColor: 'background.book',
					width: '150px',
					height: '240px',
					borderRadius: '5px',
					overflow: 'hidden',
					marginLeft: `${!isDownSM && 'auto'}`,
					margin: `${isDownSM && '0 auto'}`,
				}}
			>
				<Shimmer />
			</Box>
		</Box>
	);
};
