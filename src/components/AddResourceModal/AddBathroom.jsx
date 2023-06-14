import React, { useEffect } from 'react';
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
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormGroup,
  Grid,
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
          onSubmit={e => {
            e.preventDefault();
            onSubmit(e).then(() => {
              next();
            });
          }}
        >
          <Stack spacing={4} alignContent="center">
            <SharedFormFields
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
            />
            <TextField
              variant="outlined"
              onChange={e => console.log('')}
              select
              label="Organization Type"
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
                    <>
                      <Grid item as="label" htmlFor={info} xs={8}>
                        <Box
                          height="100%"
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                        >
                          <Typography paddingLeft="2.5rem" fontSize={13}>
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
                          <Checkbox paddingLeft="1.5rem" id={info} />
                        </Box>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </FormGroup>
            <TextField
              id="guidelines"
              label="Community guideLines"
              helperText="Share tips on respectful PHLASKing at this location."
              InputLabelProps={{ shrink: true }}
              multiline
              maxRows={2}
            />
            <Button
              variant="contained"
              borderRadius="8px"
              style={{
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
