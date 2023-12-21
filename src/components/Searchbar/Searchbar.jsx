import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import css from './searchbar.module.css';

export class Searchbar extends Component {
  state = {
    value: '',
    pages: 1,
  };
  handleSubmit = e => {
    e.preventDefault();
    const { value, pages } = this.state;
    const cleanValue = value.trim();
    if (!cleanValue) {
      Swal.fire({
        title: 'Oops...',
        text: "Seems like your search term got lost in the keyboard jungle! Let's try to find it again.",
        icon: 'question',
        backdrop: true,
        confirmButtonText: 'Back to the Search Safari!',
      });
      this.props.handleSearchText(cleanValue, pages);
      this.setState({ value: '' });
      return;
    }
    if (this.props.searchText === cleanValue) {
      Swal.fire({
        title: 'Deja Vu!',
        text: "Looks like you've already searched this! Are you testing your keyboard or just really love these results?",
        icon: 'warning',
        backdrop: true,
        confirmButtonText: 'Search Again Anyway',
      });
      this.setState({ value: '' });
      // this.props.handleSearchText(value, pages);
      return;
    }
    this.props.handleSearchText(cleanValue, pages);
    e.target.reset();
    // this.setState({ value: '' });
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={e => this.handleSubmit(e)}>
          <button
            type="submit"
            className={css.SearchForm_button}
            aria-label="search button"
          >
            <FaSearch />
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            name="search"
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}
