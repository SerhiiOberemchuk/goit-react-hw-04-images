import { Loader } from 'components/Loader/Loader';
import css from './modal.module.css';
import { useEffect, useState } from 'react';

export const Modal = ({ imageURL, handleCloseModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    function handleCloseKey(e) {
      if (e.code === 'Escape') handleCloseModal();
    }
    window.addEventListener('keydown', handleCloseKey);

    return () => {
      window.removeEventListener('keydown', handleCloseKey);
    };
  }, [handleCloseModal]);

  function handleCloseClick(e) {
    if (e.target === e.currentTarget) handleCloseModal();
  }

  return (
    <div className={css.Overlay} onClick={handleCloseClick}>
      <div className={css.Modal}>
        {isLoading && <Loader />}
        <img
          src={imageURL}
          alt="images"
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </div>
    </div>
  );
};
