import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const Directory = ({propsCategories}) => {
    return (
        <div className="directory-container">
            {propsCategories.map((category) => (
                <DirectoryItem key={category.id} propsCategory={category} />
            ))}
        </div>
    );
};

export default Directory;