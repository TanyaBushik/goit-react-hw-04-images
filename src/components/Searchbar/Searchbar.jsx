import { useState } from 'react';
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

export const Searchbar = ({ handleSearchSubmit }) => {
  const [gallerySearchItem, setGallerySearchItem] = useState('');

  const handleSearchInput = event => {
    setGallerySearchItem(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (gallerySearchItem.trim() === '') {
      return toast.error('Enter a valid query', toastConfig);
    }

    handleSearchSubmit(gallerySearchItem);
    setGallerySearchItem('');
  };

  return (
    <Search>
      <SearchForm onSubmit={handleSubmit} className="form">
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
          value={gallerySearchItem}
          onChange={handleSearchInput}
        />
      </SearchForm>
    </Search>
  );
};

// export class Searchbar extends Component {
//   state = {
//     gallerySearchItem: '',
//   };

// const handleSearchInput = event => {
//   this.setState({
//     gallerySearchItem: event.currentTarget.value.toLowerCase(),
//   });
// };

// const handleSubmit = event => {
//   event.preventDefault();

//   if (this.state.gallerySearchItem.trim() === '') {
//     return toast.error('Enter a valid query', toastConfig);
//   }

//   this.props.handleSearchSubmit(this.state.gallerySearchItem);
//   this.setState({ gallerySearchItem: '' });
// };

//   render() {
//     return (
//       <Search>
//         <SearchForm onSubmit={this.handleSubmit} className="form">
//           <SearchButton type="submit">
//             <BsSearch style={{ width: 20, height: 20 }} />
//             <SearchButtonLabel>Search</SearchButtonLabel>
//           </SearchButton>

//           <SearchInput
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="gallerySearchItem"
//             value={this.state.gallerySearchItem}
//             onChange={this.handleSearchInput}
//           />
//         </SearchForm>
//       </Search>
//     );
//   }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
