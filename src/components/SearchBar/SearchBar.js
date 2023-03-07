import React from 'react';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { toggleSearchBar } from '../../actions/actions';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import styles from './SearchBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearchLocation,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ search, isSearchShown }) => {
  const [address, setAddress] = React.useState('');
  const searchBarRef = React.useRef(null);
  const [isSearchBarShown, setIsSearchBarShown] = React.useState(false);

  const handleSelect = address => {
    setAddress(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => search(latLng))
      .catch(() => {
        /* no-op */
      });
  };

  const setSearchDisplayType = (shouldToggle = false) => {
    if (isMobile) return setIsSearchBarShown(shouldToggle);
    return setIsSearchBarShown(true);
  };

  React.useLayoutEffect(() => {
    if (isSearchShown) searchBarRef?.current?.focus();
  }, [isSearchShown]);

  const openSearch = () => {
    setSearchDisplayType(true);
  };

  React.useEffect(() => {
    setSearchDisplayType();
  }, []);

  return (
    <>
      {isSearchBarShown || !isMobile ? (
        <div className={isMobile ? styles.mobileSearch : styles.desktopSearch}>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
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
                <input
                  {...getInputProps({
                    placeholder: 'Search For Taps Near...'
                  })}
                  className={`${styles.searchInput} form-control`}
                  type="search"
                  ref={searchBarRef}
                />
                {loading && (
                  <div className={styles.autocompleteDropdown}>Loading...</div>
                )}
                {suggestions.length > 0 && (
                  <div className={styles.autocompleteDropdown}>
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? styles.suggestionItemActive
                        : styles.suggestionItem;
                      return (
                        <div
                          key={suggestion.placeId}
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
              onClick={() => {
                setSearchDisplayType(false);
              }}
              aria-label="Close the search bar"
            >
              <FontAwesomeIcon
                className={styles.mobileIcon}
                icon={faChevronLeft}
              />
            </button>
          ) : (
            []
          )}
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = state => ({
  isSearchShown: state.isSearchShown
});

const mapDispatchToProps = { toggleSearchBar };

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
