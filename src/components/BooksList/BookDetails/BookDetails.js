import { useEffect, useState } from 'react';

import axios from 'axios';
import parse from 'html-react-parser';

function BookDetails({ bookId }) {
    const [book, setBook] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            .then((response) => {
                setBook(response.data);
                setError(false);
            }) 
            .catch((error) => {
                console.error(error);
                setError(false);
            });
    }, [bookId]);

    if (!book) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div className="container">Book not found.</div>
    }

    return (
        <div className="book">
            <h1>{book.volumeInfo.title ? book.volumeInfo.title : 'No title'}</h1>
            <h2>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors'}</h2>
            <div>{book.volumeInfo.description ? parse(book.volumeInfo.description) : 'No description available'}</div>
            {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />}
        </div>
    );
}

export default BookDetails;
