import { Shimmer } from '../../Styles/Common';
import { P } from './Profile.style';
import UserLiked from './UserLiked';

export const ProfileSekeleton = () => {
	return (
		<P.Section>
			<P.ContainerProfile>
				<P.ContainerImg>
					<Shimmer />
				</P.ContainerImg>
				<P.H1 isSkeleton={true}>
					<Shimmer />
				</P.H1>
				<P.PP>
					<Shimmer />
				</P.PP>
				<P.ALink to={'/'}>
					<Shimmer />
				</P.ALink>
			</P.ContainerProfile>
			<UserLiked />
		</P.Section>
	);
};
