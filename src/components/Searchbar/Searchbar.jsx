import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import css from './searchbar.module.css';

export const Searchbar = ({ handleSearchText, searchText }) => {
  const [value, setValue] = useState('');
  const pages = 1;

  const handleSubmit = e => {
    e.preventDefault();
    const cleanValue = value.trim();
    if (!cleanValue) {
      Swal.fire({
        title: 'Oops...',
        text: "Seems like your search term got lost in the keyboard jungle! Let's try to find it again.",
        icon: 'question',
        backdrop: true,
        confirmButtonText: 'Back to the Search Safari!',
      });
      handleSearchText(cleanValue, pages);
      setValue('');
      return;
    }
    if (searchText === cleanValue) {
      Swal.fire({
        title: 'Deja Vu!',
        text: "Looks like you've already searched this! Are you testing your keyboard or just really love these results?",
        icon: 'warning',
        backdrop: true,
        confirmButtonText: 'Search Again Anyway',
      });
      setValue('');
      return;
    }
    handleSearchText(cleanValue, pages);
    e.target.reset();
  };
  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={e => handleSubmit(e)}>
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
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
};
