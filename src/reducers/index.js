const updateCartItems = (cartItems, item, idx) => {
    if (item.count === 0) {
        return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
    }

    if (idx === -1) {
        return [...cartItems, item];
    }
    return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};

const updateCartItem = (book, item = {}, quantity) => {
    const { id = book.id, count = 0, title = book.title, total = 0 } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price,
    };
};

const updateOrder = (state, bookId, quantity) => {
    const {
        bookList: { books },
        shoppingCart: { cartItems, orderTotal, totalNum },
    } = state;
    const book = books.find(({ id }) => id === bookId);
    const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
    const item = cartItems[itemIndex];
    const newItem = updateCartItem(book, item, quantity);
    return {
        cartItems: updateCartItems(cartItems, newItem, itemIndex),
        orderTotal: orderTotal + quantity * book.price,
        totalNum: totalNum + quantity,
    };
};

const filter = (
    state,
    nameFilter,
    priceFilter,
    isInStockFilter,
    priceSortFilter
) => {
    const { allBooks, books } = state.bookList;
    const res = allBooks.filter((item) => {
        return (
            (item.title.indexOf(nameFilter) > -1) &&
            (priceFilter >= item.price) &&
            (isInStockFilter ? isInStockFilter === item.isInStock : true)
        );
    });
    if (priceSortFilter) {
        return res.sort(function (a, b) {
            return a.price - b.price;
        });
    } else {
        return res
    }

};

const updateBookList = (state, action) => {
    if (state === undefined) {
        return {
            allBooks: [],
            books: [],
            loading: true,
            error: null,
            filterValues: {
                priceFilter: 1000,
                isInStockFilter: false,
                nameFilter: "",
                priceSortFilter: false
            },
        };
    }
    console.log(action.type)
    console.log(state)
    switch (action.type) {
        case "FETCH_BOOKS_REQUEST":
            return {
                ...state.bookList,
                books: [],
                loading: true,
                error: null,
            };
        case "FETCH_BOOKS_SUCCESS":
            return {
                ...state.bookList,
                allBooks: action.payload,
                books: action.payload,
                loading: false,
                error: null,
            };
        case "FETCH_BOOKS_FAILURE":
            return {
                ...state.bookList,
                books: [],
                loading: false,
                error: true,
            };
        case "BOOK_SEARCHED":
            return {
                ...state.bookList,
                filterValues: {
                    ...state.bookList.filterValues,
                    nameFilter: action.payload,
                },
                books: filter(
                    state,
                    action.payload,
                    state.bookList.filterValues.priceFilter,
                    state.bookList.filterValues.isInStockFilter,
                    state.bookList.filterValues.priceSortFilter
                ),
            };
        case "BOOK_FILTERED_BY_PRICE":
            return {
                ...state.bookList,
                filterValues: {
                    ...state.bookList.filterValues,
                    priceFilter: action.payload,
                },
                books: filter(
                    state,
                    state.bookList.filterValues.nameFilter,
                    action.payload,
                    state.bookList.filterValues.isInStockFilter,
                    state.bookList.filterValues.priceSortFilter
                ),
            };
        case "BOOK_FILTERED_BY_IN_STOCK":
            return {
                ...state.bookList,
                filterValues: {
                    ...state.bookList.filterValues,
                    isInStockFilter: action.payload,
                },
                books: filter(
                    state,
                    state.bookList.filterValues.nameFilter,
                    state.bookList.filterValues.priceFilter,
                    action.payload,
                    state.bookList.filterValues.priceSortFilter
                ),
            };
        case "BOOK_SORTED_BY_PRICE":
            return {
                ...state.bookList,
                filterValues: {
                    ...state.bookList.filterValues,
                    priceSortFilter: action.payload,
                },
                books: filter(
                    state,
                    state.bookList.filterValues.nameFilter,
                    state.bookList.filterValues.priceFilter,
                    state.bookList.filterValues.isInStockFilter,
                    action.payload
                ),
            };
        default:
            return state.bookList;
    }
};

const updateShoppingCart = (state, action) => {
    if (state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0,
            totalNum: 0,
        };
    }

    switch (action.type) {
        case "BOOK_ADDED_TO_CART":
            return updateOrder(state, action.payload, 1);
        case "BOOK_REMOVED_FROM_CART":
            return updateOrder(state, action.payload, -1);
        case "ALL_BOOK_REMOVED_FROM_CART":
            const item = state.shoppingCart.cartItems.find(
                ({ id }) => id === action.payload
            );
            return updateOrder(state, action.payload, -item.count);

        default:
            return state.shoppingCart;
    }
};

const reducer = (state, action) => {
    return {
        bookList: updateBookList(state, action),
        shoppingCart: updateShoppingCart(state, action),
    };
};

export default reducer;
