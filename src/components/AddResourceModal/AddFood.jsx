import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocode, setDefaults, RequestType } from 'react-geocode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './AddResourceModal.module.scss';
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from './SharedFormFields';
// eslint-disable-next-line import/no-unresolved
import SharedAccordionFields from './SharedAccordionFields';
import { deleteApp } from 'firebase/app';
import { connectToFirebase } from './utils';
import { useForm } from 'react-hook-form';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormGroup,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Typography,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  TextField
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FOOD_TYPE = [
  { accessType: 'Perishable', explanation: 'Fruit, vegetables, dairy, etc.' },
  {
    accessType: 'Non-perishable',
    explanation: 'Canned, boxed, pantry items, etc.'
  },
  { accessType: 'Prepared food and meals', explanation: '' },
  { accessType: 'Other' }
];

const ORGANIZATION_TYPE = ['Governmemnt', 'Business', 'Non-profit', 'Unsure'];
const DISTRIBUTION_TYPE = ['Eat on site', 'Delivery', 'Pickup', 'Other'];

function AddFood({
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
  organization,
  onOrganizationChange,
  accessible,
  onAccessibleChange,
  idRequired,
  onIdRequiredChange,
  childrenOnly,
  onChildrenOnlyChange,
  communityFridges,
  onCommunityFridgeChanges,
  consumptionType, // Distribution Type
  onConsumptionTypeChange,
  foodType,
  onFoodTypeChange,
  phlaskStatement,
  onPhlaskStatementChange,
  normsAndRules,
  onNormsAndRulesChange
}) {
  useEffect(() => {
    // create connection to appropriate database
    // based on resource type and hostname of the page
    // (e.g. phlask.me, connect to prod)
    const firebaseConnection = connectToFirebase(
      window.location.hostname,
      'food'
    );
    onDbConnectionChange(firebaseConnection);

    // call back to delete app connection whenever component unmounts
    return () => {
      deleteApp(firebaseConnection);
    };
  }, []);

  const FOOD_HELPFUL_INFO = [
    {
      label: 'Wheelchair accessible',
      value: accessible,
      onChange: onAccessibleChange
    },
    {
      label: 'ID Required',
      value: idRequired,
      onChange: onIdRequiredChange
    },
    {
      label: 'Youth (under 18) only',
      value: childrenOnly,
      onChange: onChildrenOnlyChange
    },
    {
      label: 'Community fridges, etc.',
      value: communityFridges,
      onChange: onCommunityFridgeChanges
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
    register,
    handleSubmit,
    setValue,
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
      {/* <Typography className={sty.mobileHeader} color="common.white"> */}
      <Typography
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        padding="0px 20px 10px"
        height="88px"
        backgroundColor="#FF9A55"
        color="common.white"
      >
        Add a Food Resource
      </Typography>
      <CardContent>
        <form
          onSubmit={handleSubmit(e => {
            e.preventDefault();
            onSubmit(e).then(() => {
              next();
            });
          })}
        >
          <Stack spacing={4} alignContent="center">
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              buttonStyles={{ backgroundColor: '#FF9A55' }}
              onChange={onDrop}
              imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
              maxFileSize={5242880}
              withPreview={true}
            />

            <FormControl>
              <Stack spacing={4} justifyContent="center">
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  value={name}
                  helperText={
                    <span>
                      {errors.name && requiredFieldMsg}
                      Enter a name for the resource. (Example: City Hall)
                    </span>
                  }
                  {...register('name', {
                    required: true,
                    onChange: onNameChange
                  })}
                  error={errors.name ? true : false}
                  InputLabelProps={{ shrink: true }}
                />
                <PlacesAutocomplete
                  value={address}
                  onChange={onAddressChange}
                  onSelect={onAddressChange}
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
                        name="address"
                        label="Street address *"
                        value={address}
                        helperText={
                          <Stack>
                            {errors.address && requiredFieldMsg}
                            <Link>
                              {'Use my location instead  '}
                              <MyLocationIcon sx={{ fontSize: 10 }} />
                            </Link>
                          </Stack>
                        }
                        {...register('address', {
                          required: true,
                          onChange: onAddressChange
                        })}
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
                                setValue('address', addr); //react-hook-form setValue
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
                  name="website"
                  label="Website"
                  value={website}
                  {...register('website', {
                    // regex meaning 1 or more characters, followed by exactly 1 ".",
                    // followed by a 2 or 3 letter top level domain (e.g.: .com, .io, .edu)
                    pattern: /^[A-Za-z]{1,}[.]{1}[a-z]{2,3}/,
                    onChange: onWebsiteChange
                  })}
                  error={errors.website ? true : false}
                  helperText={
                    errors.website && <span>Website is not valid</span>
                  }
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  value={description}
                  helperText="Explain how to access the resource."
                  {...register('description', {
                    onChange: onDescriptionChange
                  })}
                  InputLabelProps={{ shrink: true }}
                  multiline
                  maxRows={2}
                />
              </Stack>
            </FormControl>
            <TextField
              variant="outlined"
              id="organization"
              name="organization"
              label="Organization Type"
              select
              value={organization}
              helperText={errors.organization && requiredFieldMsg}
              {...register('organization', {
                required: true,
                onChange: onOrganizationChange
              })}
              error={errors.organization ? true : false}
              InputLabelProps={{ shrink: true }}
            >
              {ORGANIZATION_TYPE.map(orgType => {
                return (
                  // <MenuItem key={orgType} value={accessType}>
                  <MenuItem key={orgType} value={orgType}>
                    {orgType}
                  </MenuItem>
                );
              })}
            </TextField>
            <FormGroup>
              <Typography>Helpful info</Typography>
              {FOOD_HELPFUL_INFO.map(info => {
                return (
                  <MenuItem key={info.label} as="label" htmlFor={info.label}>
                    <Typography style={{ paddingLeft: '0rem' }} fontSize={13}>
                      {info.label}
                    </Typography>
                    <Checkbox
                      style={{ marginLeft: 'auto', marginRight: '0rem' }}
                      id={info.label}
                      name={info.label}
                      value={false} // change info.value
                      inputRef={{
                        ...register(info.label, {
                          onChange: () => {} // change info.onChange
                        })
                      }}
                    />
                  </MenuItem>
                );
              })}
            </FormGroup>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Food Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {FOOD_TYPE.map(type => {
                  const { accessType, explanation } = type;
                  return (
                    <MenuItem
                      key={accessType}
                      as="label"
                      htmlFor={accessType}
                      second
                    >
                      <Typography style={{ marginLeft: '0rem' }} fontSize={13}>
                        {accessType}
                        {explanation && (
                          <FormHelperText>{explanation}</FormHelperText>
                        )}
                      </Typography>
                      <Checkbox
                        style={{ marginLeft: 'auto', marginRight: '0rem' }}
                        id={accessType}
                        name={accessType}
                        value={false} // change info.value
                        inputRef={{
                          ...register(accessType, {
                            onChange: () => {} // change info.onChange
                          })
                        }}
                      />
                    </MenuItem>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Distribution Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {DISTRIBUTION_TYPE.map(type => {
                  return (
                    <MenuItem key={type} as="label" htmlFor={type} second>
                      <Typography style={{ marginLeft: '0rem' }} fontSize={13}>
                        {type}
                      </Typography>
                      <Checkbox
                        style={{ marginLeft: 'auto', marginRight: '0rem' }}
                        id={type}
                        name={type}
                        value={false} // change info.value
                        inputRef={{
                          ...register(type, {
                            onChange: () => {} // change info.onChange
                          })
                        }}
                      />
                    </MenuItem>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            {/* <TextField
              variant="outlined"
              id="foodType"
              name="foodType"
              label="Food Type"
              select
              value={foodType}
              helperText={errors.forageType && requiredFieldMsg}
              {...register('foodType', {
                required: true,
                onChange: onFoodTypeChange
              })}
              error={errors.foodType ? true : false}
              InputLabelProps={{ shrink: true }}
            >
              {FORAGE_TYPE.map(type => {
                return (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                );
              })}
            </TextField> */}
            <TextField
              id="guidelines"
              label="Community guideLines"
              name="guidelines"
              value={normsAndRules}
              InputLabelProps={{ shrink: true }}
              multiline
              maxRows={2}
              FormHelperTextProps={{ fontSize: '11.67' }}
              helperText="Share tips on respectful PHLASKing at this location."
              {...register('guidelines', {
                onChange: onNormsAndRulesChange
              })}
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(() => {
                console.log('submit');
              })}
              style={{
                borderRadius: '8px',
                width: '25%',
                margin: '3.5rem auto 1.5rem auto',
                color: 'white',
                backgroundColor: '#FF9A55' //Change later
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

export default AddFood;
