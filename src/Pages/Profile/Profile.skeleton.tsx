import { P } from './Profile.style';
import UserLiked from './UserLiked';

export const ProfileSekeleton = () => {
	return (
		<P.Section>
			<P.ContainerProfile>
				<P.ContainerImg></P.ContainerImg>
				<P.H1></P.H1>
				<P.PP></P.PP>
				<P.ALink to={'/'}></P.ALink>
			</P.ContainerProfile>
			<UserLiked />
		</P.Section>
	);
};
