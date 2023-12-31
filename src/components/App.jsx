import { useEffect, useState } from 'react';
// import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from 'services/utils';

import { AppContainer, ModalImage } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from '../services/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [largeImageURL, setLargeImageURL] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!searchQuery) return;

    getImages(searchQuery, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          toast.error('Enter a valid query', toastConfig);
          return;
        }
        if (hits.length < 12 || (hits.length !== 0 && hits.length < 12)) {
          toast.info('No more images', toastConfig);
        }

        setImages(prevHits => [...prevHits, ...hits]);
        setTotalHits(totalHits);
      })
      .catch(error => console.error(error.response))
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  const handleSearchSubmit = gallerySearchItem => {
    setSearchQuery(gallerySearchItem);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  const handleLoadMore = () => setPage(prevPage => prevPage + 1);

  const toggleModal = (largeImageURL = '') => {
    setLargeImageURL(largeImageURL);
  };

  const showLoadMoreBtn = !loading && images.length !== totalHits;
  return (
    <AppContainer>
      <Searchbar handleSearchSubmit={handleSearchSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} handleImageClick={toggleModal} />
      )}

      {showLoadMoreBtn && (
        <Button onClick={handleLoadMore} disabled={loading} />
      )}
      {loading && <Loader />}

      {largeImageURL && (
        <Modal onClose={toggleModal}>
          <ModalImage src={largeImageURL} />
        </Modal>
      )}

      <ToastContainer />
    </AppContainer>
  );
};

// export class App extends Component {
//   state = {
//     largeImageURL: '',
//     searchQuery: '',
//     page: 1,
//     hits: [],
//     loading: false,
//     totalHits: 0,
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchQuery, page } = this.state;

//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.setState({ loading: true });

//       getImages(searchQuery, page)
//         .then(({ hits: newHits, totalHits }) => {
//           if (this.state.searchQuery.trim() === '' || totalHits === 0) {
//             toast.error('Enter a valid query', toastConfig);
//             return;
//           }

//           if (
//             (prevState.hits.length === 0 && newHits.length === totalHits) ||
//             (prevState.hits.length !== 0 && newHits.length < 12)
//           ) {
//             toast.info('No more images', toastConfig);
//           }

//           this.setState(prevState => ({
//             hits: [...prevState.hits, ...newHits],
//             totalHits,
//           }));
//         })
//         .catch(error => {
//           console.error(error.response);
//         })
//         .finally(() => {
//           this.setState({ loading: false });
//         });
//     }
//   }

//   handleSearchSubmit = gallerySearchItem => {
//     this.setState({
//       searchQuery: gallerySearchItem,
//       page: 1,
//       hits: [],
//       totalHits: 0,
//     });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   toggleModal = (largeImageURL = '') => {
//     this.setState({ largeImageURL: largeImageURL });
//   };

//   render() {
//     const { loading, hits, largeImageURL, totalHits } = this.state;
//     const showLoadMoreBtn = !loading && hits.length !== totalHits;

//     return (
//       <AppContainer>
//         <Searchbar handleSearchSubmit={this.handleSearchSubmit} />

//         {hits.length > 0 && (
//           <ImageGallery images={hits} handleImageClick={this.toggleModal} />
//         )}

//         {showLoadMoreBtn && (
//           <Button onClick={this.handleLoadMore} disabled={loading} />
//         )}
//         {loading && <Loader />}

//         {largeImageURL && (
//           <Modal onClose={this.toggleModal}>
//             <ModalImage src={largeImageURL} />
//           </Modal>
//         )}

//         <ToastContainer autoClose={5000} />
//       </AppContainer>
//     );
//   }
// }
