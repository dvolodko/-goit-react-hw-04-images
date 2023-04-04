import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = event => {
    const value = event.currentTarget.value;
    this.setState({ searchQuery: value });
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitHandler(this.state.searchQuery);
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <BsSearch />
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
