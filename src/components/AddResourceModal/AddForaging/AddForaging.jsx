import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setDefaults } from 'react-geocode';
import { useForm } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton
} from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useIsMobile from 'hooks/useIsMobile';
import AddResourceSuccessStep from 'components/AddResourceModal/AddResourceSuccessStep/AddResourceSuccessStep';
import { getUserLocation } from 'reducers/user';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

const AddForaging = ({
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
  // Forage Type
  nut,
  fruit,
  leaves,
  bark,
  flowers,
  root,

  // Forage Helpful info
  medicinal,
  inSeason,
  communityGarden,
  checkboxChangeHandler,
  textFieldChangeHandler,
  isValidAddress,
  editMode
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
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name,
      address,
      website,
      description
    }
  });

  useEffect(() => {
    reset({
      name,
      address,
      website,
      description
    });
  }, [name, address, website, description, reset]);

  const requiredFieldMsg = (
    <span>
      *This field is required* <br />
    </span>
  );

  const getVariableName = variable => Object.keys(variable)[0];

  if (page === 2) {
    return <AddResourceSuccessStep />;
  }

  return (
    <Card
      style={{
        overflow: 'none',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: isMobile ? null : 'center',
          padding: isMobile ? '0px 20px 10px' : '20px 0',
          height: isMobile ? '88px' : '64px',
          backgroundColor: '#5DA694'
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
          {editMode ? 'Edit Foraging Resource' : 'Add a Foraging Resource'}
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
          <Grid
            container
            columnSpacing={2}
            // columnSpacing={5}
            rowSpacing={1}
            // padding=".5rem 1rem 0rem 1rem"
          >
            {(page === 0 || isMobile) && ( // only use multi-step form on desktop
              <PageOne
                onDrop={onDrop}
                name={name}
                address={address}
                website={website}
                description={description}
                entryType={entryType}
                nut={nut}
                fruit={fruit}
                leaves={leaves}
                bark={bark}
                flowers={flowers}
                root={root}
                userLocation={userLocation}
                requiredFieldMsg={requiredFieldMsg}
                errors={errors}
                control={control}
                setValue={setValue}
                getVariableName={getVariableName}
                checkboxChangeHandler={checkboxChangeHandler}
                textFieldChangeHandler={textFieldChangeHandler}
                isValidAddress={isValidAddress}
                editMode={editMode}
              />
            )}
            {(page === 1 || isMobile) && (
              <PageTwo
                onDrop={onDrop}
                medicinal={medicinal}
                inSeason={inSeason}
                communityGarden={communityGarden}
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
                style={{ color: 'gray' }}
                aria-label="Go to previous page"
                disabled={page === 0 && editMode}
                onClick={() => {
                  onPageChange(prev => prev - 1);
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                type="button"
                style={{ color: 'gray' }}
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
    </Card>
  );
};

export default AddForaging;
