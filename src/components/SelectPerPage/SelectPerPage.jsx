import { useEffect, useState } from 'react';
import Select from 'react-select';
import css from './SelectPerPage.module.css';

let options = [];
const arreyPerPages = () => {
  for (let index = 3; index <= 200; index++) {
    options.push({
      value: index,
      label: `${index}`,
    });
  }
};
arreyPerPages();

export const SelectPerPage = ({ changePerPage }) => {
  const [selectedOption, setSelectedOption] = useState({
    value: 12,
    label: '12',
  });
  useEffect(() => {
    changePerPage(selectedOption.value);
  }, [selectedOption, changePerPage]);

  return (
    <div className={css.App}>
      <h3>Select the number of images in the new search</h3>
      <Select
        defaultValue={selectedOption}
        onChange={option => setSelectedOption(option)}
        options={options}
      />
    </div>
  );
};
