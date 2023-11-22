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
	thumbnail: string;
	title: string;
	translators: string[];
	url: string[];
}

// 검색 API
export interface SerachParams {
	query: string;
	display?: number;
	start?: number;
	sort?: string;
}
