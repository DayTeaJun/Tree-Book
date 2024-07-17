import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getBestcomments } from '../../Api/Firebase/getBestBook';
import { getLikedBooks } from '../../Api/Firebase/getLikedBooks';
import { getBooks } from '../../Api/searchApi';
import { getDocuments } from '../../Api/Firebase/getDocuments';

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

export function useBookDetail(
	page: string,
	search: string,
	id: string,
	pathname: string
) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookDetail', page, search, id],
		queryFn: () =>
			search &&
			(pathname.indexOf('/like') !== -1
				? getBooks(search, 1, page, 'isbn')
				: pathname.indexOf('/publisher') !== -1
				? getBooks(search, 10, page, 'publisher')
				: getBooks(search, 10, page, 'title')),
		enabled: !!search,
		refetchOnWindowFocus: false,
	});
	return { data, isLoading, error };
}

export function useBookSimilar(publisher: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookSimilar', publisher],
		queryFn: () => publisher && getBooks(publisher, 10, '1', 'publisher'),
	});

	return { data, isLoading, error };
}

export function useBookViews(isbn: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['likedBook', isbn],
		queryFn: () => getDocuments('likedBook', isbn),
		refetchOnWindowFocus: false,
	});
	return { data, isLoading, error };
}

export function useBookSearch(searchView: string, page: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['books', searchView, page],
		queryFn: () => getBooks(searchView || '', 10, page),
		enabled: !!searchView,
		refetchOnWindowFocus: false,
		staleTime: 60000,
		placeholderData: keepPreviousData,
	});
	return { data, isLoading, error };
}
