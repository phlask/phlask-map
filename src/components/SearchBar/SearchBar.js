import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useRef, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { TOOLBAR_MODAL_SEARCH, setToolbarModal } from '../../actions/actions';
import styles from './SearchBar.module.scss';
import useIsMobile from 'hooks/useIsMobile';
import noop from 'utils/noop';
import { useSelector } from 'react-redux/es/exports';

const SearchBar = ({ search }) => {
  const refSearchBar = useRef();
  const [address, setAddress] = useState('');
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const isMobile = useIsMobile();

  const handleSelect = address => {
    setAddress(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => search(latLng))
      .catch(noop);
  };

  return (
    <>
      {toolbarModal == TOOLBAR_MODAL_SEARCH && (
        <>
          {!isMobile ? (
            <div className={styles.desktopSearch}>
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
                      loading || suggestions.length > 0
                        ? styles.hasDropdown
                        : ''
                    }`}
                  >
                    {/* type="search" is only HTML5 compliant */}
                    <Input
                      {...getInputProps({
                        placeholder: 'Search for Resources near...'
                      })}
                      className={`${styles.searchInput} form-control`}
                      type="search"
                      ref={refSearchBar}
                      startAdornment={
                        <InputAdornment position="end">
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
            </div>
          ) : (
            <div className={styles.mobileSearch}>
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
                      loading || suggestions.length > 0
                        ? styles.hasDropdown
                        : ''
                    }`}
                  >
                    <Input
                      {...getInputProps({
                        placeholder: 'Search for Resources near...'
                      })}
                      className={styles.mobileSearchInput}
                      type="search"
                      ref={refSearchBar}
                      endAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                      disableUnderline={true}
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
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchBar;
