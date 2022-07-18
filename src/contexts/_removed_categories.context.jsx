import { createContext, useState, useEffect } from "react";
// REMOVE AFTER STORE DATA TO FIRESTORE
// import SHOP_DATA from "../shop-data";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext(
    // SET INITIAL VALUES
    {
        categoriesMap: {},   //an empty object
    }
);

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // ITS NEED ONLY ONE TIME JUST STORE THAT DATA ONCE RELOAD...
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    // RETRIEVE CATEGORY ITEMS
    useEffect(() => {
        // using because of calling async function...
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }, []);

    const value = {categoriesMap};
    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
}