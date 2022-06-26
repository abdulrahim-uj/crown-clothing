import CategoryItem from '../category-item/category-item.component';
import "./directory.styles.scss";

const Directory = ({propsCategories}) => {
    return (
        <div className="directory-container">
            {propsCategories.map((category) => (
                <CategoryItem key={category.id} propsCategory={category} />
            ))}
        </div>
    );
};

export default Directory;