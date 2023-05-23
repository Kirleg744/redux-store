import React, { Component } from "react";
import "./book-list.css";
import BookListItem from "../book-list-item/book-list-item";
import { connect } from "react-redux";
import withBookstoreService from "../hoc/with-bookstore-service";
import { fetchBooks } from "../../actions";
import { compose } from "../../utils";
import Spinner from "../spinner/spinner";
import { bookAddedToCart } from "../../actions";

import ErrorIndicator from "../error-indicator/error-indicator";
import SortBooks from "../sort-books/sort-books";

class BookListContainer extends Component {
    componentDidMount() {
        this.props.fetchBooks()
        
    }

    render() {
        const { books, loading, error, onAddedToCart } = this.props;

        if (loading) {
            return (
                <div className="d-flex align-items-center justify-content-center">
                    <Spinner />
                </div>
            );
        }

        if (error) {
            return <ErrorIndicator />;
        }
        
        return <BookList onAddedToCart={onAddedToCart} books={books} />;
    }
}

const BookList = ({ books, onAddedToCart }) => {
    return (
        <div>
            <SortBooks/>
            <ul className="book-list">
                {books.map((book) => {
                    return (
                        <li>
                            <BookListItem
                                key={book.id}
                                onAddedToCart={() => onAddedToCart(book.id)}
                                book={book}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};


const mapStateToProps = ({ bookList: { books, loading, error }}) => {
    return {
        books,
        loading,
        error,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {bookstoreService} = ownProps
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    };
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
