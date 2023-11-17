import { KakaoSearch } from './kakaoApi';

export const getBooks = async (searchTitle: string) => {
	try {
		const params = {
			query: searchTitle,
			size: 5,
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
