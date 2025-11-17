import ImageUploader from 'react-images-upload';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocode, RequestType } from 'react-geocode';
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
  ListItem,
  Button
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useIsMobile from 'hooks/useIsMobile';
import noop from 'utils/noop';

import WEBSITE_REGEX from '../utils';

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
  textFieldChangeHandler,
  isValidAddress,
  editMode
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

  const ORGANIZATION_TYPE = ['Government', 'Business', 'Non-profit', 'Unsure'];

  return (
    <>
      {isMobile && (
        <ImageUploader
          withIcon
          buttonText="Choose images"
          buttonStyles={{ backgroundColor: '#FF9A55' }}
          onChange={onDrop}
          imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
          maxFileSize={5242880}
          withPreview
        />
      )}

      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Controller
          rules={{ required: true }}
          control={control}
          name="name"
          defaultValue=""
          value={name}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={field.disabled}
              fullWidth
              id="name"
              label="Name"
              autoComplete="on"
              onChange={e => {
                field.onChange(e);
                textFieldChangeHandler(e);
              }}
              helperText={
                <span>
                  {errors.name && requiredFieldMsg}
                  Enter a name for the resource. (Example: City Hall)
                </span>
              }
              error={!!errors.name}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Controller
          rules={{
            required: true,
            validate: value => isValidAddress || 'Please enter a valid address'
          }}
          control={control}
          name="address"
          defaultValue=""
          value={address}
          render={({ field }) => (
            <PlacesAutocomplete
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={field.disabled}
              onChange={e => {
                field.onChange(e);
                textFieldChangeHandler(e);
              }}
              onSelect={e => {
                textFieldChangeHandler(e);
                field.onChange(e);
              }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => {
                const {
                  type,
                  autoComplete,
                  role,
                  'aria-autocomplete': ariaAutocomplete,
                  'aria-expanded': ariaExpanded,
                  'aria-activedescendant': ariaActiveDescendent,
                  disabled,
                  onKeyDown,
                  onBlur,
                  value,
                  onChange
                } = getInputProps({
                  className: 'modalAddressAutofill',
                  id: 'address'
                });
                return (
                  <div>
                    <TextField
                      id="address"
                      name={field.name}
                      label="Street address *"
                      fullWidth
                      onChange={e => {
                        field.onChange(e);
                        onChange(e);
                        textFieldChangeHandler(e);
                      }}
                      helperText={
                        <Stack component="span">
                          {errors.address && (
                            <span>
                              {errors.address.message || requiredFieldMsg}
                            </span>
                          )}
                          <Button variant="text">
                            Use my location instead
                            <MyLocationIcon sx={{ fontSize: 10 }} />
                          </Button>
                        </Stack>
                      }
                      error={!!errors.address}
                      FormHelperTextProps={{
                        sx: { marginLeft: 'auto', marginRight: 0 },
                        onClick: e => {
                          // Will autofill the street address textbox with user's current address,
                          // after clicking 'use my address instead'
                          const { latitude, longitude } = userLocation;
                          geocode(
                            RequestType.LATLNG,
                            `${latitude},${longitude}`
                          )
                            .then(({ results }) => {
                              const addr = results[0].formatted_address;
                              setValue('address-textbox', addr); // react-hook-form setValue
                              textFieldChangeHandler(addr);
                              field.onChange(addr);
                            })
                            .catch(noop);
                        }
                      }}
                      style={{ backgroundColor: 'white' }}
                      InputLabelProps={{ shrink: true }}
                      type={type}
                      autoComplete={autoComplete}
                      role={role}
                      aria-autocomplete={ariaAutocomplete}
                      aria-expanded={ariaExpanded}
                      aria-activedescendant={ariaActiveDescendent}
                      disabled={disabled}
                      onKeyDown={onKeyDown}
                      onBlur={onBlur}
                      value={value}
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
                );
              }}
            </PlacesAutocomplete>
          )}
        />
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Controller
          rules={{
            required: false,
            pattern: WEBSITE_REGEX
          }}
          control={control}
          name="website"
          defaultValue=""
          value={website}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={field.disabled}
              id="website"
              label="Website"
              fullWidth
              onChange={e => {
                field.onChange(e);
                textFieldChangeHandler(e);
              }}
              error={!!errors.website}
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
          defaultValue=""
          value={description}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={field.disabled}
              id="description"
              label="Description"
              fullWidth
              onChange={e => {
                field.onChange(e);
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
          defaultValue=""
          value={organization}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={field.disabled}
              variant="outlined"
              id="organization"
              label="Organization Type"
              fullWidth
              select
              helperText={errors.organization && requiredFieldMsg}
              onChange={e => {
                field.onChange(e);
                textFieldChangeHandler(e);
              }}
              SelectProps={{
                MenuProps: { disablePortal: true }
              }}
              error={!!errors.organization}
              InputLabelProps={{ component: 'span', shrink: true }}
            >
              {ORGANIZATION_TYPE.map(orgType => (
                <MenuItem key={orgType} value={orgType}>
                  {orgType}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Accordion data-testid="foodType">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Food Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {FOOD_TYPE.map(type => (
              <ListItem key={type.name} as="label" htmlFor={type.id}>
                <Typography
                  component="span"
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
            ))}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Accordion data-testid="distribution">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Distribution Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {DISTRIBUTION_TYPE.map(type => (
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
            ))}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};

export default PageOne;
