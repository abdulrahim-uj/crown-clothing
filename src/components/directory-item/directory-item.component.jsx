import "./directory-item.styles.scss";

const DirectoryItem = ({ propsCategory }) => {
    const {imageUrl, title} = propsCategory;
    return (
        <div className="directory-item-container">
            <div
                className="directory-background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="body">
                <h2 className="directory-name">{title}</h2>
                <p className="directory-paragraph">Shop Now</p>
            </div>
        </div>
    );
};

export default DirectoryItem;
