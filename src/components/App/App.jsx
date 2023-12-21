import { useEffect, useState } from 'react';
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
  // const [per_page, setPer_page] = useState(12);
  const per_page = 12;

  useEffect(() => {
    function fetchImages() {
      if (searchText === '') {
        setLoadMore(false);
        setIsLoading(false);
        return;
      }

      fetchGalleryItems(searchText, pages, per_page)
        .then(response => {
          if (!response.data.hits.length) {
            Swal.fire({
              title: 'Hmm...',
              text: "If you don't know what you want, I'm not sure what to show you!",
              icon: 'question',
              backdrop: true,
              confirmButtonText: 'Try again?',
            });
          } else {
            setImages(prevState => [...prevState, ...response.data.hits]);
            setLoadMore(pages < Math.ceil(response.data.totalHits / per_page));
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
  }, [pages, searchText, per_page]);

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
    setIsModal(false);
  };

  return (
    <div className={css.App}>
      <Searchbar handleSearchText={handleSearchText} searchText={searchText} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {loadMore && <Button handleNextPage={handleNextPage} />}
      {isModal && (
        <Modal imageURL={imageURL} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};
