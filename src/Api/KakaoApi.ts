import axios from 'axios';
import { SerachParams } from '../Types/bookData';

const KAKAO_API = process.env.REACT_APP_KAKAO_API;

const Kakao = axios.create({
	baseURL: 'https://dapi.kakao.com',
	headers: {
		Authorization: 'KakaoAK ' + KAKAO_API,
	},
});

export const KakaoSearch = (params: SerachParams) => {
	return Kakao.get('v3/search/book', { params });
};
