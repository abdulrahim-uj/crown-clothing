import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import './shop.styles.scss';

const Shop = () => {
    return (
        <Routes>
            <Route index={true} element={<CategoriesPreview />}  />
        </Routes>
    );
};

export default Shop;