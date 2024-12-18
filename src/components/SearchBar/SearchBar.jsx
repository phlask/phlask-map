import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useRef, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import useIsMobile from 'hooks/useIsMobile';
import noop from 'utils/noop';
import { useSelector } from 'react-redux';
import styles from './SearchBar.module.scss';
import { TOOLBAR_MODAL_SEARCH, setToolbarModal } from '../../actions/actions';

const SearchBar = ({ search }) => {
  const refSearchBar = useRef();
  const [address, setAddress] = useState('');
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const isMobile = useIsMobile();

  const handleSelect = newAddress => {
    setAddress(newAddress);
    geocodeByAddress(newAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => search(latLng))
      .catch(noop);
  };

  if (toolbarModal !== TOOLBAR_MODAL_SEARCH) {
    return null;
  }

  if (isMobile) {
    return (
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
          }) => {
            const {
              autoComplete,
              role,
              'aria-autocomplete': ariaAutocomplete,
              'aria-expanded': ariaExpanded,
              'aria-activedescendant': ariaActiveDescendent,
              disabled,
              onKeyDown,
              onBlur,
              onChange,
              type,
              placeholder,
              value
            } = getInputProps({
              placeholder: 'Search for Resources near...'
            });
            return (
              <div
                className={`${styles.searchBarContainer} ${
                  loading || suggestions.length > 0 ? styles.hasDropdown : ''
                }`}
              >
                <Input
                  autoComplete={autoComplete}
                  role={role}
                  aria-autocomplete={ariaAutocomplete}
                  aria-expanded={ariaExpanded}
                  aria-activedescendant={ariaActiveDescendent}
                  disabled={disabled}
                  onKeyDown={onKeyDown}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  className={styles.mobileSearchInput}
                  type={type}
                  ref={refSearchBar}
                  placeholder={placeholder}
                  endAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  disableUnderline
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

                      const {
                        key,
                        id,
                        onMouseEnter,
                        onMouseLeave,
                        onMouseDown,
                        onMouseUp,
                        onTouchStart,
                        onTouchEnd,
                        onClick
                      } = getSuggestionItemProps(suggestion, {
                        className
                      });

                      return (
                        <div
                          key={key}
                          id={id}
                          role="option"
                          onMouseEnter={onMouseEnter}
                          onMouseLeave={onMouseLeave}
                          onMouseDown={onMouseDown}
                          onMouseUp={onMouseUp}
                          onTouchStart={onTouchStart}
                          onTouchEnd={onTouchEnd}
                          onClick={onClick}
                          onKeyDown={onClick}
                          tabIndex={0}
                          aria-selected={suggestion.active}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
      </div>
    );
  }

  return (
    <div className={styles.desktopSearch}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          const {
            autoComplete,
            role,
            'aria-autocomplete': ariaAutocomplete,
            'aria-expanded': ariaExpanded,
            'aria-activedescendant': ariaActiveDescendent,
            disabled,
            onKeyDown,
            onBlur,
            placeholder,
            onChange,
            type,
            value
          } = getInputProps({
            placeholder: 'Search for Resources near...'
          });

          return (
            <div
              className={`${styles.searchBarContainer} ${
                loading || suggestions.length > 0 ? styles.hasDropdown : ''
              }`}
            >
              {/* type="search" is only HTML5 compliant */}
              <Input
                autoComplete={autoComplete}
                role={role}
                aria-autocomplete={ariaAutocomplete}
                aria-expanded={ariaExpanded}
                aria-activedescendant={ariaActiveDescendent}
                disabled={disabled}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                className={`${styles.searchInput} form-control`}
                type={type}
                inputRef={refSearchBar}
                placeholder={placeholder}
                startAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
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

                    const {
                      key,
                      onMouseEnter,
                      onMouseLeave,
                      onMouseDown,
                      onMouseUp,
                      onTouchStart,
                      onTouchEnd,
                      onClick
                    } = getSuggestionItemProps(suggestion, {
                      className
                    });

                    return (
                      <div
                        className={className}
                        key={key}
                        id={suggestion.id}
                        role="option"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        onClick={onClick}
                        onKeyDown={onClick}
                        tabIndex={0}
                        aria-selected={suggestion.active}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }}
      </PlacesAutocomplete>
    </div>
  );
};

export default SearchBar;
