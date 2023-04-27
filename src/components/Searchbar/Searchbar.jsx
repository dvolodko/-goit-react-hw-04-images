import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export function Searchbar({ submitHandler }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.currentTarget.value);
  };

  // const reset = () => {
  //   setSearchQuery('');
  // };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      alert(
        'You are searching for empty string. Please type something in search field'
      );
      return;
    }
    submitHandler(searchQuery);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BsSearch />
          <SearchFormLabel>Search</SearchFormLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
