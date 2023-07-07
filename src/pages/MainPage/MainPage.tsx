import React, {useEffect, useState} from "react";
import {GetBooksParams} from "api/books";
import {LinearProgress, Pagination} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks";
import {RootState} from "store";
import {BookList} from "components/BookList/BookList";
import SearchBar from "components/SearchBar/SearchBar";
import {fetchBooks} from "store/slices/booksSlice";
import {getPageParam, updateUrlParams} from "utils/utils";

const recordPerPage = 20;

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const {books, count, loading, error} = useAppSelector((state: RootState) => state.book);
    const pageParam = getPageParam();
    const [page, setPage] = useState<number>(pageParam);

    const dispatchFetchBooks = (getBooksParams: GetBooksParams) => {
        dispatch(fetchBooks(getBooksParams));
    };

    const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
        dispatchFetchBooks({page: value});
        setPage(value);
        updateUrlParams({page: value.toString()});
    };

    useEffect(
            () => {
                if (pageParam && !isNaN(pageParam)) {
                    setPage(pageParam);
                }
                dispatchFetchBooks({page: pageParam});
            }, []
    );

    return <div>
        <SearchBar
                onClear={() => {
                    dispatchFetchBooks({
                                           page: 1
                                       });
                }}
                onSearch={(keyword) =>
                        dispatchFetchBooks({
                                               page: 1, keyword
                                           })}
        />
        {loading && <LinearProgress/>}
        {error && <p>Error: {error}</p>}
        <BookList books={books}/>
        {count !== null &&
         (
                 <Pagination
                         sx={
                             {
                                 marginTop: "15px"
                             }
                         }
                         showFirstButton showLastButton
                         variant="outlined" shape="rounded"
                         color="secondary" count={Math.floor(count / recordPerPage + 1)}
                         page={page}
                         onChange={handleChangePage}/>
         )}
    </div>;
};
