import { Box } from '@mui/material';
import { Shimmer } from '../../Styles/Common';
import { B, ContainerBookImg } from './bookItem.style';
import { Skeleton } from '../../Types/bookType';

export const BookItemSkeleton = ({ comment }: Skeleton) => {
	return (
		<>
			{!comment ? (
				<B.Container style={{ height: '222px' }}>
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
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
						width: '90%',
						height: '80px',
						padding: '10px',
						borderRadius: '5px',
					}}
				>
					<Box sx={{ fontSize: '1.2em' }}>
						<Shimmer />
					</Box>
					<Box
						sx={{
							display: 'flex',
							gap: '10px',
							alignItems: 'center',
						}}
					>
						<Shimmer />
					</Box>
				</Box>
			)}
		</>
	);
};
