import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("calls onSearch when search button is clicked", () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} onClear={() => {}} />);
    const searchButton = screen.getByLabelText("Search");
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "test keyword" } });
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledWith("test keyword");
  });

  test("calls onClear when clear button is clicked", () => {
    const onClearMock = jest.fn();
    render(<SearchBar onSearch={() => {}} onClear={onClearMock} />);
    const clearButton = screen.getByLabelText("Clear");
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "test keyword" } });
    fireEvent.click(clearButton);

    expect(onClearMock).toHaveBeenCalled();
  });

  test("updates keyword state when input value changes", () => {
    render(<SearchBar onSearch={() => {}} onClear={() => {}} />);
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "test keyword" } });

    expect(input.value).toBe("test keyword");
  });

  test("calls handleSearch when Enter key is pressed", () => {
    const handleSearchMock = jest.fn();
    render(<SearchBar onSearch={handleSearchMock} onClear={() => {}} />);
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "test keyword" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleSearchMock).toHaveBeenCalled();
  });

  test("calls handleClear when Escape key is pressed", () => {
    const handleClearMock = jest.fn();
    render(<SearchBar onSearch={() => {}} onClear={handleClearMock} />);
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "test keyword" } });
    fireEvent.keyDown(input, { key: "Escape" });

    expect(handleClearMock).toHaveBeenCalled();
  });
});
