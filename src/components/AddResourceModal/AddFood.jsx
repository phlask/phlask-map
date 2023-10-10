import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocode, setDefaults, RequestType } from 'react-geocode';
import styles from './AddResourceModal.module.scss';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
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
  TextField
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
  consumptionType, // Distribution Type
  onConsumptionTypeChange,
  foodType,
  onFoodTypeChange,
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
      onChange: onCommunityFridgesChange
    }
  ];

  const FOOD_TYPE = [
    {
      accessType: 'Perishable',
      explanation: 'Fruit, vegetables, dairy, etc.',
      value: perishable,
      onChange: onPerishableChange
    },
    {
      accessType: 'Non-perishable',
      explanation: 'Canned, boxed, pantry items, etc.',
      value: nonPerishable,
      onChange: onNonPerishableChange
    },
    {
      accessType: 'Prepared food and meals',
      explanation: '',
      value: prepared,
      onChange: onPreparedChange
    },
    {
      accessType: 'Other',
      explanation: '',
      value: foodTypeOther,
      onChange: onFoodTypeOtherChange
    }
  ];

  const DISTRIBUTION_TYPE = [
    {
      label: 'Eat on site',
      value: eatOnSite,
      onChange: onEatOnSiteChange
    },
    {
      label: 'Delivery',
      value: delivery,
      onChange: onDeliveryChange
    },
    {
      label: 'Pickup',
      value: pickUp,
      onChange: onPickUpChange
    },
    {
      label: 'Other',
      value: distributionTypeOther,
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
    register,
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
          onSubmit={handleSubmit((data, e) => {
            console.log(e);
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
                        console.log('name');
                        console.log(rest.value);
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
                        console.log('address');
                        console.log(rest.value);
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
                              <Stack>
                                {errors.address && requiredFieldMsg}
                                <Link onClick={() => {}}>
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
                        console.log('website');
                        console.log(rest.value);
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
                        console.log('description');
                        console.log(rest.value);
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
                  variant="outlined"
                  id="organization"
                  name="organization"
                  label="Organization Type"
                  select
                  value={organization}
                  helperText={errors.organization && requiredFieldMsg}
                  onChange={e => {
                    onChange(e);
                    onOrganizationChange(e);
                    console.log('organizationtype');
                    console.log(rest.value);
                  }}
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
              )}
            />

            <FormGroup>
              <Typography>Helpful info</Typography>
              {FOOD_HELPFUL_INFO.map(info => {
                return (
                  <MenuItem key={info.label} as="label" htmlFor={info.label}>
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
                          {...rest}
                          id={info.label}
                          // name={info.label}
                          // value={false}
                          onChange={e => {
                            onChange(e);
                            info.onChange(e);
                            console.log(info.label);
                            console.log(rest.value);
                          }}
                        />
                      )}
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
                  return (
                    <MenuItem
                      key={type.accessType}
                      as="label"
                      htmlFor={type.accessType}
                      second
                    >
                      <Typography style={{ marginLeft: '0rem' }} fontSize={13}>
                        {type.accessType}
                        {type.explanation && (
                          <FormHelperText>{type.explanation}</FormHelperText>
                        )}
                      </Typography>
                      <Controller
                        control={control}
                        name={type.accessType}
                        defaultValue={type.value}
                        value={type.value}
                        render={({ field: { onChange, ...rest } }) => (
                          <Checkbox
                            // {...rest}
                            checked={rest.value}
                            style={{ marginLeft: 'auto', marginRight: '0rem' }}
                            id={type.accessType}
                            onClick={e => {
                              onChange(e);
                              type.onChange(e);
                              console.log(type.value);
                            }}
                            ref={rest.ref}
                          />
                        )}
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
                    <MenuItem
                      key={type.label}
                      as="label"
                      htmlFor={type.label}
                      second
                    >
                      <Typography style={{ marginLeft: '0rem' }} fontSize={13}>
                        {type.label}
                      </Typography>
                      <Controller
                        control={control}
                        name={type.label}
                        defaultValue={false}
                        value={type.value}
                        render={({ field: { onChange, ...rest } }) => (
                          <Checkbox
                            style={{ marginLeft: 'auto', marginRight: '0rem' }}
                            id={rest.name}
                            name={rest.name}
                            value={rest.value} // change info.value
                            onClick={e => {
                              onChange(e);
                              type.onChange(e);
                              console.log(type.value);
                            }}
                          />
                        )}
                      />
                      {/* <Checkbox
                        style={{ marginLeft: 'auto', marginRight: '0rem' }}
                        id={type}
                        name={type}
                        value={false} // change info.value
                        {...register(type, {
                          onChange: () => {} // change info.onChange
                        })}
                      /> */}
                    </MenuItem>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            <Controller
              control={control}
              name="guidelines"
              defaultValue={''}
              value={normsAndRules}
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
                    onNormsAndRulesChange(e);
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
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
