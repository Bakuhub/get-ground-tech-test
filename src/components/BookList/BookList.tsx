import React from "react";
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import {Book} from "types";
import {HeaderTypography} from "components/BookList/styled";


export const BookList = ({books}: {
    books: Book[]
}) => {
    const headers: Array<{ label: string, align: "left" | "right" }> = [
        {label: "Title", align: "left"},
        {label: "Author(s)", align: "right"},
        {label: "Year", align: "right"},
        {label: "Country", align: "right"},
        {label: "City", align: "right"},
        {label: "Pages", align: "right"},
    ];
    return (
            <TableContainer sx={{display: "flex", justifyContent: "center"}} component={Paper}>
                <Table sx={{minWidth: 650, maxWidth: 1200}} aria-label="books table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                    <TableCell key={header.label} align={header.align}>
                                        <HeaderTypography variant="subtitle1"
                                                          sx={{fontWeight: "bold"}}>
                                            {header.label}
                                        </HeaderTypography>
                                    </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            books.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            No books available
                                        </TableCell>
                                    </TableRow>
                            ):books.map((book) => (
                                    <TableRow
                                            key={book.id}
                                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {book.book_title}
                                        </TableCell>
                                        <TableCell
                                                align="right">{book.book_author.join(",")}</TableCell>
                                        <TableCell
                                                align="right">{book.book_publication_year}</TableCell>
                                        <TableCell
                                                align="right">{book.book_publication_country}</TableCell>
                                        <TableCell
                                                align="right">{book.book_publication_city}</TableCell>
                                        <TableCell align="right">{book.book_pages}</TableCell>
                                    </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
};

