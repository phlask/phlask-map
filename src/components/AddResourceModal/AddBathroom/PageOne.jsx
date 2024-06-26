import React from 'react';
import ImageUploader from 'react-images-upload';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocode, RequestType } from 'react-geocode';
import styles from '../AddResourceModal.module.scss';
import { Controller } from 'react-hook-form';
import {
  Grid,
  Link,
  MenuItem,
  Stack,
  FormHelperText,
  TextField
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import useIsMobile from 'hooks/useIsMobile';
import noop from 'utils/noop';

const ENTRY_TYPE = [
  { entryType: 'Open access', explanation: 'Public site, open to all' },
  { entryType: 'Restricted', explanation: 'May not be open to all' },
  { entryType: 'Unsure', explanation: '' }
];

const PageOne = ({
  // state values and handlers for the textfields
  onDrop,
  name,
  address,
  website,
  description,
  entryType,
  // handlers for the dispenser type drop down
  userLocation,
  requiredFieldMsg,
  // react hook form
  errors,
  control,
  setValue,
  textFieldChangeHandler
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && (
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          buttonStyles={{ backgroundColor: '#7C7C7C' }}
          onChange={onDrop}
          imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
          maxFileSize={5242880}
          withPreview={true}
        />
      )}

      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Controller
          rules={{ required: true }}
          control={control}
          name="name"
          defaultValue={''}
          value={name}
          render={({ field: { onChange, ...rest } }) => (
            <TextField
              {...rest}
              fullWidth
              id="name"
              label="Name"
              autoComplete="on"
              onChange={e => {
                onChange(e);
                textFieldChangeHandler(e);
              }}
              helperText={
                <span>
                  {errors.name && requiredFieldMsg}
                  Enter a name for the resource. (Example: City Hall)
                </span>
              }
              error={errors.name ? true : false}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Controller
          rules={{ required: true }}
          control={control}
          name="address"
          defaultValue={''}
          value={address}
          render={({ field: { onChange, ...rest } }) => (
            <PlacesAutocomplete
              {...rest}
              onChange={e => {
                onChange(e);
                textFieldChangeHandler(e);
              }}
              onSelect={e => {
                textFieldChangeHandler(e);
                onChange(e);
              }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div>
                  <TextField
                    value={rest.value}
                    id="address"
                    name="address-textbox"
                    label="Street address *"
                    fullWidth
                    onChange={e => {
                      onChange(e);
                      textFieldChangeHandler(e);
                    }}
                    helperText={
                      <Stack component={'span'}>
                        {errors.address && requiredFieldMsg}
                        <Link>
                          {'Use my location instead  '}
                          <MyLocationIcon sx={{ fontSize: 10 }} />
                        </Link>
                      </Stack>
                    }
                    error={errors.address ? true : false}
                    FormHelperTextProps={{
                      sx: { marginLeft: 'auto', marginRight: 0 },
                      onClick: e => {
                        // Will autofill the street address textbox with user's current address,
                        // after clicking 'use my address instead'
                        const { lat, lng } = userLocation;
                        geocode(RequestType.LATLNG, `${lat},${lng}`)
                          .then(({ results }) => {
                            const addr = results[0].formatted_address;
                            setValue('address-textbox', addr); //react-hook-form setValue
                            textFieldChangeHandler(addr);
                            onChange(addr);
                          })
                          .catch(noop);
                      }
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
                        ? {
                            backgroundColor: '#fafafa',
                            cursor: 'pointer'
                          }
                        : {
                            backgroundColor: '#ffffff',
                            cursor: 'pointer'
                          };
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
          )}
        />
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Controller
          rules={{
            required: false,
            pattern: /^[A-Za-z]{1,}[.]{1}[a-z]{2,3}/
          }}
          control={control}
          name="website"
          defaultValue={''}
          value={website}
          render={({ field: { onChange, ...rest } }) => (
            <TextField
              {...rest}
              id="website"
              label="Website"
              fullWidth
              onChange={e => {
                onChange(e);
                textFieldChangeHandler(e);
              }}
              error={errors.website ? true : false}
              helperText={errors.website && <span>*Website is not valid*</span>}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Controller
          control={control}
          name="description"
          defaultValue={''}
          value={description}
          render={({ field: { onChange, ...rest } }) => (
            <TextField
              {...rest}
              id="description"
              label="Description"
              fullWidth
              onChange={e => {
                onChange(e);
                textFieldChangeHandler(e);
              }}
              helperText="Explain how to access the resource."
              InputLabelProps={{ shrink: true }}
              multiline
              maxRows={2}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Controller
          control={control}
          rules={{ required: true }}
          name="entryType"
          defaultValue={''}
          value={entryType}
          render={({ field: { onChange, ...rest } }) => (
            <TextField
              {...rest}
              variant="outlined"
              id="entry"
              label="Entry Type"
              select
              fullWidth
              width="500px"
              onChange={e => {
                onChange(e);
                textFieldChangeHandler(e);
              }}
              SelectProps={{
                MenuProps: { disablePortal: true }
              }}
              helperText={errors.entryType && requiredFieldMsg}
              error={errors.entryType ? true : false}
              InputLabelProps={{ component: 'span', shrink: true }}
            >
              {ENTRY_TYPE.map(item => {
                return (
                  <MenuItem key={item.entryType} value={item.entryType}>
                    <Stack>
                      {item.entryType}
                      {item.explanation && (
                        <FormHelperText>{item.explanation}</FormHelperText>
                      )}
                    </Stack>
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
      </Grid>
    </>
  );
};

export default PageOne;
