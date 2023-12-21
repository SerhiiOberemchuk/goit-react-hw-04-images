import { Component } from 'react';
import css from './imageGaleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { id, webformatURL, largeImageURL, tags } = this.props;

    return (
      <li
        className={css.ImageGalleryItem}
        onClick={() => this.props.openModal(largeImageURL)}
      >
        <img
          className={css.ImageGalleryItem_image}
          src={webformatURL}
          alt={tags}
          id={id}
        />
      </li>
    );
  }
}
