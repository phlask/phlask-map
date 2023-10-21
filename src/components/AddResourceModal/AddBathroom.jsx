import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocode, setDefaults, RequestType } from 'react-geocode';
import styles from './AddResourceModal.module.scss';
import { deleteApp } from 'firebase/app';
import { connectToFirebase } from './utils';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Card,
  CardContent,
  FormGroup,
  Link,
  MenuItem,
  Stack,
  Typography,
  FormControl,
  FormHelperText,
  Checkbox,
  TextField,
  ListItem
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const ENTRY_TYPE = [
  { entryType: 'Open access', explanation: 'Public site, open to all' },
  { entryType: 'Restricted', explanation: 'May not be open to all' },
  { entryType: 'Unsure', explanation: '' }
];

function AddBathroom({
  prev,
  next,
  onSubmit,
  onDbConnectionChange,
  onDrop,
  name,
  onNameChange,
  address,
  onAddressChange,
  website,
  onWebsiteChange,
  description,
  onDescriptionChange,
  entryType,
  onEntryTypeChange,
  guidelines,
  onGuidelinesChange,
  changingTable,
  onChangeChangingTable,
  genderNeutral,
  onChangeGenderNeutral,
  familyBathroom,
  onChangeFamilyBathroom,
  singleOccupancy,
  onChangeSingleOccupancy,
  accessible,
  onAccessibleChange,
  hasFoutain,
  onHasFountainChange
}) {
  useEffect(() => {
    // create connection to appropriate database
    // based on resource type and hostname of the page
    // (e.g. phlask.me, connect to prod)
    const firebaseConnection = connectToFirebase(
      window.location.hostname,
      'bathroom'
    );
    onDbConnectionChange(firebaseConnection);

    // call back to delete app connection whenever component unmounts
    return () => {
      deleteApp(firebaseConnection);
    };
  }, []);

  const BATHROOM_HELPFUL_INFO = [
    {
      label: 'Wheelchair accessible',
      value: accessible,
      onChange: onAccessibleChange
    },
    {
      label: 'Gender neutral',
      value: genderNeutral,
      onChange: onChangeGenderNeutral
    },
    {
      label: 'Changing table',
      value: changingTable,
      onChange: onChangeChangingTable
    },
    {
      label: 'Single occupancy',
      value: singleOccupancy,
      onChange: onChangeSingleOccupancy
    },
    {
      label: 'Family bathroom',
      value: familyBathroom,
      onChange: onChangeFamilyBathroom
    },
    {
      label: 'Also has water fountain',
      value: hasFoutain,
      onChange: onHasFountainChange
    }
  ];

  const userLocation = useSelector(state => state.userLocation);

  useEffect(() => {
    setDefaults({
      // Default values for 'react-geocode'. Used same API key as the one used for 'google-maps-react'
      key: 'AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I', // Your API key here.
      language: 'en', // Default language for responses.
      region: 'es' // Default region for responses.
    });
  }, []);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm();

  const requiredFieldMsg = (
    <span>
      *This field is required* <br />
    </span>
  );

  return (
    <Card
      style={{
        overflow: 'scroll',
        scrollbarWidth: 'none',
        justifyContent: 'center'
      }}
    >
      <Typography
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        padding="0px 20px 10px"
        height="88px"
        backgroundColor="#7C7C7C"
        color="common.white"
      >
        Add Bathroom Resource
      </Typography>
      <CardContent>
        <form
          onSubmit={handleSubmit((data, e) => {
            onSubmit(e).then(() => {
              next();
            });
          })}
        >
          <Stack spacing={4} alignContent="center">
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              buttonStyles={{ backgroundColor: '#7C7C7C' }}
              onChange={onDrop}
              imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
              maxFileSize={5242880}
              withPreview={true}
            />

            <FormControl>
              <Stack spacing={4} justifyContent="center">
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="name"
                  defaultValue={''}
                  value={name}
                  render={({ field: { onChange, ...rest } }) => (
                    <TextField
                      {...rest}
                      id="name"
                      label="Name"
                      onChange={e => {
                        onChange(e);
                        onNameChange(e);
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
                        onAddressChange(e);
                        onChange(e);
                      }}
                      onSelect={e => {
                        onAddressChange(e);
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
                            onChange={e => {
                              onAddressChange(e);
                              onChange(e);
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
                              onClick: () => {
                                // Will autofill the street address textbox with user's current address,
                                // after clicking 'use my address instead'
                                const { lat, lng } = userLocation;
                                geocode(RequestType.LATLNG, `${lat},${lng}`)
                                  .then(({ results }) => {
                                    const addr = results[0].formatted_address;
                                    setValue('address-textbox', addr); //react-hook-form setValue
                                    onAddressChange(addr);
                                    onChange(addr);
                                  })
                                  .catch(console.error);
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
                <Controller
                  rules={{
                    required: true,
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
                      onChange={e => {
                        onChange(e);
                        onWebsiteChange(e);
                      }}
                      error={errors.website ? true : false}
                      helperText={
                        errors.website && <span>Website is not valid</span>
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  defaultValue={''}
                  value={description}
                  render={({ field: { onChange, ...rest } }) => (
                    <TextField
                      {...rest}
                      id="description"
                      label="description"
                      onChange={e => {
                        onChange(e);
                        onDescriptionChange(e);
                      }}
                      helperText="Explain how to access the resource."
                      InputLabelProps={{ shrink: true }}
                      multiline
                      maxRows={2}
                    />
                  )}
                />
              </Stack>
            </FormControl>
            <Controller
              control={control}
              rules={{ required: true }}
              name="entry"
              defaultValue={''}
              value={entryType}
              render={({ field: { onChange, ...rest } }) => (
                <TextField
                  {...rest}
                  variant="outlined"
                  id="entry"
                  label="Entry Type"
                  select
                  helperText={errors.entry && requiredFieldMsg}
                  onChange={e => {
                    onChange(e);
                    onEntryTypeChange(e);
                  }}
                  error={errors.entry ? true : false}
                  InputLabelProps={{ shrink: true }}
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
            <FormGroup>
              <Typography>Helpful info</Typography>
              {BATHROOM_HELPFUL_INFO.map(info => {
                return (
                  <ListItem key={info.label} as="label" htmlFor={info.label}>
                    <Typography style={{ paddingLeft: '0rem' }} fontSize={13}>
                      {info.label}
                    </Typography>
                    <Controller
                      control={control}
                      name={info.label}
                      defaultValue={false}
                      value={info.value}
                      render={({ field: { onChange, ...rest } }) => (
                        <Checkbox
                          style={{ marginLeft: 'auto', marginRight: '0rem' }}
                          checked={rest.value}
                          name={rest.name}
                          ref={rest.ref}
                          id={rest.name}
                          onChange={e => {
                            onChange(e);
                            info.onChange(e);
                          }}
                        />
                      )}
                    />
                  </ListItem>
                );
              })}
            </FormGroup>
            <Controller
              control={control}
              name="guidelines"
              defaultValue={''}
              value={guidelines}
              render={({ field: { onChange, ...rest } }) => (
                <TextField
                  id="guidelines"
                  {...rest}
                  label="Community guideLines"
                  InputLabelProps={{ shrink: true }}
                  multiline
                  maxRows={2}
                  FormHelperTextProps={{ fontSize: '11.67' }}
                  helperText="Share tips on respectful PHLASKing at this location."
                  onChange={e => {
                    onChange(e);
                    onGuidelinesChange(e);
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                textTransform: 'none',
                borderRadius: '8px',
                width: '25%',
                margin: '3.5rem auto 1.5rem auto',
                color: 'white',
                backgroundColor: '#7C7C7C'
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddBathroom;
