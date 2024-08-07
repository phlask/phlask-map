import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useRef, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import {
  SEARCH_BAR_MAP_TINT_OFF,
  SEARCH_BAR_MAP_TINT_ON,
  TOOLBAR_MODAL_SEARCH,
  setSearchBarMapTint,
  setTapInfoOpenedWhileSearchOpen,
} from '../../actions/actions';
import styles from './SearchBar.module.scss';
import useIsMobile from 'hooks/useIsMobile';
import noop from 'utils/noop';
import { useSelector, useDispatch } from 'react-redux';

const SearchBar = ({ search }) => {
  const refSearchBarInput = useRef();
  const [address, setAddress] = useState('');
  const tapInfoOpenedWhileSearchOpen = useSelector(state => state.filterMarkers.tapInfoOpenedWhileSearchOpen);
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  const handleSelect = address => {
    setAddress(address);
    dispatch(setSearchBarMapTint(SEARCH_BAR_MAP_TINT_OFF));
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
                    className={`${styles.searchBarContainer} ${loading || suggestions.length > 0
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
                    className={`${styles.searchBarContainer} ${loading || suggestions.length > 0
                      ? styles.hasDropdown
                      : ''
                      }`}
                  >
                    <Input autoFocus
                      {...getInputProps({
                        placeholder: 'Search for Resources near...'
                      })}
                      className={styles.mobileSearchInput}
                      inputRef={refSearchBarInput}
                      type="search"
                      endAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                      disableUnderline={true}
                      onFocus={() => {
                        if (!tapInfoOpenedWhileSearchOpen) {
                          dispatch(setSearchBarMapTint(SEARCH_BAR_MAP_TINT_ON));
                        }
                        else {
                          dispatch(setTapInfoOpenedWhileSearchOpen(false));
                          refSearchBarInput.current.blur();
                        }
                      }
                      }
                      onBlur={() => {
                        dispatch(setSearchBarMapTint(SEARCH_BAR_MAP_TINT_OFF));
                      }}
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
