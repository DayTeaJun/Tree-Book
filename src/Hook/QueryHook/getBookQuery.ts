import { useQuery } from '@tanstack/react-query';
import { getBestcomments } from '../../Api/Firebase/getBestBook';
import { getLikedBooks } from '../../Api/Firebase/getLikedBooks';

export function useBestCommentQuery() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['homeFeedLikedBooks', 'ratingBy'],
		queryFn: () => getBestcomments('likedBook', 'ratingBy', 9),
	});
	return { data, isLoading, error };
}

export function useLikedBookQuery() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['bestBook'],
		queryFn: () => getLikedBooks('best'),
	});
	return { data, isLoading, error };
}

export function useBestViewQuery() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['homeFeedLikedBooks'],
		queryFn: () => getBestcomments('likedBook', 'views', 12),
	});
	return { data, isLoading, error };
}
