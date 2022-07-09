import "./category-preview.styles.scss";
import ProductCard from "../product-card/product-card.component";
import { Link } from 'react-router-dom';

const CategoryPreview = ({ titleValue, productsArray }) => {
    return (
        <div className="category-preview-container">
            <h2>
                <Link className="title" to={titleValue}>{titleValue.toUpperCase()}</Link>
            </h2>
            <div className="preview">
                {
                    productsArray.filter((_, arrayIndex) => {
                        return (arrayIndex < 4) //SHOWS FIRST 4 ITEMS ONLY
                    }).map((product) => (
                        <ProductCard key={product.id} productData={product} />
                    ))
                }
            </div>
        </div>
    );
};

export default CategoryPreview;