// Book Data
export interface BData {
	authors: string[];
	contents: string;
	datetime: string;
	isbn: string;
	price: number;
	publisher: string;
	sale_price: number;
	status: string;
	title: string;
	translators: string[];
	url: string[];
}

// 검색 API
export interface SerachParams {
	query: string;
	size: number;
	target: string;
}
