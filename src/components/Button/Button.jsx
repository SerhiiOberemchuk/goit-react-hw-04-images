import css from './button.module.css';

export const Button = ({ handleNextPage }) => {
  return (
    <button
      className={css.Button}
      type="button"
      aria-label="button"
      onClick={handleNextPage}
    >
      Load more
    </button>
  );
};
