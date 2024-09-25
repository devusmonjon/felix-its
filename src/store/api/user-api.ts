import { api } from "./index"; // Asosiy API'ni import qilamiz
import {
  RegisterRequest,
  RegisterResponse,
  SignInRequest,
  SignInResponse,
  IUser,
} from "./user-api.props";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    signUp: build.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    getUser: build.query<IUser, void>({
      query: () => ({
        url: "/users/profile",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, useSignUpMutation, useSignInMutation } =
  userApi;
