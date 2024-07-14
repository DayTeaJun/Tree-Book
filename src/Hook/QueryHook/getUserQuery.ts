import { getUser } from '../../Api/Firebase/getUser';
import { useQuery } from '@tanstack/react-query';

export function useGetUserQuery(userProfile?: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['user', userProfile],
		queryFn: () => getUser('user', userProfile ?? ''),
	});
	return { data, isLoading, error };
}
