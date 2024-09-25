import { IBook } from "./books-api.props";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
  products: IBook[];
}

export interface SignInResponse extends IUser {}

export interface RegisterResponse {
  message: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
