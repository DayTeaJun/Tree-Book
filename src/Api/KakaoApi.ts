import axios from 'axios';
import { SerachParams } from '../Types/bookData';

const KAKAO_API = '07366720722caa7583ba2e82c577f145';

const Kakao = axios.create({
	baseURL: 'https://dapi.kakao.com',
	headers: {
		Authorization: 'KakaoAK ' + KAKAO_API,
	},
});

export const KakaoSearch = (params: SerachParams) => {
	return Kakao.get('v3/search/book', { params });
};
