import React, { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import styles from './SearchBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar ({search}) {
  const dispatch = useDispatch();
  const isSearchShown = useSelector(state => state.isSearchShown);

  const refSearchBar = useRef();
  const [address, setAddress] = useState('');

  const handleChange = value => {
    setAddress(value)
  };

  const closeSearch = () => {
    dispatch({
      type: 'TOGGLE_SEARCH_BAR',
      isShown: false
    });
  }

  const handleSelect = selectedAddress => {
    closeSearch()
    setAddress(selectedAddress)
    geocodeByAddress(selectedAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => search(latLng))
      .catch(error => console.error('Error', error));
  };

    return (
      <>
        {(isSearchShown || !isMobile) && (
          <div
            className={isMobile ? styles.mobileSearch : styles.desktopSearch}
          >
            <PlacesAutocomplete
              value={address}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div
                  className={`${styles.searchBarContainer} ${
                    loading || suggestions.length > 0 ? styles.hasDropdown : ''
                  }`}
                >
                  {/* type="search" is only HTML5 compliant */}
                  <Input
                    {...getInputProps({
                      placeholder: 'Search For Resources Near...'
                    })}
                    className={`${styles.searchInput} form-control`}
                    type="search"
                    ref={refSearchBar}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                  {loading && (
                    <div className={styles.autocompleteDropdown}>
                      Loading...
                    </div>
                  )}
                  {suggestions.length > 0 && (
                    <div className={styles.autocompleteDropdown}>
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? styles.suggestionItemActive
                          : styles.suggestionItem;
                        return (
                          <div
                            key={suggestion.id}
                            {...getSuggestionItemProps(suggestion, {
                              className
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </PlacesAutocomplete>
            {isMobile ? (
              <button
                className={styles.mobileCloseButton}
                onClick={closeSearch}
                aria-label="Close the search bar"
              >
                <FontAwesomeIcon
                  className={styles.mobileIcon}
                  icon={faTimes}
                />
              </button>
            ) : (
              []
            )}
          </div>
        )}
      </>
    );
}



