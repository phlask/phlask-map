import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setDefaults } from 'react-geocode';
import { useForm } from 'react-hook-form';
import { Box, CardContent, Grid, Typography, IconButton } from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import useIsMobile from 'hooks/useIsMobile';
import AddResourceSuccessStep from 'components/AddResourceModal/AddResourceSuccessStep/AddResourceSuccessStep';
import { getUserLocation } from 'reducers/user';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

const AddBathroom = ({
  page,
  onPageChange,
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
  textFieldChangeHandler,
  isValidAddress
}) => {
  const isMobile = useIsMobile();
  const userLocation = useSelector(getUserLocation);

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

  if (page === 2) {
    return <AddResourceSuccessStep />;
  }

  return (
    <Box overflow="none" justifyContent="center">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: isMobile ? null : 'center',
          padding: isMobile ? '0px 20px 10px' : '20px 0',
          height: isMobile ? '88px' : '64px',
          backgroundColor: '#7C7C7C'
        }}
      >
        <Typography
          sx={{
            color: 'common.white',
            ...(isMobile
              ? {}
              : {
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 20.16
                })
          }}
        >
          Add a Bathroom Resource
        </Typography>
      </Box>
      <CardContent
        sx={{
          maxHeight: isMobile ? undefined : '500px',
          overflow: 'auto'
        }}
      >
        <form
          onSubmit={handleSubmit((data, e) => {
            onSubmit(e).then(() => {
              onPageChange(prev => prev + 1);
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
                isValidAddress={isValidAddress}
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
                  onPageChange(prev => prev - 1);
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                type="button"
                color="primary"
                aria-label="Go to next page"
                onClick={async () => {
                  // Trigger a form validation check on form before going to next page
                  const formIsValid = await trigger();
                  if (formIsValid) {
                    onPageChange(prev => prev + 1);
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
};

export default AddBathroom;
