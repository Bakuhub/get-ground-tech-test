import {Book} from "types";

export interface GetBooksResponse {
  books: Book[];
  count: number;
}

export type GetBooksParams = {
  page: number;
  keyword?: string;
};

export const getBooks = async ({
  page,
  keyword,
}: GetBooksParams): Promise<{ books: Book[]; count: number }> => {
  const filteredKeyword = keyword || '';
  const url = 'http://nyx.vima.ekt.gr:3000/api/books';
  const filters = [
    {
      type: 'all',
      values: [filteredKeyword],
    },
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page, filters }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};