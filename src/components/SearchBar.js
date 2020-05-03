import React from "react";
import { connect }from 'react-redux'
import { toggleSearchBar } from '../actions'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import "./SearchBar.css";
import searchIcon from './images/searchIconBlack.png'
import closeIcon from './images/closeIcon.png'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
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

  render() {
    return (
      <div>
        {this.props.isSearchShown
          ? <div id='search-container'>
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
                  <div style={{width: 'fit-content'}}>
                    {/* type="search" is only HTML5 compliant */}
                    <input
                      {...getInputProps({
                        placeholder: "Search For Taps Near...",
                        className: "location-search-input"
                      })}
                      id= "search-input"
                      type="search"
                    />
                    {/* <div className="clearInput">
                      <button>&times;</button>
                    </div> */}
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <div id='close-button'
                  onClick={()=>{this.props.toggleSearchBar(false)}}
              >
                <img id='close-icon' src={closeIcon} alt=''/>
              </div>
            </div>
            :<div id='search-icon'
                  onClick={()=>{this.props.toggleSearchBar(true)}}
              >
              <img id='search-img' src={searchIcon} alt=''/>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSearchShown: state.isSearchShown
})

const mapDispatchToProps = { toggleSearchBar }

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)
