import { getBooks, GetBooksParams } from './index';

describe('getBooks', () => {
  // Mock fetch function and response for successful API request
  const mockFetchSuccess = (responseData: any) =>
    jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(responseData),
    });

  // Mock fetch function for unsuccessful API request
  const mockFetchFailure = () =>
    jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

  // Test case for successful API request
  it('should return books and count on successful API request', async () => {
    const mockResponseData = {
      books: [
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
      ],
      count: 2,
    };

    global.fetch = mockFetchSuccess(mockResponseData);

    const params: GetBooksParams = {
      page: 1,
      keyword: 'fantasy',
    };

    const result = await getBooks(params);

    expect(result).toEqual(mockResponseData);
  });

  // Test case for unsuccessful API request
  it('should throw an error on unsuccessful API request', async () => {
    global.fetch = mockFetchFailure();

    const params: GetBooksParams = {
      page: 1,
      keyword: 'fiction',
    };

    await expect(getBooks(params)).rejects.toThrow('Failed to fetch books');
  });

  // Test case for API request without a keyword
  it('should send an empty keyword if not provided', async () => {
    const mockResponseData = {
      books: [],
      count: 0,
    };

    global.fetch = mockFetchSuccess(mockResponseData);

    const params: GetBooksParams = {
      page: 2,
    };

    const expectedRequestBody = JSON.stringify({
      page: 2,
      filters: [
        {
          type: 'all',
          values: [''],
        },
      ],
    });

    await getBooks(params);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expectedRequestBody,
      })
    );
  });
});
