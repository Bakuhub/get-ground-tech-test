import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import booksReducer, {
    fetchBooks, fetchBooksFailure, fetchBooksStart, fetchBooksSuccess, initialState,
} from "./booksSlice";
import {getBooks} from "api/books";
import{mockBooks as books} from "mockData";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("api/books");

describe("booksSlice", () => {
    let store: any;

    beforeEach(() => {
        store = mockStore();
    });

    describe("actions", () => {
        it("should create an action to start fetching books", () => {
            const expectedAction = {type: "books/fetchBooksStart"};
            expect(fetchBooksStart()).toEqual(expectedAction);
        });

        it("should create an action to fetch books successfully", () => {

            const count = 2;
            const expectedAction = {
                type: "books/fetchBooksSuccess",
                payload: {books, count},
            };
            expect(fetchBooksSuccess({books, count})).toEqual(expectedAction);
        });

        it("should create an action to handle fetch books failure", () => {
            const error = "Error message";
            const expectedAction = {
                type: "books/fetchBooksFailure",
                payload: error,
            };
            expect(fetchBooksFailure(error)).toEqual(expectedAction);
        });

        it("should return the initial state", () => {
            expect(booksReducer(undefined, {type: undefined})).toEqual(initialState);
        });

        it("should handle fetchBooksStart", () => {
            const previousState = {
                books: [],
                count: 0,
                loading: false,
                error: "Previous error",
            };

            expect(booksReducer(previousState, fetchBooksStart())).toEqual({
                                                                               books: [],
                                                                               count: 0,
                                                                               loading: true,
                                                                               error: null,
                                                                           });
        });

        it("should handle fetchBooksSuccess", () => {
            const previousState = {
                books: [],
                count: 0,
                loading: true,
                error: null,
            };

            const action = {
                type: "books/fetchBooksSuccess",
                payload: {
                    books,
                    count: 2,
                },
            };

            expect(booksReducer(previousState, action)).toEqual({
                                                                    books,
                                                                    count: 2,
                                                                    loading: false,
                                                                    error: null,
                                                                });
        });

        it("should handle fetchBooksFailure", () => {
            const previousState = {
                books: [],
                count: 0,
                loading: true,
                error: null,
            };

            const action = {
                type: "books/fetchBooksFailure",
                payload: "Error message",
            };

            expect(booksReducer(previousState, action)).toEqual({
                                                                    books: [],
                                                                    count: 0,
                                                                    loading: false,
                                                                    error: "Error message",
                                                                });
        });
    });
    describe("thunks", () => {
        it(
                "should dispatch fetchBooksStart and fetchBooksSuccess actions when fetching books",
                async () => {
                    const count = 2;
                    const params = {
                        page:1
                    };
                    getBooks.mockResolvedValue({books, count});

                    await store.dispatch(fetchBooks(params));

                    const actions = store.getActions();
                    expect(actions[0]).toEqual(fetchBooksStart());
                    expect(actions[1]).toEqual(fetchBooksSuccess({books, count}));
                }
        );

        it(
                "should dispatch fetchBooksStart and fetchBooksFailure actions when fetching books fails",
                async () => {
                    const error = "Error message";
                    const params = {
                        page:1
                    };
                    getBooks.mockRejectedValue({message: error});

                    await store.dispatch(fetchBooks(params));

                    const actions = store.getActions();
                    expect(actions[0]).toEqual(fetchBooksStart());
                    expect(actions[1]).toEqual(fetchBooksFailure(error));
                }
        );
    });
});
