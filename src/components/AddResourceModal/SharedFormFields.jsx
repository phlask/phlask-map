import React from 'react';
import { Form } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import styles from './AddResourceModal.module.scss';
//import classes from './Form.module.scss';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from 'react-places-autocomplete';
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { useForm, Controller } from 'react-hook-form';

const addressStyles = {
  width: '100%',
  background: '#eaeef3',
  padding: '6px 12px',
  borderRadius: '4px',
  border: '1px solid #ced4da'
};

function SharedFormFields({
  //////////////////////////////////////////////////////////////////////////////
  ////// TODO: Am going to need to decide what to do with these props
  //////////////////////////////////////////////////////////////////////////////
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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <>
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
        maxFileSize={5242880}
        withPreview={true}
      />

      <FormControl>
        <Stack spacing={4} justifyContent="center">
          <TextField
            id="name"
            label="Name"
            name="name"
            helperText="Enter a name for the resource. (Example: City Hall)"
            InputLabelProps={{ shrink: true }}
            {...register('name', { required: true })}
            error={errors.name ? true : false}
          />
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
                <TextField
                  id="address"
                  label="Street address *"
                  helperText={
                    <Link>
                      {'Use my location instead '}{' '}
                      <MyLocationIcon sx={{ fontSize: 10 }} />
                    </Link>
                  }
                  FormHelperTextProps={{
                    sx: { marginLeft: 'auto', marginRight: 0 },
                    onClick: () => alert('Use My Location onClick PlaceHolder!')
                  }}
                  style={{ backgroundColor: 'white' }}
                  InputLabelProps={{ shrink: true }}
                  {...getInputProps({
                    className: 'modalAddressAutofill',
                    id: 'address'
                  })}
                  className={styles.modalAddressAutofill}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion, i) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
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
          <TextField
            id="website"
            label="Website"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="description"
            label="Description"
            helperText="Explain how to access the resource."
            InputLabelProps={{ shrink: true }}
            multiline
            maxRows={2}
          />
        </Stack>
      </FormControl>
    </>
  );
}

export default SharedFormFields;
