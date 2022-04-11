import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllBooksPage from "./pages/AllBooksPage";
import BookDetails from "./pages/BookDetails";
import NewBook from "./pages/NewBook";
import SellerAuth from "./pages/SellerAuth";
import CustomerAuth from "./pages/CustomerAuth";
import MainNavigation from "./components/Navigation/MainNavigation";
import Order from "./pages/Order";
import Landing from "./pages/Landing";
import ErrorPage from "./pages/Error"
import CustomerOrders from "./pages/CustomerOrders";

const App = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main className="content">
        <Routes>
          <Route path="/" element={<AllBooksPage/>} />
          <Route path="/landing" index element={<Landing />} />
          <Route path="/bookdetails/:bookId" element={<BookDetails />} />
          <Route path="/add-book" element={<NewBook />} />
          <Route path="/orders" element={<CustomerOrders/>} />
          <Route path="/:bookId/order-book" element={<Order />} />
          <Route path="/seller-auth" element={<SellerAuth />} />
          <Route path="/customer-auth" element={<CustomerAuth />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
