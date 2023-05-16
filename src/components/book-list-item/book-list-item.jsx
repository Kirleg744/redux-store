import React from "react";
import "./book-list-item.css";

const BookListItem = ({ book, onAddedToCart }) => {
    const { title, author, price, coverImage, isInStock } = book;

    return (
        <div className="book-list-item">
            <div className="book-cover">
                <img className="book-img" src={coverImage} alt="" />
            </div>
            <div className="book-details">
                <a href="#" className="book-title">
                    {title}
                </a>
                <div className="book-author">{author}</div>
                <div className="book-price">{price} грн</div>
                <span> {isInStock ? "В наявності" : "Не в наявності"}</span>
                <button
                    onClick={onAddedToCart}
                    className="btn btn-success add-to-card"
                >
                    Add to card
                </button>
            </div>
        </div>
    );
};

export default BookListItem;
