import React from "react";
import { Form } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import styles from "./AddResourceModal.module.scss";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";

const addressStyles = {
  width: "100%",
  background: "#eaeef3",
  padding: "6px 12px",
  borderRadius: "4px",
  border: "1px solid #ced4da"
};

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
    onAddressChange(address);
  };

  return (
    <>
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={[".jpg", ".png", ".gif", ".jpeg"]}
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
            <div>
              <input
                {...getInputProps({
                  placeholder: "Enter the address of this resource",
                  className: "modalAddressAutofill",
                  id: "address"
                })}
                className={styles.modalAddressAutofill}
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
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                      key={i}
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
