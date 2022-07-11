import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ propsCategory }) => {
    const {imageUrl, title, route} = propsCategory;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
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
