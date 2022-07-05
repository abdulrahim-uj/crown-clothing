import "./product-card.styles.scss";
import Button from "../button/button.component";

const ProductCard = ({productData}) => {
    const { name, imageUrl, price } = productData;
    console.log('TWO: : : ', productData);
    return (
        <div className="product-card-container">
            <img alt={`${name}`} src={imageUrl} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType={"inverted"}>Add to cart</Button>
        </div>
    );
};

export default ProductCard;
