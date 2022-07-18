import "./category.styles.scss";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { useState, useEffect, Fragment } from "react";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
    const { paramCategory } = useParams();  //get passed url parameter values
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[paramCategory]);

    useEffect(() => {
        setProducts(categoriesMap[paramCategory]);
    },
    [paramCategory, categoriesMap]);

    return (
        <Fragment>
            <h2 className="category-title">{paramCategory.toUpperCase()}</h2>
            <div className="category-container">
                {
                    products && products.map((product) => {
                        return <ProductCard key={product.id} productData={product} />
                    })
                }
            </div>
        </Fragment>
    );
};

export default Category;