import ImageUploader from 'react-images-upload';

import { Controller } from 'react-hook-form';
import {
  Button,
  Grid,
  Typography,
  Checkbox,
  TextField,
  ListItem
} from '@mui/material';

import useIsMobile from 'hooks/useIsMobile';

const PageTwo = ({
  onDrop,
  handicapAccessible,
  idRequired,
  waterVesselNeeded,
  filtration,
  guidelines,
  // react hook form
  errors,
  control,
  getVariableName,
  checkboxChangeHandler,
  textFieldChangeHandler
}) => {
  const isMobile = useIsMobile();
  const WATER_HELPFUL_INFO = [
    {
      label: 'Wheelchair accessible',
      value: handicapAccessible,
      name: getVariableName({ handicapAccessible })
    },
    {
      label: 'Filtered water',
      value: filtration,
      name: getVariableName({ filtration })
    },
    {
      label: 'Bring your own container',
      value: waterVesselNeeded,
      name: getVariableName({ waterVesselNeeded })
    },
    {
      label: 'ID required',
      value: idRequired,
      name: getVariableName({ idRequired })
    }
  ];
  return (
    <>
      {!isMobile && (
        <Grid item xs={12} xm={12} lg={6} xl={6}>
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
      <Grid item xs={12} xm={12} lg={6} xl={6}>
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
                name={info.name}
                id={info.label}
                onChange={e => {
                  checkboxChangeHandler(e);
                }}
              />
            </ListItem>
          );
        })}
      </Grid>
      <Grid item xs={12} xm={12} lg={6} xl={6}>
        <Controller
          control={control}
          name="guidelines"
          defaultValue={''}
          value={guidelines}
          render={({ field: { onChange, ...rest } }) => (
            <TextField
              id="guidelines"
              fullWidth={true}
              {...rest}
              label="Community Guidelines"
              InputLabelProps={{ shrink: true }}
              multiline
              maxRows={2}
              FormHelperTextProps={{ fontSize: '11.67' }}
              helperText="Share tips on respectful PHLASKing at this location."
              onChange={e => {
                onChange(e);
                // onGuidelinesChange(e);
                textFieldChangeHandler(e);
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
    </>
  );
};

export default PageTwo;
