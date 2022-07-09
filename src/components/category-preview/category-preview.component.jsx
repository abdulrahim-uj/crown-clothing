import "./category-preview.styles.scss";
import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({ titleValue, productsArray }) => {
    return (
        <div className="category-preview-container">
            <h2>
                <span className="title">{titleValue.toUpperCase()}</span>
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