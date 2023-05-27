export interface IContact {
	_id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	avatar: string;
	isOnline?: boolean;
}

export interface IUserContact {
	user: IContact;
	_id: string;
}
