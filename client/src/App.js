import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllBooksPage from "./pages/AllBooksPage";
import { getBooksData } from "./store/book-actions";
import BookDetails from "./pages/BookDetails";
import NewBook from "./pages/NewBook/NewBook";
const App = () => {
  const dispatch = useDispatch()

  const books = useSelector(state => state.book.books)
  const total = useSelector(state => state.book.totalBooks)

  useEffect(() => {
    dispatch(getBooksData())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllBooksPage books={books} totalBooks={total} />} />
        <Route path="/bookdetails/:bookId" element={<BookDetails />} />
        <Route path="/add-book" element={<NewBook />} />
        <Route path="*" element={<h1>Error page!!!</h1>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
