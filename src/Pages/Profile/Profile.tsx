import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { ProfileMain } from './Profile.style';

export function Profile() {
	const { user } = useAuthContext();
	const anotherUser = useParams().userProfile || '';
	console.log(anotherUser);

	return (
		<ProfileMain>
			{anotherUser ? (
				<>
					{/* <h1>{anotherUser.displayName}의 프로필</h1>
					<h2>{anotherUser.email}</h2> */}
				</>
			) : (
				<>
					<h1>{user?.displayName}의 프로필</h1>
					<h2>{user?.email}</h2>
				</>
			)}
		</ProfileMain>
	);
}
