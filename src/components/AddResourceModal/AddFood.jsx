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

const ORGANIZATION_TYPE = ['Governmemnt', 'Business', 'Non-profit', 'Unsure'];

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
  onCommunityFridgesChange,
  perishable,
  onPerishableChange,
  nonPerishable,
  onNonPerishableChange,
  prepared,
  onPreparedChange,
  foodTypeOther,
  onFoodTypeOtherChange,
  eatOnSite,
  onEatOnSiteChange,
  delivery,
  onDeliveryChange,
  pickUp,
  onPickUpChange,
  distributionTypeOther,
  onDistributionTypeOtherChange,
  guidelines,
  onGuidelinesChange
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
      onChange: onCommunityFridgesChange
    }
  ];

  const FOOD_TYPE = [
    {
      id: '0',
      accessType: 'Perishable',
      explanation: 'Fruit, vegetables, dairy, etc.',
      value: perishable,
      name: 'perishable',
      onChange: onPerishableChange
    },
    {
      id: '1',
      accessType: 'Non-perishable',
      explanation: 'Canned, boxed, pantry items, etc.',
      value: nonPerishable,
      name: 'nonPerishable',
      onChange: onNonPerishableChange
    },
    {
      id: '2',
      accessType: 'Prepared food and meals',
      explanation: '',
      value: prepared,
      name: 'prepared',
      onChange: onPreparedChange
    },
    {
      id: '3',
      accessType: 'Other',
      explanation: '',
      value: foodTypeOther,
      name: 'foodTypeOther',
      onChange: onFoodTypeOtherChange
    }
  ];

  const DISTRIBUTION_TYPE = [
    {
      id: '4',
      label: 'Eat on site',
      value: eatOnSite,
      name: 'eatOnSite',
      onChange: onEatOnSiteChange
    },
    {
      id: '5',
      label: 'Delivery',
      value: delivery,
      name: 'delivery',
      onChange: onDeliveryChange
    },
    {
      id: '6',
      label: 'Pickup',
      value: pickUp,
      name: 'pickUp',
      onChange: onPickUpChange
    },
    {
      id: '7',
      label: 'Other',
      value: distributionTypeOther,
      name: 'distributionTypeOther',
      onChange: onDistributionTypeOtherChange
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
        backgroundColor="#FF9A55"
        color="common.white"
      >
        Add a Food Resource
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
              buttonStyles={{ backgroundColor: '#FF9A55' }}
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
                    pattern: /^[A-Za-z]{1,}[.]{1}[a-z]{2,3}/ // typical web url pattern
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
              name="organization"
              defaultValue={''}
              value={organization}
              render={({ field: { onChange, ...rest } }) => (
                <TextField
                  {...rest}
                  variant="outlined"
                  id="organization"
                  label="Organization Type"
                  select
                  helperText={errors.organization && requiredFieldMsg}
                  onChange={e => {
                    onChange(e);
                    onOrganizationChange(e);
                  }}
                  error={errors.organization ? true : false}
                  InputLabelProps={{ shrink: true }}
                >
                  {ORGANIZATION_TYPE.map(orgType => {
                    return (
                      <MenuItem key={orgType} value={orgType}>
                        {orgType}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />

            <FormGroup>
              <Typography>Helpful info</Typography>
              {FOOD_HELPFUL_INFO.map(info => {
                return (
                  <ListItem key={info.label} as="label" htmlFor={info.label}>
                    <Typography style={{ paddingLeft: '0rem' }} fontSize={13}>
                      {info.label}
                    </Typography>
                    <Controller
                      control={control}
                      name={info.label}
                      defaultValue={info.value}
                      value={info.value}
                      render={({ field: { onChange, ...rest } }) => (
                        <Checkbox
                          style={{ marginLeft: 'auto', marginRight: '0rem' }}
                          checked={rest.value}
                          name={rest.name}
                          ref={rest.ref}
                          id={info.label}
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
                  return (
                    <ListItem key={type.name} as="label" htmlFor={type.id}>
                      <Typography
                        component={'span'}
                        style={{ marginLeft: '0rem' }}
                        fontSize={13}
                      >
                        {type.accessType}
                        {type.explanation && (
                          <FormHelperText>{type.explanation}</FormHelperText>
                        )}
                      </Typography>
                      <Controller
                        control={control}
                        name={type.name}
                        defaultValue={type.value}
                        value={type.value}
                        render={({ field: { onChange, ...rest } }) => (
                          <Checkbox
                            checked={rest.value}
                            name={rest.name}
                            style={{ marginLeft: 'auto', marginRight: '0rem' }}
                            id={type.id}
                            onClick={e => {
                              onChange(e);
                              type.onChange(e);
                            }}
                            ref={rest.ref}
                          />
                        )}
                      />
                    </ListItem>
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
                    <ListItem key={type.name} as="label" htmlFor={type.id}>
                      <Typography style={{ marginLeft: '0rem' }} fontSize={13}>
                        {type.label}
                      </Typography>
                      <Controller
                        control={control}
                        name={type.name}
                        defaultValue={false}
                        value={type.value}
                        render={({ field: { onChange, ...rest } }) => (
                          <Checkbox
                            style={{ marginLeft: 'auto', marginRight: '0rem' }}
                            id={type.id}
                            name={rest.name}
                            value={rest.value}
                            onClick={e => {
                              onChange(e);
                              type.onChange(e);
                            }}
                          />
                        )}
                      />
                    </ListItem>
                  );
                })}
              </AccordionDetails>
            </Accordion>
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
                backgroundColor: '#FF9A55'
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
