import React from "react";
import { render } from "@testing-library/react";
import {BookList} from "./BookList";
import { mockBooks } from "mockData";

describe("BookList", () => {
  test("renders without errors", () => {
    render(<BookList books={mockBooks} />);
    // Assertion can be added to check if the component renders without throwing any errors.
  });

  test("displays 'No books available' when books array is empty", () => {
    const { getByText } = render(<BookList books={[]} />);
    const noBooksMessage = getByText("No books available");
    expect(noBooksMessage).toBeInTheDocument();
  });

  test("displays book details correctly", () => {
    const { getByText } = render(<BookList books={mockBooks} />);

    mockBooks.forEach((book) => {
      expect(getByText(book.book_title)).toBeInTheDocument();
      expect(getByText(book.book_author[0])).toBeInTheDocument();
      expect(getByText(book.book_publication_year.toString())).toBeInTheDocument();
      expect(getByText(book.book_publication_country)).toBeInTheDocument();
      expect(getByText(book.book_publication_city)).toBeInTheDocument();
      expect(getByText(book.book_pages.toString())).toBeInTheDocument();
    });
  });
});
