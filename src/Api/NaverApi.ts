import axios from 'axios';
import { SerachParams } from '../Types/bookData';

// 네이버 API
const CLIENT_SECRET = 'g1AC7z6U50';
const ID = 'QC4hHFZPo5Hgfzu1xTbS';

// 네이버
const Kakao = axios.create({
	baseURL: 'https://openapi.naver.com/',
	headers: {
		'X-Naver-Client-Id': ID,
		'X-Naver-Client-Secret': CLIENT_SECRET,
	},
});

export const NaverSearch = (params: SerachParams) => {
	return Kakao.get('v1/search/book.json', { params });
};
