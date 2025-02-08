import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setDefaults } from 'react-geocode';
import { useForm } from 'react-hook-form';
import { Box, CardContent, Grid, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useIsMobile from 'hooks/useIsMobile';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

import ShareSocials from '../ShareSocials';

const AddWaterTap = ({
  page,
  onPageChange,
  onSubmit,
  onDrop,
  // state values and handlers for the textfields
  name,
  address,
  website,
  description,
  entryType,
  // state values and handlers for "helpful info" section
  handicapAccessible,
  idRequired,
  waterVesselNeeded,
  filtration,
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
  guidelines,
  checkboxChangeHandler,
  textFieldChangeHandler,
  isValidAddress
}) => {
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

  const getVariableName = variable => Object.keys(variable)[0];

  if (page === 2) {
    return <ShareSocials />;
  }

  return (
    <Box
      overflow="scroll"
      justifyContent="center"
    >
      {isMobile ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: '0px 20px 10px',
            height: '88px',
            backgroundColor: '#5286E9',
            color: 'common.white'
          }}>
          {/* <Typography
            display="flex"
            flexDirection="row"
            alignItems="flex-end"
            padding="0px 20px 10px"
            height="88px"
            backgroundColor="#5286E9"
            color="common.white"
          > */}
            Add Water Resource
          {/* </Typography> */}
        </Box>
      ):
      (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '64px',
            backgroundColor: '#5286E9',
            color: 'common.white',
            textAlign: 'center',
            fontFamily: 'Inter',
            fontWeight: '600',
            padding: '20px 0',
            fontSize: '20.16'
          }}>
        {/* <Typography
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          height="64px"
          backgroundColor="#5286E9"
          color="common.white"
          textAlign="center"
          fontFamily="Inter"
          fontWeight={600}
          padding="20px 0"
          fontSize={20.16}
        > */}
          Add a Water Site
        {/* </Typography> */}
        </Box>

      )}
      <CardContent width="770px">
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
                drinkingFountain={drinkingFountain}
                bottleFillerAndFountain={bottleFillerAndFountain}
                sink={sink}
                waterJug={waterJug}
                sodaMachine={sodaMachine}
                pitcher={pitcher}
                waterCooler={waterCooler}
                dispenserTypeOther={dispenserTypeOther}
                userLocation={userLocation}
                requiredFieldMsg={requiredFieldMsg}
                errors={errors}
                control={control}
                setValue={setValue}
                getVariableName={getVariableName}
                checkboxChangeHandler={checkboxChangeHandler}
                textFieldChangeHandler={textFieldChangeHandler}
                isValidAddress={isValidAddress}
              />
            )}
            {(page === 1 || isMobile) && (
              <PageTwo
                onDrop={onDrop}
                handicapAccessible={handicapAccessible}
                idRequired={idRequired}
                waterVesselNeeded={waterVesselNeeded}
                filtration={filtration}
                guidelines={guidelines}
                errors={errors}
                control={control}
                getVariableName={getVariableName}
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
                aria-label="Go to previous page"
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

export default AddWaterTap;
