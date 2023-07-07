import {Book} from "types";

export const mockBooks: Book[] = [
    {
        id: 1,
        book_title: "Book 1",
        book_author: ["Author 1"],
        book_publication_year: 2021,
        book_publication_country: "Country 1",
        book_publication_city: "City 1",
        book_pages: 200,
    },
    {
        id: 2,
        book_title: "Book 2",
        book_author: ["Author 2"],
        book_publication_year: 2022,
        book_publication_country: "Country 2",
        book_publication_city: "City 2",
        book_pages: 300,
    },
];