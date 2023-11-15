import axios from 'axios';

// 카카오 API
const KAKAO_API = '07366720722caa7583ba2e82c577f145';

// 카카오 인스턴스
const Kakao = axios.create({
	baseURL: 'https://dapi.kakao.com',
	headers: {
		Authorization: 'KakaoAK ' + KAKAO_API,
	},
});

interface SerachParams {
	query: string;
	size: number;
	target: string;
}

const KakaoSearch = (params: SerachParams) => {
	return Kakao.get('v3/search/book', { params });
};
