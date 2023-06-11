import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from 'services/utils';
import { BsSearch } from 'react-icons/bs';
import {
  Search,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    gallerySearchItem: '',
  };

  handleSearchInput = event => {
    this.setState({
      gallerySearchItem: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.gallerySearchItem.trim() === '') {
      return toast.error('Enter a valid query', toastConfig);
    }

    this.props.handleSearchSubmit(this.state.gallerySearchItem);
    this.setState({ gallerySearchItem: '' });
  };

  render() {
    return (
      <Search>
        <SearchForm onSubmit={this.handleSubmit} className="form">
          <SearchButton type="submit">
            <BsSearch style={{ width: 20, height: 20 }} />
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="gallerySearchItem"
            value={this.state.gallerySearchItem}
            onChange={this.handleSearchInput}
          />
        </SearchForm>
      </Search>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
