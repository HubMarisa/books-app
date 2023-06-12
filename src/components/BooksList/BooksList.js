import React, {useContext, useEffect, useMemo, useState} from "react";
import { getBooksBySearchTerm } from "../../api/booksApi";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context";

function BooksList () {
    const { search } = useContext(SearchContext);
    const [books, setBooks] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const booksPerPage = 10;
    
    const handlePageChange = (pageNumber) => {
        setcurrentPage(pageNumber);
    }

    useEffect(() => {
        if(search) {
            getBooksBySearchTerm(search, currentPage, booksPerPage)
            .then((response) => {
                if(response.data.items) {
                    setBooks(response.data.items);
                } else {
                    setBooks([]);
                }
            })
            .catch((error) => console.error(error));
        }
    },[search, currentPage]);

    const memoizedBooks = useMemo(() => 
        books.map((book, index) => (
            <li key={index}>
                <Link to={`/book/${book.id}`} title={book.volumeInfo.title}>
                    {book.volumeInfo.title}
                </Link>
            </li>
        )),
        [books]
    );

    return (
        <div className="books">
            <div className="container">
                <h1>Books</h1>
                <h5>Current page: {currentPage}</h5>

                <ul>{memoizedBooks}</ul>
                {search && books.length > 0 && (
                    <>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default BooksList;