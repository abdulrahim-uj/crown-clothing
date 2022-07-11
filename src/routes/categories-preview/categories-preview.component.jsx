import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
// import ProductCard from "../../components/product-card/product-card.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import './categories-preview.styles.scss';

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} titleValue={title} productsArray={products} />
                })
            }
        </Fragment>
    );
};

export default CategoriesPreview;