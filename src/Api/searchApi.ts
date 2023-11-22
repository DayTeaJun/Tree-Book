import { NaverSearch } from './NaverApi';

export const getBooks = async (searchTitle: string) => {
	try {
		const params = {
			query: searchTitle,
		};
		const result = await NaverSearch(params);

		if (result) {
			return result;
		}
	} catch (error) {
		console.log('에러발생', error);
	}
};
