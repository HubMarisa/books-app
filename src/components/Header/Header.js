import './Header.scss';

import { Link, useNavigate } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import { SearchContext } from '../../context';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import { useContext } from 'react';


{/* <SearchBar setSearch={setSearch} />
<ThemeToggler /> */}

function Header() {
    const {search, setSearch, setFilters} = useContext(SearchContext);
    const navigate = useNavigate();

    const handleSearch = (newSearch) => {
        setSearch(newSearch);
        setFilters({});
        navigate('/');
    }

    return (
        <header className='header'>
            <div className='container'>
                <nav className='navigation'>
                    <Link to="/">BooksApp</Link>

                    <SearchBar setSearch={handleSearch} />

                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact us</Link>

                    <ThemeToggler />
                </nav>
            </div>
        </header>
    )
}

export default Header;