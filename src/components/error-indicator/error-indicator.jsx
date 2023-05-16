import React from "react";
import './error-indicator.css'
import errorImg from './Error.png' 
const ErrorIndicator = () => {
	return (
        <div className="justify-content-center d-flex align-items-center">
            <img src={errorImg} alt="" />;
        </div>
    );
	
	
};

export default ErrorIndicator
