import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { geocode, setDefaults, RequestType } from 'react-geocode';
import styles from '../AddResourceModal.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import PageOne from './PageOne';
import PageTwo from './PageTwo';
import useIsMobile from 'hooks/useIsMobile';

function AddFood({
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
  organization,
  handicapAccessible,
  idRequired,
  childrenOnly,
  communityFridges,
  perishable,
  nonPerishable,
  prepared,
  foodTypeOther,
  eatOnSite,
  delivery,
  pickUp,
  distributionTypeOther,
  guidelines,
  checkboxChangeHandler,
  textFieldChangeHandler
}) {
  const isMobile = useIsMobile();
  const getVariableName = variable => Object.keys(variable)[0];

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
    <Card
      style={{
        overflow: 'scroll',
        justifyContent: 'center'
      }}
    >
      <Typography
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        padding="0px 20px 10px"
        height="88px"
        backgroundColor="#FF9A55"
        color="common.white"
      >
        Add a Food Resource
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
                perishable={perishable}
                nonPerishable={nonPerishable}
                prepared={prepared}
                foodTypeOther={foodTypeOther}
                eatOnSite={eatOnSite}
                delivery={delivery}
                pickUp={pickUp}
                distributionTypeOther={distributionTypeOther}
                organization={organization}
                userLocation={userLocation}
                requiredFieldMsg={requiredFieldMsg}
                errors={errors}
                control={control}
                setValue={setValue}
                getVariableName={getVariableName}
                checkboxChangeHandler={checkboxChangeHandler}
                textFieldChangeHandler={textFieldChangeHandler}
              />
            )}
            {(page === 1 || isMobile) && (
              <PageTwo
                onDrop={onDrop}
                guidelines={guidelines}
                handicapAccessible={handicapAccessible}
                idRequired={idRequired}
                childrenOnly={childrenOnly}
                communityFridges={communityFridges}
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
    </Card>
  );
}

export default AddFood;
