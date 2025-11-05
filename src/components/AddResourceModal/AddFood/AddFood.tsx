import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setDefaults } from 'react-geocode';
import { useForm } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography
} from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import useIsMobile from 'hooks/useIsMobile';
import AddResourceSuccessStep from 'components/AddResourceModal/AddResourceSuccessStep/AddResourceSuccessStep';
import { getUserLocation } from 'reducers/user';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

type AddFoodProps = {
  page: number;
  onPageChange: (value: number) => number;
};

const AddFood = ({
  onClose,
  page,
  onPageChange,
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
  textFieldChangeHandler,
  isValidAddress
}: AddFoodProps) => {
  const isMobile = useIsMobile();
  const getVariableName = variable => Object.keys(variable)[0];

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
    return <AddResourceSuccessStep onClose={onClose} />;
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
          backgroundColor: '#FF9A55'
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
          Add a Food Resource
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
                isValidAddress={isValidAddress}
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
                aria-label="next-page"
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

export default AddFood;
