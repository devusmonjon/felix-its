import { IBook } from "./books-api.props";
import { api } from "./index"; // Asosiy API'ni import qilamiz

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    createBook: build.mutation<IBook, IBook>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Book", "User"],
    }),

    updateBook: build.mutation<IBook, IBook>({
      query: (body) => ({
        url: `/products/${body._id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Book", "User"],
    }),

    deleteBook: build.mutation<IBook, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book", "User"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = userApi;
