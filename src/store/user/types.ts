export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IRegistrationRequest {
	email: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	password1: string;
	password2: string;
}

export interface IAuthResponse {
	access: string;
	refresh: string;
	user: IUser;
}

export interface IUser {
	email: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	id: number;
	role: string;
}

export interface IUserStore {
	user: IUser | null;
	isAuthChecked: boolean;
	isLoading: boolean;
	error: string | null;
}

export interface ITokenRequest {
	token: string;
}

export interface IMessageResponse {
	id: number;
	message: string;
}
