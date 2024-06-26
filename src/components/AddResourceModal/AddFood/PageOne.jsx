import React from 'react';
import ImageUploader from 'react-images-upload';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocode, setDefaults, RequestType } from 'react-geocode';
import styles from '../AddResourceModal.module.scss';
import { Controller } from 'react-hook-form';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Link,
  MenuItem,
  Stack,
  Typography,
  FormHelperText,
  Checkbox,
  TextField,
  ListItem
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useIsMobile from 'hooks/useIsMobile';
import noop from 'utils/noop';

const PageOne = ({
  // state values and handlers for the textfields
  onDrop,
  name,
  address,
  website,
  description,
  perishable,
  nonPerishable,
  prepared,
  foodTypeOther,
  eatOnSite,
  delivery,
  pickUp,
  distributionTypeOther,
  organization,
  // handlers for the dispenser type drop down
  userLocation,
  requiredFieldMsg,
  // react hook form
  errors,
  control,
  setValue,
  getVariableName,
  checkboxChangeHandler,
  textFieldChangeHandler
}) => {
  const isMobile = useIsMobile();

  const FOOD_TYPE = [
    {
      id: '0',
      accessType: 'Perishable',
      explanation: 'Fruit, vegetables, dairy, etc.',
      value: perishable,
      name: getVariableName({ perishable })
    },
    {
      id: '1',
      accessType: 'Non-perishable',
      explanation: 'Canned, boxed, pantry items, etc.',
      value: nonPerishable,
      name: getVariableName({ nonPerishable })
    },
    {
      id: '2',
      accessType: 'Prepared food and meals',
      explanation: '',
      value: prepared,
      name: getVariableName({ prepared })
    },
    {
      id: '3',
      accessType: 'Other',
      explanation: '',
      value: foodTypeOther,
      name: getVariableName({ foodTypeOther })
    }
  ];

  const DISTRIBUTION_TYPE = [
    {
      id: '4',
      label: 'Eat on site',
      value: eatOnSite,
      name: getVariableName({ eatOnSite })
    },
    {
      id: '5',
      label: 'Delivery',
      value: delivery,
      name: getVariableName({ delivery })
    },
    {
      id: '6',
      label: 'Pickup',
      value: pickUp,
      name: getVariableName({ pickUp })
    },
    {
      id: '7',
      label: 'Other',
      value: distributionTypeOther,
      name: getVariableName({ distributionTypeOther })
    }
  ];

  const ORGANIZATION_TYPE = ['Governmemnt', 'Business', 'Non-profit', 'Unsure'];

  return (
    <>
      {isMobile && (
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          buttonStyles={{ backgroundColor: '#FF9A55' }}
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
          name="organization"
          defaultValue={''}
          value={organization}
          render={({ field: { onChange, ...rest } }) => (
            <TextField
              {...rest}
              variant="outlined"
              id="organization"
              label="Organization Type"
              fullWidth
              select
              helperText={errors.organization && requiredFieldMsg}
              onChange={e => {
                onChange(e);
                textFieldChangeHandler(e);
              }}
              SelectProps={{
                MenuProps: { disablePortal: true }
              }}
              error={errors.organization ? true : false}
              InputLabelProps={{ component: 'span', shrink: true }}
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
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
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
                  <Checkbox
                    style={{ marginLeft: 'auto', marginRight: '0rem' }}
                    checked={type.value}
                    name={type.name}
                    id={type.id}
                    onChange={e => {
                      checkboxChangeHandler(e);
                    }}
                  />
                </ListItem>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
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
                  <Checkbox
                    style={{ marginLeft: 'auto', marginRight: '0rem' }}
                    checked={type.value}
                    name={type.name}
                    id={type.id}
                    onChange={e => {
                      checkboxChangeHandler(e);
                    }}
                  />
                </ListItem>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};

export default PageOne;
