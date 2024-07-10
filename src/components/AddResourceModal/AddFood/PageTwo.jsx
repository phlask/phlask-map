import React from 'react';
import ImageUploader from 'react-images-upload';
import styles from '../AddResourceModal.module.scss';
import { Controller } from 'react-hook-form';
import {
  Button,
  Grid,
  Stack,
  Typography,
  Checkbox,
  TextField,
  ListItem
} from '@mui/material';

import useIsMobile from 'hooks/useIsMobile';

const PageTwo = ({
  onDrop,
  guidelines,
  handicapAccessible,
  idRequired,
  childrenOnly,
  communityFridges,
  errors,
  control,
  getVariableName,
  checkboxChangeHandler,
  textFieldChangeHandler
}) => {
  const isMobile = useIsMobile();

  const FOOD_HELPFUL_INFO = [
    {
      label: 'Wheelchair accessible',
      value: handicapAccessible,
      name: getVariableName({ handicapAccessible })
    },
    {
      label: 'ID Required',
      value: idRequired,
      name: getVariableName({ idRequired })
    },
    {
      label: 'Youth (under 18) only',
      value: childrenOnly,
      name: getVariableName({ childrenOnly })
    },
    {
      label: 'Community fridges, etc.',
      value: communityFridges,
      name: getVariableName({ communityFridges })
    }
  ];
  return (
    <>
      {!isMobile && (
        <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
          <Stack>
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              buttonStyles={{ backgroundColor: '#5286E9' }}
              onChange={onDrop}
              imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
              maxFileSize={5242880}
              withPreview={true}
            />
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
                  style={{ marginTop: '1.5rem' }}
                  FormHelperTextProps={{ fontSize: '11.67' }}
                  helperText="Share tips on respectful PHLASKing at this location."
                  onChange={e => {
                    onChange(e);
                    textFieldChangeHandler(e);
                  }}
                />
              )}
            />
          </Stack>
        </Grid>
      )}
      <Grid item xs={12} xm={12} lg={6} xl={6} spacing={4}>
        <Stack>
          <Typography>Helpful info</Typography>
          {FOOD_HELPFUL_INFO.map(info => {
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
                  name={info.name}
                  id={info.label}
                  onChange={e => {
                    checkboxChangeHandler(e);
                  }}
                />
              </ListItem>
            );
          })}
          {isMobile && (
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
                  label="Community Guidelines"
                  InputLabelProps={{ shrink: true }}
                  multiline
                  maxRows={2}
                  style={{ marginTop: '1.5rem' }}
                  FormHelperTextProps={{ fontSize: '11.67' }}
                  helperText="Share tips on respectful PHLASKing at this location."
                  onChange={e => {
                    onChange(e);
                    textFieldChangeHandler(e);
                  }}
                />
              )}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth={isMobile ? false : true}
            width={isMobile ? '30%' : '100%'}
            style={{
              textTransform: 'none',
              borderRadius: '8px',
              margin: '1.5rem auto 1.5rem auto',
              color: 'white',
              backgroundColor: '#FF9A55'
            }}
          >
            Submit
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default PageTwo;
