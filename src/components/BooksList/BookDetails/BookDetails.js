import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

function BookDetails({ bookId }) {
    const [book, setBook] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
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
            <h1>{book.volumeInfo.title}</h1>
            <h2>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors'}</h2>
            <div>{book.volumeInfo.description ? parse(book.volumeInfo.description) : 'No description available'}</div>
            {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />}
        </div>
    );
}

export default BookDetails;
