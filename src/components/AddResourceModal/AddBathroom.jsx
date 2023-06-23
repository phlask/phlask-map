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
import sty from './Form.module.scss';
import { Modal, Form, Button, Accordion } from 'react-bootstrap';
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from './SharedFormFields';
// eslint-disable-next-line import/no-unresolved
import SharedAccordionFields from './SharedAccordionFields';
import { deleteApp } from 'firebase/app';
import { connectToFirebase } from './utils';
import { useForm } from 'react-hook-form';
import {
  Box,
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

const BATHROOM_HELPFUL_INFO = [
  'Wheelchair accessible',
  'Gender neutral',
  'Changing table',
  'Single occupancy',
  'Family bathroom',
  'Also has water fountain'
];

const ORGANIZATION_TYPE = [
  { accessType: 'Open access', explanation: 'Public site, open to all' },
  { accessType: 'Restricted', explanation: 'May not be open to all' },
  { accessType: 'Unsure', explanation: '' }
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
  access,
  onAccessChange,
  phlaskStatement,
  onPhlaskStatementChange,
  normsAndRules,
  onNormsAndRulesChange,
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
  idRequired,
  onIdRequiredChange
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
      <Typography className={sty.mobileHeader} color="common.white">
        Add Bathroom Resource
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
            {/* <SharedFormFields
              onDrop={onDrop}
              name={name}
              onNameChange={onNameChange}
              address={address}
              onAddressChange={onAddressChange}
              website={website}
              onWebsiteChange={onWebsiteChange}
              description={description}
              onDescriptionChange={onDescriptionChange}
              siteCategory="bathroom"
            /> */}
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={onDrop}
              imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
              maxFileSize={5242880}
              withPreview={true}
            />

            <FormControl>
              <Stack spacing={4} justifyContent="center">
                <TextField
                  id="name"
                  label="Name"
                  name="name"
                  helperText={
                    <span>
                      {errors.name && requiredFieldMsg}
                      Enter a name for the resource. (Example: City Hall)
                    </span>
                  }
                  {...register('name', { required: true })}
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
                        label="Street address *"
                        name="address"
                        value={address}
                        onChange={onAddressChange}
                        helperText={
                          <Stack>
                            {errors.address && requiredFieldMsg}
                            <Link>
                              {'Use my location instead  '}
                              <MyLocationIcon sx={{ fontSize: 10 }} />
                            </Link>
                          </Stack>
                        }
                        {...register('address', { required: true })}
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
                  label="Website"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  id="description"
                  label="Description"
                  helperText="Explain how to access the resource."
                  InputLabelProps={{ shrink: true }}
                  multiline
                  maxRows={2}
                />
              </Stack>
            </FormControl>
            <TextField
              variant="outlined"
              name="organization"
              id="organization"
              onChange={e => console.log('')}
              select
              label="Organization Type"
              value=""
              helperText={errors.organization && requiredFieldMsg}
              {...register('organization', { required: true })}
              error={errors.organization ? true : false}
              InputLabelProps={{ shrink: true }}
            >
              {ORGANIZATION_TYPE.map(orgType => {
                const { accessType, explanation } = orgType;

                return (
                  <MenuItem key={accessType} value={accessType}>
                    <Stack>
                      {accessType}
                      {explanation && (
                        <FormHelperText>{explanation}</FormHelperText>
                      )}
                    </Stack>
                  </MenuItem>
                );
              })}
            </TextField>

            <FormGroup>
              <Typography>Helpful info</Typography>
              <Grid container>
                {BATHROOM_HELPFUL_INFO.map(info => {
                  return (
                    <React.Fragment key={info}>
                      <Grid item as="label" htmlFor={info} xs={8}>
                        <Box
                          height="100%"
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                        >
                          <Typography
                            style={{ paddingLeft: '2.5rem' }}
                            // paddingLeft="2.5rem"
                            fontSize={13}
                          >
                            {info}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        as="label"
                        htmlFor={info}
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
                            id={info}
                          />
                        </Box>
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </FormGroup>
            <TextField
              id="guidelines"
              label="Community guideLines"
              name="guidelines"
              InputLabelProps={{ shrink: true }}
              multiline
              maxRows={2}
              FormHelperTextProps={{ fontSize: '11.67' }}
              helperText="Share tips on respectful PHLASKing at this location."
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(() => {
                console.log('submitted');
              })}
              style={{
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
          {/* <Form.Group value={access} onChange={onAccessChange}>
              <Form.Label className={styles.modalFormLabel}>
                Access Type
              </Form.Label>
              <Form.Control className={styles.modalFormSelect} as="select">
                <option value="">Choose...</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="private shared">Private (Shared)</option>
                <option value="restricted">Restricted</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header className={styles.modalFormLabel}>
                  Additional Information
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <Form.Check
                      checked={accessible}
                      onChange={onAccessibleChange}
                      className={styles.modalFormCheck}
                      type="checkbox"
                      label="Accessible"
                      value="accessible"
                    />

                    <Form.Check
                      checked={idRequired}
                      onChange={onIdRequiredChange}
                      className={styles.modalFormCheck}
                      type="checkbox"
                      label="ID Required"
                      value="idRequired"
                    />

                    <Form.Check
                      checked={changingTable}
                      onChange={onChangeChangingTable}
                      className={styles.modalFormCheck}
                      type="checkbox"
                      label="Changing table"
                      value="changingTable"
                    />

                    <Form.Check
                      checked={genderNeutral}
                      onChange={onChangeGenderNeutral}
                      className={styles.modalFormCheck}
                      type="checkbox"
                      label="Gender neutral"
                      value="genderNeutral"
                    />

                    <Form.Check
                      checked={familyBathroom}
                      onChange={onChangeFamilyBathroom}
                      className={styles.modalFormCheck}
                      type="checkbox"
                      label="Family bathroom"
                      value="familyBathroom"
                    />

                    <Form.Check
                      checked={singleOccupancy}
                      onChange={onChangeSingleOccupancy}
                      className={styles.modalFormCheck}
                      type="checkbox"
                      label="Single occupancy"
                      value="singleOccupancy"
                    />

                    <SharedAccordionFields
                      phlaskStatement={phlaskStatement}
                      onPhlaskStatementChange={onPhlaskStatementChange}
                      normsAndRules={normsAndRules}
                      onNormsAndRulesChange={onNormsAndRulesChange}
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
        </form>
      </CardContent>
    </Card>
  );
}

export default AddBathroom;
