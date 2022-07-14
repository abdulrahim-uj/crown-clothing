import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesArray));
        };

        getCategoriesMap();
    }, [dispatch]);

    return (
        <Routes>
            <Route index={true} element={<CategoriesPreview />}  />
            <Route path=':paramCategory' element={<Category />} />
        </Routes>
    );
};

export default Shop;