import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { geocode, setDefaults, RequestType } from 'react-geocode';
import styles from '../AddResourceModal.module.scss';
import { useForm } from 'react-hook-form';
import { Box, CardContent, Grid, Typography, IconButton } from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import PageOne from './PageOne';
import PageTwo from './PageTwo';
import useIsMobile from 'hooks/useIsMobile';

function AddBathroom({
  prev,
  next,
  page,
  onNextPageChange,
  onPrevPageChange,
  onSubmit,
  onDrop,
  name,
  address,
  website,
  description,
  entryType,
  guidelines,
  changingTable,
  genderNeutral,
  familyBathroom,
  singleOccupancy,
  handicapAccessible,
  hasFountain,
  checkboxChangeHandler,
  textFieldChangeHandler
}) {
  const isMobile = useIsMobile();
  const userLocation = useSelector(state => state.filterMarkers.userLocation);

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
    trigger,
    control,
    formState: { errors }
  } = useForm();

  const requiredFieldMsg = (
    <span>
      *This field is required* <br />
    </span>
  );

  return (
    <Box overflow={'scroll'} justifyContent={'center'}>
      <Typography
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        padding="0px 20px 10px"
        height="88px"
        backgroundColor="#7C7C7C"
        color="common.white"
      >
        Add Bathroom Resource
      </Typography>
      <CardContent>
        <form
          onSubmit={handleSubmit((data, e) => {
            onSubmit(e).then(() => {
              next();
            });
          })}
        >
          <Grid container columnSpacing={1} rowSpacing={2}>
            {(page === 0 || isMobile) && ( // only use multi-step form on desktop
              <PageOne
                onDrop={onDrop}
                name={name}
                address={address}
                website={website}
                description={description}
                entryType={entryType}
                userLocation={userLocation}
                requiredFieldMsg={requiredFieldMsg}
                errors={errors}
                control={control}
                setValue={setValue}
                textFieldChangeHandler={textFieldChangeHandler}
              />
            )}
            {(page === 1 || isMobile) && (
              <PageTwo
                onDrop={onDrop}
                guidelines={guidelines}
                changingTable={changingTable}
                genderNeutral={genderNeutral}
                familyBathroom={familyBathroom}
                singleOccupancy={singleOccupancy}
                handicapAccessible={handicapAccessible}
                hasFountain={hasFountain}
                errors={errors}
                control={control}
                checkboxChangeHandler={checkboxChangeHandler}
                textFieldChangeHandler={textFieldChangeHandler}
              />
            )}
          </Grid>
          {!isMobile && (
            <div
              style={{
                margin: '0 auto',
                paddingTop: '1.5rem',
                textAlign: 'center'
              }}
            >
              <IconButton
                type="button"
                color="primary"
                aria-label="previous-page"
                onClick={() => {
                  onPrevPageChange();
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                type="button"
                color="primary"
                aria-label="next-page"
                onClick={async () => {
                  // Trigger a form validation check on form before going to next page
                  const formIsValid = await trigger();
                  if (formIsValid) {
                    onNextPageChange();
                  }
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          )}
        </form>
      </CardContent>
    </Box>
  );
}

export default AddBathroom;
