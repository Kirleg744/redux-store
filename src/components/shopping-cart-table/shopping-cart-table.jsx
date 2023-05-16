import React from "react";
import "./shopping-cart-table.css";
import { connect } from "react-redux";
import {
    bookRemovedFromCart,
    allBookRemovedFromCart,
    bookAddedToCart,
} from "../../actions";
const ShoppingCartTable = ({
    items,
    total,
    onIncrease,
    onDecrease,
    onDelete,
}) => {
    console.log(items);
    const renderRow = (item, idx) => {
        const { id, title, count, total } = item;
        return (
            <tr key={id}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td>{count}</td>
                <td>{total} грн</td>
                <td>
                    <button
                        onClick={() => onDecrease(id)}
                        className="btn table-btn btn-outline-warning"
                    >
                        <i class="fa-solid fa-circle-minus"></i>
                    </button>
                    <button
                        onClick={() => onIncrease(id)}
                        className="btn table-btn btn-outline-success"
                    >
                        <i class="fa-solid fa-circle-plus"></i>
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        className="btn table-btn btn-outline-danger"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        );
    };
    return (
        <div className="shopping-cart-table">
            <h2>Your order</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Count</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{items.map(renderRow)}</tbody>
            </table>

            <div className="total">Total {total} грн</div>
        </div>
    );
};

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal } }) => {
    return {
        items: cartItems,
        total: orderTotal,
    };
};

const mapDispatchToProps = {
    onIncrease: bookAddedToCart,
    onDecrease: bookRemovedFromCart,
    onDelete: allBookRemovedFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
