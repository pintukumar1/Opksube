import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllBooksPage from "./pages/AllBooksPage";
import { getBooksData } from "./store/app-actions";
import BookDetails from "./pages/BookDetails";
// import NewBook from "./pages/NewBook";
import SellerAuth from "./pages/SellerAuth";
import CustomerAuth from "./pages/CustomerAuth";
import MainNavigation from "./components/Navigation/MainNavigation";

const App = () => {
  const dispatch = useDispatch()

  const books = useSelector(state => state.app.books)
  const total = useSelector(state => state.app.totalQuantity)

  useEffect(() => {
    dispatch(getBooksData())
  }, [])

  return (
    <BrowserRouter>
      <MainNavigation />
      <main className="content">
        <Routes>
          <Route path="/" element={<AllBooksPage books={books} totalBooks={total} />} />
          <Route path="/bookdetails/:bookId" element={<BookDetails />} />
          {/* <Route path="/add-book" element={<NewBook />} /> */}
          <Route path="/seller-auth" element={<SellerAuth />} />
          <Route path="/customer-auth" element={<CustomerAuth />} />
          <Route path="*" element={<h1>Error page!!!</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
