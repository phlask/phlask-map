import React from "react";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { toggleSearchBar } from "../../actions/actions";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import styles from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchLocation,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import TutorialModal from "../TutorialModal/TutorialModal";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      refSearchBar: React.createRef(),
      isSearchBarShown: false
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
      .catch(error => console.error("Error", error));
  };

  openSearch() {
    this.setSearchDisplayType(true);
  }

  setSearchDisplayType(shouldToggle = false) {
    if (isMobile) {
      this.setState({
        isSearchBarShown: shouldToggle
      });
    } else {
      this.setState({
        isSearchBarShown: true
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSearchShown && !prevProps.isSearchShown) {
      this.state.refSearchBar.current.focus();
    }
  }

  componentDidMount() {
    this.setSearchDisplayType();
  }

  render() {
    return (
      <>
        {this.state.isSearchBarShown ? (
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
                    loading || suggestions.length > 0 ? styles.hasDropdown : ""
                  }`}
                >
                  {/* type="search" is only HTML5 compliant */}
                  <input
                    {...getInputProps({
                      placeholder: "Search For Taps Near..."
                    })}
                    className={`${styles.searchInput} form-control`}
                    type="search"
                    ref={this.state.refSearchBar}
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
                  this.setSearchDisplayType(false);
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
            onClick={this.openSearch.bind(this)}
            aria-label="Search for a location"
          >
            <FontAwesomeIcon
              className={styles.mobileIcon}
              icon={faSearchLocation}
            />
          </button>
        )}

        <TutorialModal
          showButton={isMobile ? !this.state.isSearchBarShown : true}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isSearchShown: state.isSearchShown
});

const mapDispatchToProps = { toggleSearchBar };

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
