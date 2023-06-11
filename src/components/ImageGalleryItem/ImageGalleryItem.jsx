import PropTypes from 'prop-types';
import {
  ImageGalleryLiItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <ImageGalleryLiItem>
      <ImageGalleryItemImage src={webformatURL} alt={tags} onClick={onClick} />
    </ImageGalleryLiItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
