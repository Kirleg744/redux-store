import React from "react";
import "./app.css";
import { Route, Routes } from "react-router-dom";
import { CartPage, HomePage } from "../pages";
import ShopHeader from "../shop-header/shop-header";
const App = () => {
    return (
        <main className="container" role="main">
            <ShopHeader numItems={2} total={56} />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </main>
    );
};

export default App;
