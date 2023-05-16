import React from "react";
import './bookstore-service-context.css'

const {
    Provider: BookstoreServiceProvider,
    Consumer: BookstoreServiceConsumer,
} = React.createContext();



export { BookstoreServiceProvider, BookstoreServiceConsumer };
