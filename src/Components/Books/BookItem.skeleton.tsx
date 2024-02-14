import { Box } from '@mui/material';
import { Shimmer } from '../../Styles/Common';
import { B, ContainerBookImg } from './bookItem.style';

export const BookItemSkeleton = () => {
	return (
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
	);
};
