export interface BookData {
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
	id?: number;
	search?: string;
}

export interface SerachParams {
	query: string;
	size: number;
	target: string;
}

export interface BookItemProps {
	item: BookData;
	search?: string;
	id?: number;
}

export interface BookLikesProps {
	item: BookData;
	id?: string;
	search?: string;
}
