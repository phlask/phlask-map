import React, { useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from 'react-places-autocomplete';
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

  const {
    register,
    handleSubmit,
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
                          onClick: () =>
                            alert('Use My Location onClick PlaceHolder!')
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
              <Grid container>
                {FOOD_HELPFUL_INFO.map(info => {
                  return (
                    <React.Fragment key={info.label}>
                      <Grid item as="label" htmlFor={info.label} xs={8}>
                        <Box
                          height="100%"
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                        >
                          <Typography
                            style={{ paddingLeft: '2.5rem' }}
                            fontSize={13}
                          >
                            {info.label}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        as="label"
                        htmlFor={info.label}
                        item
                        align="center"
                        xs={4}
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                        >
                          <Checkbox
                            style={{ paddingLeft: '1.5rem' }}
                            id={info.label}
                            name={info.label}
                            value={info.value}
                            inputRef={{
                              ...register(info.label, {
                                onChange: info.onChange
                              })
                            }}
                          />
                        </Box>
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
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
                <Grid container>
                  {FOOD_TYPE.map(type => {
                    const { accessType, explanation } = type;

                    return (
                      <React.Fragment key={accessType}>
                        <Grid item as="label" htmlFor={accessType} xs={8}>
                          <Box
                            height="100%"
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                          >
                            <Typography
                              style={{ paddingLeft: '1.5rem' }}
                              fontSize={13}
                            >
                              {accessType}
                              {explanation && (
                                <FormHelperText>{explanation}</FormHelperText>
                              )}
                              <br />
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          as="label"
                          htmlFor={accessType}
                          item
                          align="center"
                          xs={4}
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                          >
                            <Checkbox
                              style={{ paddingLeft: '2.5rem' }}
                              id={accessType}
                              name={accessType}
                              value={false} // change info.value
                              inputRef={{
                                ...register(accessType, {
                                  onChange: () => {} // change info.onChange
                                })
                              }}
                            />
                          </Box>
                        </Grid>
                      </React.Fragment>
                    );
                  })}
                </Grid>
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
