import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { getImages } from 'api-service';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ApiContainer } from './App.styled';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchQuery) return;

    setIsLoading(true);
    const getData = async () => {
      try {
        const { hits, totalHits } = await getImages(searchQuery, page);

        if (!hits.length) {
          alert('No images found');
          return;
        }

        const images = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        setImages(prevState => [...prevState, ...images]);
        setTotalHits(totalHits);
        setError('');
      } catch (error) {
        setError('Oops. Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [page, searchQuery]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  const imageClickHandler = (largeImageURL = '') => {
    setLargeImageURL(largeImageURL);
  };

  const showButton = images.length !== totalHits && !isLoading;

  return (
    <ApiContainer>
      <Searchbar submitHandler={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} imageClickHandler={imageClickHandler} />
      ) : null}
      {isLoading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
        />
      )}
      {showButton ? <Button loadMore={loadMore} /> : null}
      {Boolean(largeImageURL) && (
        <Modal url={largeImageURL} onClose={imageClickHandler}></Modal>
      )}
    </ApiContainer>
  );
}
