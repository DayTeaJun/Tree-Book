import { Box } from '@mui/material';
import { Shimmer } from '../../Styles/Common';
import { P } from './Profile.style';

export const ProfileSekeleton = () => {
	return (
		<P.Section>
			<P.ContainerProfile style={{ width: '285px', height: '286px' }}>
				<P.ContainerImg>
					<Shimmer />
				</P.ContainerImg>
				<Box
					sx={{
						width: '200px',
						height: '16px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>
				<Box
					sx={{
						width: '200px',
						height: '16px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</Box>
				<Box
					sx={{
						width: '200px',
						height: '36px',
						overflow: 'hidden',
						backgroundColor: '#fff',
					}}
				>
					<Shimmer />
				</Box>
			</P.ContainerProfile>
		</P.Section>
	);
};
