import { createContext, useState, useEffect } from "react";
// REMOVE AFTER STORE DATA TO FIRESTORE
// import SHOP_DATA from "../shop-data";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext(
    // SET INITIAL VALUES
    {
        products: [],   //an empty array
    }
);

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    // ITS NEED ONLY ONE TIME JUST STORE THAT DATA ONCE RELOAD...
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    const value = {products};
    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    )
}