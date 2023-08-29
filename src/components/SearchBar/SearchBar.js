import {
  faChevronLeft,
  faSearchLocation
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react';
import { isMobile } from 'react-device-detect';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { connect } from 'react-redux';
import {
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH,
  setToolbarModal
} from '../../actions/actions';
import styles from './SearchBar.module.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      refSearchBar: React.createRef()
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.search(latLng))
      .catch(error => console.error('Error', error));
  };

  componentDidUpdate(prevProps) {
    // if (this.props.isSearchShown && !prevProps.isSearchShown) {
    //   this.state.refSearchBar.current.focus();
    // }
  }

  componentDidMount() {
    // this.setSearchDisplayType();
  }

  render() {
    return (
      <>
        {this.props.toolbarModal == TOOLBAR_MODAL_SEARCH ? (
          <div
            className={isMobile ? styles.mobileSearch : styles.desktopSearch}
          >
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
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
                    ref={this.state.refSearchBar}
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
                onClick={() => {
                  // this.setSearchDisplayType(false);
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
        ) : (
          <button
            className={styles.mobileSearchButton}
            // onClick={this.openSearch.bind(this)}
            aria-label="Search for a location"
          >
            <FontAwesomeIcon
              className={styles.mobileIcon}
              icon={faSearchLocation}
            />
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  toolbarModal: state.toolbarModal
});

const mapDispatchToProps = {
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH,
  TOOLBAR_MODAL_NONE,
  setToolbarModal
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
