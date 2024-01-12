import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../Hook/FirebaseHook/useAuthContext';
import { ProfileMain } from './Profile.style';
import { Link } from 'react-router-dom';
import persImg from '../../Assets/No-img.svg';
import { useCollection } from '../../Hook/FirebaseHook/useCollection';
import { useEffect } from 'react';

export function Profile() {
	const { user } = useAuthContext();
	const { documents } = useCollection('user');
	const anotherUser = useParams().userProfile || '';
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			if (user.displayName === anotherUser) {
				navigate('/profile');
			}
		}
	}, []);

	return (
		<ProfileMain>
			{anotherUser &&
				anotherUser !== user?.displayName &&
				documents &&
				documents.map(
					(users) =>
						users.displayName === anotherUser && (
							<>
								<img src={users.photoURL || persImg} />
								<h1>{users.displayName}의 프로필</h1>
								<h2>{users.email}</h2>
							</>
						)
				)}

			{!anotherUser && user && (
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
