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

const filter = (state, value, action) => {
    const {
        bookList: { allBooks, books },
    } = state;

    if (action === "SEARCH") {
        if (value === "") {
            return {
                ...state.bookList,
                books: allBooks,
            };
        }
        return {
            ...state.bookList,
            books: books.filter((item) => {
                return item.title.indexOf(value) > -1;
            }),
        };
    }
    if (action === "PRICE") {
        return {
            ...state.bookList,
            books: books.filter((item) => {
                return value >= item.price;
            }),
        };
    }
    if (action === "IN_STOCK") {
        return {
            ...state.bookList,
            books: allBooks.filter((item) => {
                return value === item.isInStock;
            }),
        };
    }
};

const updateBookList = (state, action) => {
    if (state === undefined) {
        return {
            allBooks: [],
            books: [],
            loading: true,
            error: null,
        };
    }
    console.log(action.type);
    switch (action.type) {
        case "FETCH_BOOKS_REQUEST":
            return {
                ...state.bookList,
                books: [],
                loading: true,
                error: null,
                filterValues: {
                    priceFilter: null,
                    isInStockFilter: null,
                    nameFilter: null
                }
            };
        case "FETCH_BOOKS_SUCCESS":
            return {
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
            return filter(state, action.payload, "SEARCH");
        case "BOOK_FILTERED_BY_PRICE":
            return filter(state, action.payload, "PRICE");
        case "BOOK_FILTERED_BY_IN_STOCK":
            return filter(state, action.payload, "IN_STOCK");
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
