import { KakaoSearch } from './KakaoApi';

export const getBooks = async (searchTitle: string, size: number = 12) => {
	try {
		const params = {
			query: searchTitle,
			sort: 'latest',
			size: size,
			target: 'title',
		};
		const result = await KakaoSearch(params);

		if (result) {
			return result.data.documents;
		}
	} catch (error) {
		console.log('에러발생', error);
	}
};
