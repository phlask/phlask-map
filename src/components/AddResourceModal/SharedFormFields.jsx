import React from 'react';
import { Form } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from 'react-places-autocomplete';
import {
  Button,
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
import styles from './AddResourceModal.module.scss';

const addressStyles = {
  width: '100%',
  background: '#eaeef3',
  padding: '6px 12px',
  borderRadius: '4px',
  border: '1px solid #ced4da'
};

const SharedFormFields = ({
  /// ///////////////////////////////////////////////////////////////////////////
  /// /// TODO: Am going to need to decide what to do with these props
  /// ///////////////////////////////////////////////////////////////////////////
  onDrop,
  address,
  onAddressChange
}) => {
  // FOR ADDRESS AUTOFILL
  const handleChange = newAddress => {
    onAddressChange(newAddress);
  };

  const handleSelect = newAddress => {
    onAddressChange(newAddress);
  };

  const {
    register,
    formState: { errors }
  } = useForm();

  return (
    <>
      <ImageUploader
        withIcon
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
        maxFileSize={5242880}
        withPreview
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
            error={!!errors.name}
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
                    <Button variant="text">
                      {'Use my location instead '}{' '}
                      <MyLocationIcon sx={{ fontSize: 10 }} />
                    </Button>
                  }
                  FormHelperTextProps={{
                    sx: { marginLeft: 'auto', marginRight: 0 }
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
                      className,
                      style
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
};

export default SharedFormFields;
