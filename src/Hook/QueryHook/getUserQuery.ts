import { getProfileData } from '../../Api/Firebase/getProifleData';
import { getUser } from '../../Api/Firebase/getUser';
import { useQuery } from '@tanstack/react-query';

export function useGetUserQuery(userProfile?: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['user', userProfile],
		queryFn: () => getUser('user', userProfile ?? ''),
	});
	return { data, isLoading, error };
}

export function useGetProfileCommentQuery(uid?: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['userComment', uid],
		queryFn: () => getProfileData(uid ?? '', 'comment'),
	});
	return { data, isLoading, error };
}

export function useGetProfileLikedBookQuery(uid: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['userBooks', uid],
		queryFn: () => getProfileData(uid ?? '', 'likedBook'),
	});
	return { data, isLoading, error };
}
