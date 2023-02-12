import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    searchText: '',
  };

  submitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchText);
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.submitForm}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          value={this.state.searchText}
          onChange={event => {
            this.setState({ searchText: event.target.value });
          }}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
