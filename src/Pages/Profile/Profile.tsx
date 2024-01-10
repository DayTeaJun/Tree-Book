import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { ProfileMain } from './Profile.style';
import { Link } from 'react-router-dom';
import persImg from '../../Assets/No-img.svg';

export function Profile() {
	const { user } = useAuthContext();
	const anotherUser = useParams().userProfile || '';

	return (
		<ProfileMain>
			{user && (
				<>
					<img src={user.photoURL || persImg} />
					<h1>{user.displayName}의 프로필</h1>
					<h2>{user.email}</h2>
					<Link to='./edit'>프로필 수정하기</Link>
				</>
			)}
		</ProfileMain>
	);
}
