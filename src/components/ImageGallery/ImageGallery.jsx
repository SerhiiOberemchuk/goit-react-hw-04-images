import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { v4 as uuidv4 } from 'uuid';
import css from './imageGalery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            openModal={openModal}
            key={uuidv4()}
            tags={tags}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
    </>
  );
};
