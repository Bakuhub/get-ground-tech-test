import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'store';
import { getBooks, GetBooksParams } from 'api/books';
import {Book} from "types";

interface BooksState {
  books: Book[];
  count: number;
  loading: boolean;
  error: string | null;
}

export const initialState: BooksState = {
  books: [],
  count: 0,
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess(state, action: PayloadAction<{ books: Book[]; count: number }>) {
      state.books = action.payload.books;
      state.count = action.payload.count;
      state.loading = false;
      state.error = null;
    },
    fetchBooksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
} = booksSlice.actions;

export default booksSlice.reducer;

// Thunk action to fetch books
export const fetchBooks = (params: GetBooksParams): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchBooksStart());
    const data = await getBooks(params);
    dispatch(fetchBooksSuccess(data));
  } catch (error: any) {
    dispatch(fetchBooksFailure(error?.message || 'fetch books failed'));
  }
};
