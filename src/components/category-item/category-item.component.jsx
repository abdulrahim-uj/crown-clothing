import "./category-item.styles.scss";

const CategoryItem = ({ propsCategory }) => {
    const {imageUrl, title} = propsCategory;
    return (
        <div className="category-container">
            <div
                className="category-background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="category-body-container">
                <h2 className="category-name">{title}</h2>
                <p className="category-paragraph">Shop Now</p>
            </div>
        </div>
    );
};

export default CategoryItem;
