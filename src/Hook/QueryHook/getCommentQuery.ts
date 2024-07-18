import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../../Api/Firebase/getDocuments';

export function useCommentList(isbn: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['comment', isbn],
		queryFn: () => getDocuments('comment', isbn),
	});
	return { data, isLoading, error };
}
