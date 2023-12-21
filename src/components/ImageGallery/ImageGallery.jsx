import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import css from './imageGalery.module.css';

export class ImageGallery extends Component {
  render() {
    const { images, openModal } = this.props;
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
  }
}
