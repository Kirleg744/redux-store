import React from "react";
import BookList from "../book-list/book-list";
import ShoppingCartTable from "../shopping-cart-table/shopping-cart-table";
import SideFilter from "../side-filter/side-filter";

const HomePage = () => {
    return (
        <div className="d-flex mt-3 container">
            <SideFilter/>
            <BookList/>
        </div>
        
    );
}

export default HomePage