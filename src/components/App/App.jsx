import { Component } from 'react';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { fetchGalleryItems } from 'Services/Api';
import Swal from 'sweetalert2';
import css from './app.module.css';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchText: '',
    pages: 1,
    isModal: false,
    imageURL: '',
    loadMore: false,
    per_page: 12,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.pages !== prevState.pages ||
      this.state.searchText !== prevState.searchText
    ) {
      this.setState({ isLoading: true });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    if (this.state.searchText === '') {
      this.setState({ isLoading: false, loadMore: false });
      return;
    }
    const { searchText, pages, per_page } = this.state;
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
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...response.data.hits],
              loadMore: pages < Math.ceil(response.data.totalHits / per_page),
            };
          });
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
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSearchText = (searchText, pages) => {
    this.setState({ searchText, pages, images: [] });
  };
  handleNextPage = () => {
    this.setState(prevState => {
      return { pages: prevState.pages + 1 };
    });
  };

  openModal = imageURL => {
    this.setState({ imageURL, isModal: true });
  };
  handleCloseModal = () => {
    this.setState({ imageURL: '', isModal: false });
  };
  render() {
    return (
      <div className={css.App}>
        <Searchbar
          handleSearchText={this.handleSearchText}
          searchText={this.state.searchText}
        />
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.isLoading && <Loader />}
        {this.state.loadMore && <Button handleNextPage={this.handleNextPage} />}
        {this.state.isModal && (
          <Modal
            imageURL={this.state.imageURL}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
