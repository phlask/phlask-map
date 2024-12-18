import PlacesAutocomplete from 'react-places-autocomplete';
import { geocode, RequestType } from 'react-geocode';
import ImageUploader from 'react-images-upload';
import { Controller } from 'react-hook-form';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Button,
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
import styles from '../AddResourceModal.module.scss';

import { WEBSITE_REGEX } from '../utils';

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
  // state values and handlers for the dispenser type drop down
  drinkingFountain,
  bottleFillerAndFountain,
  sink,
  waterJug,
  sodaMachine,
  pitcher,
  waterCooler,
  dispenserTypeOther,
  // Other
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

  const DISPENSER_TYPE = [
    {
      label: 'Drinking fountain',
      value: drinkingFountain,
      name: getVariableName({ drinkingFountain })
    },
    {
      label: 'Bottle filler and fountain',
      value: bottleFillerAndFountain,
      name: getVariableName({ bottleFillerAndFountain })
    },
    {
      label: 'Sink',
      value: sink,
      name: getVariableName({ sink })
    },
    {
      label: 'Water jug',
      value: waterJug,
      name: getVariableName({ waterJug })
    },
    {
      label: 'Soda machine',
      value: sodaMachine,
      name: getVariableName({ sodaMachine })
    },
    {
      label: 'Pitcher',
      value: pitcher,
      name: getVariableName({ pitcher })
    },
    {
      label: 'Water cooler',
      value: waterCooler,
      name: getVariableName({ waterCooler })
    },
    {
      label: 'Other',
      value: dispenserTypeOther,
      name: getVariableName({ dispenserTypeOther })
    }
  ];

  return (
    <>
      {isMobile && (
        <ImageUploader
          withIcon
          buttonText="Choose images"
          buttonStyles={{ backgroundColor: '#5286E9' }}
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
          rules={{ required: true }}
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
                      name="address-textbox"
                      label="Street address *"
                      fullWidth
                      onChange={e => {
                        field.onChange(e);
                        textFieldChangeHandler(e);
                      }}
                      helperText={
                        <Stack component="span">
                          {errors.address && requiredFieldMsg}
                          <Button variant="text">
                            {'Use my location instead  '}
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
                          const { lat, lng } = userLocation;
                          geocode(RequestType.LATLNG, `${lat},${lng}`)
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
          name="entryType"
          defaultValue=""
          value={entryType}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={field.disabled}
              variant="outlined"
              id="entry"
              label="Entry Type"
              select
              fullWidth
              width="500px"
              onChange={e => {
                field.onChange(e);
                textFieldChangeHandler(e);
              }}
              SelectProps={{
                MenuProps: { disablePortal: true }
              }}
              helperText={errors.entryType && requiredFieldMsg}
              error={!!errors.entryType}
              InputLabelProps={{ component: 'span', shrink: true }}
            >
              {ENTRY_TYPE.map(item => (
                <MenuItem key={item.entryType} value={item.entryType}>
                  <Stack>
                    {item.entryType}
                    {item.explanation && (
                      <FormHelperText>{item.explanation}</FormHelperText>
                    )}
                  </Stack>
                </MenuItem>
              ))}
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
            <Typography>Dispenser Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {DISPENSER_TYPE.map(type => (
              <ListItem key={type.label} as="label" htmlFor={type.label}>
                <Typography style={{ marginLeft: '0rem' }} fontSize={13}>
                  {type.label}
                </Typography>
                <Checkbox
                  style={{ marginLeft: 'auto', marginRight: '0rem' }}
                  id={type.label}
                  name={type.name}
                  checked={type.value}
                  onClick={e => {
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
