import css from './imageGaleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  openModal,
}) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => openModal(largeImageURL)}
    >
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        id={id}
      />
    </li>
  );
};
