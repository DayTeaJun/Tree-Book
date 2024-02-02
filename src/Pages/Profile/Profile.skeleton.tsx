import { Shimmer } from '../../Styles/Common';
import { P } from './Profile.style';
import UserLiked from './UserLiked';

export const ProfileSekeleton = () => {
	return (
		<P.Section>
			<P.ContainerProfile style={{ width: '285px', height: '286px' }}>
				<P.ContainerImg>
					<Shimmer />
				</P.ContainerImg>
				<P.H1
					style={{
						width: '200px',
						height: '16px',
						display: 'block',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</P.H1>
				<P.PP
					style={{
						width: '200px',
						height: '16px',
						overflow: 'hidden',
					}}
				>
					<Shimmer />
				</P.PP>
				<P.ALink
					to={'/'}
					style={{
						width: '200px',
						height: '36px',
						overflow: 'hidden',
						backgroundColor: '#fff',
					}}
				>
					<Shimmer />
				</P.ALink>
			</P.ContainerProfile>
			<UserLiked />
		</P.Section>
	);
};
