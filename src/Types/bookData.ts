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
	url: string;
}

export interface SerachParams {
	query: string;
	size: number;
	target: string;
}

export interface ItemProps {
	item: BData;
	search?: string;
	id?: number;
}
