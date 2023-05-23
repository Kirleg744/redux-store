import React from "react";
import './sort-books.css'
import { useState } from "react";
import { bookSortedByPrice } from "../../actions";
import { connect } from "react-redux";
const SortBooks = ({ sortByPrice }) => {
    const [isToggled, toggle] = useState(false);

    const callback = () => {
        toggle(!isToggled);
		sortByPrice(!isToggled);
    };

    const toggledBtnStyle = {
        boxShadow: "0 0 0 3px lightskyblue",
    };

    console.log(isToggled);
    return (
        <button
            onClick={callback}
            style={isToggled ? toggledBtnStyle : null}
            className="sort-button btn btn-danger"
        >
            Сортувати по ціні
        </button>
    );
};

const mapDispatchToProps = (dispatch) => {
	return {
        sortByPrice: (isToggled) => dispatch(bookSortedByPrice(isToggled)),
    };
}

export default connect(null, mapDispatchToProps)(SortBooks) 
