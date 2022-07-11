import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";

const DirectoryItem = ({ propsCategory }) => {
    const {imageUrl, title} = propsCategory;
    return (
        <DirectoryItemContainer>
            <BackgroundImage
                propImageUrl={imageUrl}
            />
            <Body>
                <h2 className="directory-name">{title}</h2>
                <p className="directory-paragraph">Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
