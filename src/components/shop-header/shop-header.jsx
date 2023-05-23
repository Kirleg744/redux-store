import React from "react";
import "./shop-header.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bookSearched } from "../../actions";
const ShopHeader = ({ totalNum, orderTotal, onSearched }) => {
    const onSearchChange = (e) => {
        const term = e.target.value;
        onSearched(term);
    };

    return (
        <header className="shop-header">
            <Link to="/">
                <div href="#" className="logo text-dark">
                    ReStore
                </div>
            </Link>

            <input
                type="text"
                onChange={onSearchChange}
                placeholder="Search"
                className="search"
            />

            <Link to="cart">
                <i class="fa-solid fa fa-cart-shopping"></i>
                <span>
                    {totalNum} items ({orderTotal} грн)
                </span>
            </Link>
        </header>
    );
};


const mapStateToProps = ({ shoppingCart: { orderTotal, totalNum } }) => {
    return {
        orderTotal,
        totalNum
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearched: (value) => dispatch(bookSearched(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);