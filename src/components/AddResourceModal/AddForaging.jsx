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
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ENTRY_TYPE = [
  { entryType: 'Open access', explanation: 'Public site, open to all' },
  { entryType: 'Restricted', explanation: 'May not be open to all' },
  { entryType: 'Unsure', explanation: '' }
];

/*******************************************************************************************
 * This component is @deprecated. Use the equialent in ./AddForaging/AddForaging instead.  *
 *******************************************************************************************/
function AddForaging({
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
  nut,
  onNutChange,
  fruit,
  onFruitChange,
  leaves,
  onLeavesChange,
  bark,
  onBarkChange,
  flowers,
  onFlowersChange,
  root,
  onRootChange,
  guidelines,
  onGuidelinesChange,
  medicinal,
  onMedicinalChange,
  inSeason,
  onInSeasonChange,
  communityGarden,
  onCommunityGardenChange
}) {
  useEffect(() => {
    // create connection to appropriate database
    // based on resource type and hostname of the page
    // (e.g. phlask.me, connect to prod)
    const firebaseConnection = connectToFirebase(
      window.location.hostname,
      'foraging'
    );
    onDbConnectionChange(firebaseConnection);

    // call back to delete app connection whenever component unmounts
    return () => {
      deleteApp(firebaseConnection);
    };
  }, []);

  const FORAGING_HELPFUL_INFO = [
    {
      label: 'Medicinal',
      value: medicinal,
      onChange: onMedicinalChange
    },
    {
      label: 'In season',
      value: inSeason,
      onChange: onInSeasonChange
    },
    {
      label: 'Community garden',
      value: communityGarden,
      onChange: onCommunityGardenChange
    }
  ];

  const FORAGE_TYPE = [
    {
      forageType: 'Nut',
      value: nut,
      onChange: onNutChange
    },
    {
      forageType: 'Fruit',
      value: fruit,
      onChange: onFruitChange
    },
    {
      forageType: 'Leaves',
      value: leaves,
      onChange: onLeavesChange
    },
    {
      forageType: 'Bark',
      value: bark,
      onChange: onBarkChange
    },
    {
      forageType: 'Flowers',
      value: flowers,
      onChange: onFlowersChange
    },
    {
      forageType: 'Root',
      value: root,
      onChange: onRootChange
    }
  ];

  const userLocation = useSelector(state => state.filterMarkers.userLocation);

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
        backgroundColor="#5DA694"
        color="common.white"
      >
        Add a Foraging Resource
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
              buttonStyles={{ backgroundColor: '#5DA694' }}
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
                              onClick: e => {
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
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Forage Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {FORAGE_TYPE.map(type => {
                  return (
                    <ListItem
                      key={type.forageType}
                      as="label"
                      htmlFor={type.forageType}
                    >
                      <Typography style={{ paddingLeft: '0rem' }} fontSize={13}>
                        {type.forageType}
                      </Typography>
                      <Checkbox
                        checked={type.value}
                        name={type.forageType}
                        style={{ marginLeft: 'auto', marginRight: '0rem' }}
                        id={type.forageType}
                        onClick={e => {
                          type.onChange(e);
                        }}
                      />
                    </ListItem>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            <FormGroup>
              <Typography>Helpful info</Typography>
              {FORAGING_HELPFUL_INFO.map(info => {
                return (
                  <ListItem key={info.label} as="label" htmlFor={info.label}>
                    <Typography style={{ paddingLeft: '0rem' }} fontSize={13}>
                      {info.label}
                    </Typography>
                    <Checkbox
                      style={{ marginLeft: 'auto', marginRight: '0rem' }}
                      id={info.label}
                      name={info.label}
                      checked={info.value}
                      onChange={e => {
                        info.onChange(e);
                      }}
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
                backgroundColor: '#5DA694'
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

export default AddForaging;
