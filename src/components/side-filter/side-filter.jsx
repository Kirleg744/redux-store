import React, { useState } from "react";
import './side-filter.css'
import { bookFilteredByPrice } from "../../actions";
import { connect } from "react-redux";
import { bookFilteredByInStock } from "../../actions";
const SideFilter = ({ filterByPrice, filterByInStock }) => {
    const [slideFilterValue, setslideFilterValue] = useState(700);

    const onSlideFilterChange = (e) => {
        setslideFilterValue(e.target.value);
        filterByPrice(e.target.value);
    };

    const onInStockFilterChange = (e) => {
        filterByInStock(e.target.checked);
    };

    return (
        <div className="side-filter d-flex align-items-center">
            <div className="w-100">
                <span className="filter-name">Filter</span>
                <div className="slidecontainer">
                    <input
                        type="range"
                        min="200"
                        max="1000"
                        onChange={onSlideFilterChange}
                        value={slideFilterValue}
                        class="slider"
                        id="myRange"
                    ></input>
                    <span>{slideFilterValue} грн</span>
                </div>
                <span className="filter-isInStock">Тільки в наявності</span>
                <input onChange={onInStockFilterChange} type="checkbox" />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
	return {
        filterByPrice: (price) => dispatch(bookFilteredByPrice(price)),
        filterByInStock: (value) => dispatch(bookFilteredByInStock(value))
    };
}

export default connect(null, mapDispatchToProps)(SideFilter) 
