import "./category.styles.scss";
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
    // useParams allows to get parameter object
    // destructure the parameter value passed paramCategory
    const { paramCategory } = useParams();

    const { categoriesMap } = useContext(CategoriesContext);

    const [products, setProducts] = useState(categoriesMap[paramCategory]);

    useEffect(() => {
        setProducts(categoriesMap[paramCategory]);
    },
    // Run when paramCategory changes / categoryMap changes 
    [paramCategory, categoriesMap]);

    return (
        <div className="category-container">
            {
                // products & product.map : only render products.map on products have values 
                products && products.map((product) => {
                    return <ProductCard key={product.id} productData={product} />
                })
            }
        </div>
    );
};

export default Category;