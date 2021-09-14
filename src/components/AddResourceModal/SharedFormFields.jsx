import React from "react";
import { Form } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import styles from "./AddResourceModal.module.scss";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";

function SharedFormFields({
  onDrop,
  name,
  onNameChange,
  address,
  onAddressChange,
  website,
  onWebsiteChange,
  description,
  onDescriptionChange,
  siteCategory
}) {
  // FOR ADDRESS AUTOFILL
  const handleChange = address => {
    onAddressChange(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("success", latLng))
      .catch(error => console.error("error", error));
  };

  return (
    <>
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={[".jpg", ".png", ".gif"]}
        maxFileSize={5242880}
        withPreview={true}
      />

      <Form.Group controlId="name" value={name} onChange={onNameChange}>
        <Form.Label className={styles.modalFormLabel}>Name</Form.Label>
        <Form.Control
          className={styles.modalFormTextInput}
          text="text"
          placeholder="Organization, store, facility, etc."
        />
      </Form.Group>
      {/* TODO auto complete address based on google maps API */}
      <Form.Group
        controlId="address"
        value={address}
        onChange={onAddressChange}
      >
        <Form.Label className={styles.modalFormLabel}>Address</Form.Label>
        <Form.Control
          className={styles.modalFormTextInput}
          type="text"
          placeholder={`Enter the address of this ${siteCategory}`}
        />
        <PlacesAutocomplete
          classes={styles.modalAddressAutofill}
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
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input"
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, i) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      key={i}
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
      </Form.Group>
      <Form.Group
        controlId="website"
        value={website}
        onChange={onWebsiteChange}
      >
        <Form.Label className={styles.modalFormLabel}>Website</Form.Label>
        <Form.Control
          className={styles.modalFormTextInput}
          type="text"
          placeholder="https://"
        />
      </Form.Group>
      <Form.Group
        controlId="description"
        value={description}
        onChange={onDescriptionChange}
      >
        <Form.Label className={styles.modalFormLabel}>Description</Form.Label>
        <Form.Control
          className={styles.modalFormTextInput}
          type="textarea"
          rows="2"
          placeholder={`Please describe the ${siteCategory}`}
        />
      </Form.Group>
    </>
  );
}

export default SharedFormFields;
