import { Box } from '@mui/material';
import { Shimmer } from '../../Styles/Common';
import { B, ContainerBookImg } from './bookItem.style';
import { Skeleton } from '../../Types/bookType';

export const BookItemSkeleton = ({ comment }: Skeleton) => {
	return (
		<>
			{!comment ? (
				<B.Container style={{ height: '200px' }}>
					<ContainerBookImg style={{ height: '145px', overflow: 'hidden' }}>
						<Shimmer />
					</ContainerBookImg>
					<Box
						sx={{
							width: '97px',
							height: '14px',
							overflow: 'hidden',
							marginTop: '5px',
						}}
					>
						<Shimmer />
					</Box>
					<Box
						sx={{
							width: '97px',
							height: '12px',
							overflow: 'hidden',
							marginTop: '5px',
						}}
					>
						<Shimmer />
					</Box>
				</B.Container>
			) : (
				<Box
					sx={{
						width: '90%',
						height: '95px',
						overflow: 'hidden',
						borderRadius: '5px',
						flexShrink: '0',
					}}
				>
					<Shimmer />
				</Box>
			)}
		</>
	);
};
