import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1/';

export function getBooksBySearchTerm(searchTerm, page, limit) {
    const startIndex = (page -1) * limit;

    return axios.get(`${BASE_URL}volumes`, {
        params: {
            q: searchTerm,
            startIndex: startIndex,
            maxResults: limit
        }
    });
}

export function getBookById(bookId) {
    return axios.get(`${BASE_URL}volumes/${bookId}`);
}