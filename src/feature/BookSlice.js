import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import api from "../apiService";
import { toast } from "react-toastify";

const initialState = {
  books: [],
  error: "",
  status: null,
  readinglist: [],
  bookDetail: null,
};

export const getBooksData = createAsyncThunk(
  "book/getBooksData",
  async ({ pageNum, limit, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const res = await api.get(url);
    return res.data;
  }
);

export const addToReadingLists = createAsyncThunk(
  "book/addToReadingLists",
  async (book) => {
    const response = await api.post(`/favorites`, book);
    return response.data;
  }
);

export const getReadingList = createAsyncThunk(
  "book/getReadingList",
  async () => {
    const response = await api.get(`/favorites`);
    return response.data;
  }
);

export const getBookDetail = createAsyncThunk(
  "book/getBookDetail",
  async (bookId) => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  }
);

export const removeBooks = createAsyncThunk(
  "book/removeBook",
  async (removedBookId) => {
    const response = await api.delete(`/favorites/${removedBookId}`);
    return response.data;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooksData.pending, (state) => {
        state.status = null;
      })
      .addCase(getBooksData.fulfilled, (state, action) => {
        state.status = null;
        state.books = action.payload;
      })
      .addCase(getBooksData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(addToReadingLists.pending, (state) => {})
      .addCase(addToReadingLists.fulfilled, (state, action) => {
        toast.success("Success adding to reading list!");
      })
      .addCase(addToReadingLists.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.error.message);
      })
      .addCase(getReadingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReadingList.fulfilled, (state, action) => {
        state.status = null;
        state.readinglist = action.payload;
      })
      .addCase(getReadingList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getBookDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = null;
        state.bookDetail = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeBooks.fulfilled, (state, action) => {
        state.status = null;
        toast.success("The book has been removed");
      })
      .addCase(removeBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
