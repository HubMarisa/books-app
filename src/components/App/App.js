import './App.scss';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, {useState, useEffect, useRef} from 'react';

import About from '../About/About';
import BooksList from '../BooksList/BooksList';

import BookDetails from '../BooksList/BookDetails/BookDetails';
import NotFound from '../NotFound/NotFound';
import { ThemeContext, SearchContext } from '../../context';
import Header from '../Header/Header';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';

function RoutesWithHistory() {
  const location = useLocation();
  const previousLocation = useRef(location);

  useEffect(() => {
    if (location !== previousLocation.current) {
      previousLocation.current = location;
    }
  }, [location]);

  return (
    <Routes>
      <Route path='/' element={<BooksList />}></Route>
      <Route path='/book' element={<Navigate to="/" />} />
      <Route path='/book/:slug' element={<BookDetails />}></Route>

      <Route path='/about' element={<About />}></Route>

      <Route path='*' element={<Navigate to="/404" />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  )
}

function App() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  return (   
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SearchContext.Provider value={{ search, setSearch, filters, setFilters }}>
        <Router>
          <div className="app">
            <Header setSearch={setSearch} />
            <Breadcrumbs />
            <RoutesWithHistory />           
          </div>
        </Router>
      </SearchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
