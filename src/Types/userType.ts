export interface UserLikedProps {
	uid?: string;
	displayName?: string | null;
}

export interface SignupType {
	email: string;
	password: string;
	displayName: string;
	imgUrl?: Blob;
	intro?: string;
}

export interface LoginType {
	email: string;
	password: string;
}

export interface InputValueType {
	email: string;
	password: string;
	displayName: string;
	intro: string;
}
