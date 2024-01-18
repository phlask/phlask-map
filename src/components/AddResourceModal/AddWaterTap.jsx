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
  Box,
  Button,
  CardContent,
  FormGroup,
  Grid,
  Link,
  MenuItem,
  Stack,
  Typography,
  FormControl,
  FormHelperText,
  Checkbox,
  TextField,
  ListItem,
  IconButton
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { isMobile } from 'react-device-detect';

const ENTRY_TYPE = [
  { entryType: 'Open access', explanation: 'Public site, open to all' },
  { entryType: 'Restricted', explanation: 'May not be open to all' },
  { entryType: 'Unsure', explanation: '' }
];

/*******************************************************************************************
 * This component is @deprecated. Use the equialent in ./AddWaterTap/AddWaterTap instead.  *
 *******************************************************************************************/
function AddWaterTap({
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
  accessible,
  onAccessibleChange,
  idRequired,
  onIdRequiredChange,
  waterVesselNeeded,
  onWaterVesselNeededChange,
  filtration,
  onFiltrationChange,
  drinkingFountain,
  onDrinkingFountainChange,
  bottleFillerAndFountain,
  onBottleFillerAndFountainChange,
  sink,
  onSinkChange,
  waterJug,
  onWaterJugChange,
  sodaMachine,
  onSodaMachineChange,
  pitcher,
  onPitcherChange,
  waterCooler,
  onWaterCoolerChange,
  dispenserTypeOther,
  onDispenserTypeOtherChange,
  guidelines,
  onGuidelinesChange
}) {
  useEffect(() => {
    // create connection to appropriate database
    // based on resource type and hostname of the page
    // (e.g. phlask.me, connect to prod)
    // and then set dbconnection to the returned connection
    const firebaseConnection = connectToFirebase(
      window.location.hostname,
      'water'
    );
    onDbConnectionChange(firebaseConnection);

    // call back to delete app connection whenever component unmounts
    return () => {
      deleteApp(firebaseConnection);
    };
  }, []);

  const DISPENSER_TYPE = [
    {
      label: 'Drinking fountain',
      value: drinkingFountain,
      onChange: onDrinkingFountainChange
    },
    {
      label: 'Bottle filler and fountain',
      value: bottleFillerAndFountain,
      onChange: onBottleFillerAndFountainChange
    },
    {
      label: 'Sink',
      value: sink,
      onChange: onSinkChange
    },
    {
      label: 'Water jug',
      value: waterJug,
      onChange: onWaterJugChange
    },
    {
      label: 'Soda machine',
      value: sodaMachine,
      onChange: onSodaMachineChange
    },
    {
      label: 'Pitcher',
      value: pitcher,
      onChange: onPitcherChange
    },
    {
      label: 'Water cooler',
      value: waterCooler,
      onChange: onWaterCoolerChange
    },
    {
      label: 'Other',
      value: dispenserTypeOther,
      onChange: onDispenserTypeOtherChange
    }
  ];

  const WATER_HELPFUL_INFO = [
    {
      label: 'Wheelchair accessible',
      value: accessible,
      onChange: onAccessibleChange
    },
    {
      label: 'Filtered water',
      value: filtration,
      onChange: onFiltrationChange
    },
    {
      label: 'Bring your own container',
      value: waterVesselNeeded,
      onChange: onWaterVesselNeededChange
    },
    {
      label: 'ID required',
      value: idRequired,
      onChange: onIdRequiredChange
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
    <Box
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
        backgroundColor="#5286E9"
        color="common.white"
      >
        Add Water Resource
      </Typography>
      <CardContent width="770px">
        <form
          onSubmit={handleSubmit((data, e) => {
            onSubmit(e).then(() => {
              next();
            });
          })}
        >
          <Grid container columnSpacing={1} rowSpacing={2}>
            {/* <Stack spacing={4} alignContent="center"> */}
            {isMobile && (
              <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                buttonStyles={{ backgroundColor: '#5286E9' }}
                onChange={onDrop}
                imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
                withPreview={true}
              />
            )}

            {/* <FormControl> */}
            <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
              {/* <Stack spacing={3} justifyContent="center" height={250}> */}
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
            </Grid>
            <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
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
                          fullWidth
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
            </Grid>
            <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
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
                    fullWidth
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
            </Grid>
            {/* </Stack> */}
            {/* </FormControl> */}
            <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
              {/* <Stack spacing={4} justifyContent="center" height={250}> */}
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
                    fullWidth
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
            </Grid>
            <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
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
                    fullWidth
                    width="500px"
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
                              <FormHelperText>
                                {item.explanation}
                              </FormHelperText>
                            )}
                          </Stack>
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Dispenser Type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {DISPENSER_TYPE.map(type => {
                    return (
                      <ListItem
                        key={type.label}
                        as="label"
                        htmlFor={type.label}
                      >
                        <Typography
                          style={{ marginLeft: '0rem' }}
                          fontSize={13}
                        >
                          {type.label}
                        </Typography>
                        <Checkbox
                          style={{ marginLeft: 'auto', marginRight: '0rem' }}
                          id={type.label}
                          name={type.label}
                          checked={type.value}
                          onClick={e => {
                            type.onChange(e);
                          }}
                        />
                      </ListItem>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
              {/* </Stack> */}
              {/* </Grid> */}
            </Grid>
            {!isMobile && (
              <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  buttonStyles={{ backgroundColor: '#5286E9' }}
                  onChange={onDrop}
                  imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
                  maxFileSize={5242880}
                  withPreview={true}
                />
              </Grid>
            )}
            <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
              {/* <FormGroup> */}
              <Typography>Helpful info</Typography>
              {WATER_HELPFUL_INFO.map(info => {
                return (
                  <ListItem
                    key={info.label}
                    as="label"
                    htmlFor={info.label}
                    style={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
                  >
                    <Typography style={{ paddingLeft: '0rem' }} fontSize={13}>
                      {info.label}
                    </Typography>
                    <Checkbox
                      style={{ marginLeft: 'auto', marginRight: '0rem' }}
                      checked={info.value}
                      name={info.label}
                      id={info.label}
                      onChange={e => {
                        info.onChange(e);
                      }}
                    />
                  </ListItem>
                );
              })}
              {/* </FormGroup> */}
            </Grid>
            <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
              <Controller
                control={control}
                name="guidelines"
                defaultValue={''}
                value={guidelines}
                render={({ field: { onChange, ...rest } }) => (
                  <TextField
                    id="guidelines"
                    fullWidth
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
            </Grid>
            <Grid
              item
              fullWidth={true}
              xs={12}
              xm={12}
              lg={6}
              xl={6}
              textAlign={'center'}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth={isMobile ? false : true}
                width={isMobile ? '30%' : '100%'}
                style={{
                  textTransform: 'none',
                  borderRadius: '8px',
                  // width: '25%',
                  margin: '3.5rem auto 1.5rem auto',
                  color: 'white',
                  backgroundColor: '#5286E9'
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          {!isMobile && (
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              <IconButton color="primary" aria-label="add to shopping cart">
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton color="primary" aria-label="add to shopping cart">
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          )}
          {/* </Stack> */}
        </form>
      </CardContent>
    </Box>
  );
}

export default AddWaterTap;
