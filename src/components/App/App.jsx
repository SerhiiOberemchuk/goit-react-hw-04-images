import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { fetchGalleryItems } from 'Services/Api';
import Swal from 'sweetalert2';
import css from './app.module.css';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pages, setPages] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const per_page = useRef(12);

  useEffect(() => {
    function fetchImages() {
      if (searchText === '') {
        setLoadMore(false);
        setIsLoading(false);
        return;
      }

      fetchGalleryItems(searchText, pages, per_page.current)
        .then(response => {
          if (!response.data.hits.length) {
            setImages([]);
            Swal.fire({
              title: 'Hmm...',
              text: 'I do not have an answer to this request',
              icon: 'question',
              backdrop: true,
              confirmButtonText: 'Try again?',
            });
          } else {
            setImages(prevState => [...prevState, ...response.data.hits]);
            setLoadMore(
              pages < Math.ceil(response.data.totalHits / per_page.current)
            );
          }
        })
        .catch(error => {
          Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'Not cool (((',
          });
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    }

    if (searchText) {
      setIsLoading(true);
      fetchImages();
    }
  }, [pages, searchText]);

  const handleSearchText = (searchText, pages) => {
    setSearchText(searchText);
    setPages(pages);
    setImages([]);
  };
  const handleNextPage = () => {
    setPages(prevState => prevState + 1);
  };

  const openModal = imageURL => {
    setImageURL(imageURL);
    setIsModal(true);
  };
  const handleCloseModal = () => {
    setImageURL('');
    setIsModal(false);
  };
  const changePerPage = value => {
    per_page.current = value;
  };

  return (
    <div className={css.App}>
      <Searchbar
        handleSearchText={handleSearchText}
        searchText={searchText}
        changePerPage={changePerPage}
      />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {loadMore && images.length > 0 && !isLoading && (
        <Button handleNextPage={handleNextPage} />
      )}
      {isModal && (
        <Modal imageURL={imageURL} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};
