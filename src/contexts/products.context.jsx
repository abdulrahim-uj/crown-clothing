import { createContext, useState, useEffect } from "react";
// REMOVE AFTER STORE DATA TO FIRESTORE
// import SHOP_DATA from "../shop-data";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

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

    // RETRIEVE CATEGORY ITEMS
    useEffect(() => {
        // using because of calling async function...
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log('categoryMap : : : ', categoryMap);
        };
        
        getCategoriesMap();
    }, []);

    const value = {products};
    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    )
}