import ImageUploader from 'components/ImageUploader/ImageUploader';
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
  changingTable,
  genderNeutral,
  familyBathroom,
  singleOccupancy,
  handicapAccessible,
  hasFountain,
  control,
  checkboxChangeHandler,
  textFieldChangeHandler
}) => {
  const isMobile = useIsMobile();

  const BATHROOM_HELPFUL_INFO = [
    {
      label: 'Wheelchair accessible',
      value: handicapAccessible,
      name: 'handicapAccessible'
    },
    {
      label: 'Gender neutral',
      value: genderNeutral,
      name: 'genderNeutral'
    },
    {
      label: 'Changing table',
      value: changingTable,
      name: 'changingTable'
    },
    {
      label: 'Single occupancy',
      value: singleOccupancy,
      name: 'singleOccupancy'
    },
    {
      label: 'Family bathroom',
      value: familyBathroom,
      name: 'familyBathroom'
    },
    {
      label: 'Also has water fountain',
      value: hasFountain,
      name: 'hasFountain'
    }
  ];
  return (
    <>
      {!isMobile && (
        <Grid
          spacing={4}
          size={{
            xs: 12,
            lg: 6,
            xl: 6
          }}
        >
          <Stack>
            <ImageUploader
              onDrop={onDrop}
              accept={{
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png'],
                'image/gif': ['.gif']
              }}
              maxSize={5242880}
              maxFiles={1}
              renderContent={() => (
                <Button
                  sx={{
                    color: 'white',
                    borderRadius: '8px',
                    background: '#5286E9'
                  }}
                >
                  Choose Image
                </Button>
              )}
            />
            <Controller
              control={control}
              name="guidelines"
              defaultValue=""
              value={guidelines}
              render={({ field }) => (
                <TextField
                  id="guidelines"
                  fullWidth
                  onBlur={field.onBlur}
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  disabled={field.disabled}
                  label="Community Guidelines"
                  multiline
                  maxRows={2}
                  style={{ marginTop: '1.5rem' }}
                  helperText="Share tips on respectful PHLASKing at this location."
                  onChange={e => {
                    field.onChange(e);
                    textFieldChangeHandler(e);
                  }}
                  slotProps={{
                    inputLabel: { shrink: true },
                    formHelperText: { fontSize: '11.67' }
                  }}
                />
              )}
            />
          </Stack>
        </Grid>
      )}
      <Grid
        spacing={4}
        size={{
          xs: 12,
          lg: 6,
          xl: 6
        }}
      >
        <Stack>
          <Typography>Helpful info</Typography>
          {BATHROOM_HELPFUL_INFO.map(info => (
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
          ))}
          {isMobile && (
            <Controller
              control={control}
              name="guidelines"
              defaultValue=""
              value={guidelines}
              render={({ field }) => (
                <TextField
                  id="guidelines"
                  fullWidth
                  onBlur={field.onBlur}
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  disabled={field.disabled}
                  label="Community guideLines"
                  multiline
                  maxRows={2}
                  style={{ marginTop: '1.5rem' }}
                  helperText="Share tips on respectful PHLASKing at this location."
                  onChange={e => {
                    field.onChange(e);
                    textFieldChangeHandler(e);
                  }}
                  slotProps={{
                    inputLabel: { shrink: true },
                    formHelperText: { fontSize: '11.67' }
                  }}
                />
              )}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth={!isMobile}
            width={isMobile ? '30%' : '100%'}
            style={{
              textTransform: 'none',
              borderRadius: '8px',
              margin: '1.5rem auto 1.5rem auto',
              color: 'white',
              backgroundColor: '#7C7C7C'
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
