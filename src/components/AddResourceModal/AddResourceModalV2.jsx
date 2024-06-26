import ImageUploader from 'react-images-upload';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';
import {
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_CONTRIBUTE
} from '../../actions/actions';
import { resourcesConfig } from '../../firebase/firebaseConfig';

import { debounce } from '../../utils/debounce';
import ChooseResource from './ChooseResource';
import ShareSocials from './ShareSocials';
import AddFood from './AddFood/AddFood';
import AddBathroom from './AddBathroom/AddBathroom';
import AddForaging from './AddForaging/AddForaging';
import AddWaterTap from './AddWaterTap/AddWaterTap';
import ModalWrapper from './ModalWrapper';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { pushNewResource, setSelectedPlace } from '../../actions/actions';

import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE
} from '../../types/ResourceEntry';
import noop from 'utils/noop';

export default function AddResourceModalV2(props) {
  const initialState = {
    page: 0,
    pictures: [],
    images: [],
    name: '',
    entryType: '',
    address: '',
    website: '',
    description: '',
    guidelines: '',
    handicapAccessible: false,
    idRequired: false,
    count: 0,
    formStep: 'chooseResource',
    closeModal: false,
    latitude: null,
    longitude: null,

    // ADD WATER
    filtration: false,
    waterVesselNeeded: false,
    drinkingFountain: false,
    bottleFillerAndFountain: false,
    sink: false,
    waterJug: false,
    sodaMachine: false,
    pitcher: false,
    waterCooler: false,
    dispenserTypeOther: false,

    // ADD FOOD MODAL FIELDS
    childrenOnly: false,
    communityFridges: false,
    organization: '',
    perishable: false,
    nonPerishable: false,
    prepared: false,
    foodTypeOther: false,
    eatOnSite: false,
    delivery: false,
    pickUp: false,
    distributionTypeOther: false,

    // ADD FORAGING MODAL FIELDS
    nut: false,
    fruit: false,
    leaves: false,
    bark: false,
    flowers: false,
    root: false,
    medicinal: false,
    inSeason: false,
    communityGarden: false,

    // BATHROOM
    changingTable: false,
    genderNeutral: false,
    familyBathroom: false,
    singleOccupancy: false,
    hasFountain: false
  };

  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const userLocation = useSelector(state => state.filterMarkers.userLocation);

  const setToolbarModal = modal => {
    dispatch({ type: 'SET_TOOLBAR_MODAL', modal: modal });
  };

  const checkboxChangeHandler = e => {
    setValues(prevValues => {
      return { ...prevValues, [e.target.name]: e.target.checked };
    });
  };

  // Use imported debounce to prevent the geocoding API from being called too frequently
  const debouncedGeocode = debounce(address => {
    geocodeByAddress(address)
      .then(results => {
        if (results.length === 0) {
          throw new Error('ZERO_RESULTS');
        }
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        // Update the state with the latitude and longitude
        setValues(prevValues => ({
          ...prevValues,
          latitude: lat,
          longitude: lng
        }));
      })
      .catch(noop);
  }, 500); // 500ms debounce delay

  const textFieldChangeHandler = eventOrString => {
    let newValue;
    let fieldName;

    if (eventOrString && eventOrString.target) {
      // This is an event object
      newValue = eventOrString.target.value;
      fieldName = eventOrString.target.name;
    } else {
      // This is a direct string input - "Use My Location" button was clicked
      newValue = eventOrString;
      fieldName = 'address';
    }

    // Update the state with the new value
    setValues(prevValues => ({
      ...prevValues,
      [fieldName]: newValue
    }));

    // Trigger the debounced geocoding function if this was an address
    if (fieldName === 'address') {
      debouncedGeocode(newValue);
    }
  };

  // controls which modal state to show
  // (e.g. choose resource, add water tap, social links)
  const onChangeFormStep = step => {
    setValues(prevValues => {
      return { ...prevValues, formStep: step };
    });
  };

  const onChangeNextPage = () => {
    setValues(prevValues => {
      if (prevValues.page < 1) {
        return { ...prevValues, page: prevValues.page + 1 };
      }

      return { ...prevValues };
    });
  };

  const onChangePrevPage = () => {
    setValues(prevValues => {
      if (prevValues.page > 0) {
        return { ...prevValues, page: prevValues.page - 1 };
      }

      // return to chooseResource modal if already on first page of desktop form and they click the prevPage button
      onChangeFormStep('chooseResource');

      return { ...prevValues };
    });
  };

  const onDrop = picture => {
    setValues(prevValues => {
      return { ...prevValues, pictures: picture };
    });
  };

  const submitImage = imageFile => {
    // Open a request for a new signed URL for S3 upload
    // Upload the image with a PUT request
    // Store the image URL in state.images
    const imageType = imageFile.type;
    const submitUrl = '/submit-image?type=' + imageType;

    return fetch(submitUrl)
      .then(response => response.json())
      .then(data => {
        return fetch(data.putURL, {
          method: 'PUT',
          headers: {
            'Content-Type': imageFile.type
          },
          body: imageFile
        }).then(() => {
          return data.getURL;
        });
      })
      .catch(noop);
  };

  const onSubmit = (resourceType, e) => {
    e.preventDefault();
    var upload_promises = [];
    // Upload images
    values.pictures.forEach(picture => {
      upload_promises.push(submitImage(picture));
    });

    return Promise.all(upload_promises).then(async images => {
      // All image uploads completed, loading tap record

      // First, we geocode the address to fill out city, state, zip code, and gp_id from
      // the address_components
      const geocodedAddresses = await geocodeByAddress(values.address);
      const geocodedAddress = geocodedAddresses[0];
      const placeId = geocodedAddress.place_id;
      const city = geocodedAddress.address_components.find(component =>
        component.types.includes('locality')
      ).long_name;
      const state = geocodedAddress.address_components.find(component =>
        component.types.includes('administrative_area_level_1')
      ).long_name;
      const postalCode = geocodedAddress.address_components.find(component =>
        component.types.includes('postal_code')
      ).long_name;

      /**
       *
       * @type {ResourceEntry}
       */
      const newResource = {
        version: 1,
        date_created: new Date().toISOString(),
        creator: 'phlask_app',
        last_modified: new Date().toISOString(),
        last_modifier: 'phlask_app',
        source: {
          type: 'MANUAL'
        },
        verified: false,
        resource_type: resourceType,
        address: values.address,
        city: city,
        state: state,
        zip_code: postalCode,
        latitude: values.latitude || userLocation.lat,
        longitude: values.longitude || userLocation.lng,
        gp_id: placeId,
        images: images,
        guidelines: values.guidelines,
        description: values.description,
        name: values.name,
        status: 'OPERATIONAL', // By default, if they are creating a resource, we assume it is operational
        entry_type: values.entryType
        //hours: undefined
      };

      // TODO(vontell): For now, we take the existing form data coming into values and transform these into the v1 schema
      // format. Ideally, the forms should be storing the correct format directly, but for a first pass, I felt like this
      // was the simplest to save on time.

      // Set the details for the specific resource type
      if (resourceType === WATER_RESOURCE_TYPE) {
        newResource.water = {
          dispenser_type: [
            values.drinkingFountain ? 'DRINKING_FOUNTAIN' : null,
            values.bottleFillerAndFountain ? 'BOTTLE_FILLER' : null,
            values.sink ? 'SINK' : null,
            values.waterJug ? 'JUG' : null,
            values.sodaMachine ? 'SODA_MACHINE' : null,
            values.pitcher ? 'PITCHER' : null,
            values.waterCooler ? 'WATER_COOLER' : null
          ].filter(Boolean),
          tags: [
            values.handicapAccessible ? 'WHEELCHAIR_ACCESSIBLE' : null,
            values.filtration ? 'FILTERED' : null,
            values.waterVesselNeeded ? 'BYOB' : null,
            values.idRequired ? 'ID_REQUIRED' : null
          ].filter(Boolean)
        };
      }

      if (resourceType === FOOD_RESOURCE_TYPE) {
        newResource.food = {
          food_type: [
            values.perishable ? 'PERISHABLE' : null,
            values.nonPerishable ? 'NON_PERISHABLE' : null,
            values.prepared ? 'PREPARED' : null
          ].filter(Boolean),
          distribution_type: [
            values.eatOnSite ? 'EAT_ON_SITE' : null,
            values.delivery ? 'DELIVERY' : null,
            values.pickUp ? 'PICKUP' : null
          ].filter(Boolean),
          organization_type: [
            values.organization
              ? values.organization.toUpperCase().replace(/\s+/g, '_')
              : null
          ].filter(Boolean),
          organization_name: values.organization,
          organization_url: values.website
        };
      }

      if (resourceType === FORAGE_RESOURCE_TYPE) {
        newResource.forage = {
          forage_type: [
            values.nut ? 'NUT' : null,
            values.fruit ? 'FRUIT' : null,
            values.leaves ? 'LEAVES' : null,
            values.bark ? 'BARK' : null,
            values.flowers ? 'FLOWERS' : null,
            values.root ? 'ROOT' : null
          ].filter(Boolean),
          tags: [
            values.medicinal ? 'MEDICINAL' : null,
            values.inSeason ? 'IN_SEASON' : null,
            values.communityGarden ? 'COMMUNITY_GARDEN' : null
          ].filter(Boolean)
        };
      }

      if (resourceType === BATHROOM_RESOURCE_TYPE) {
        newResource.bathroom = {
          tags: [
            values.handicapAccessible ? 'WHEELCHAIR_ACCESSIBLE' : null,
            values.genderNeutral ? 'GENDER_NEUTRAL' : null,
            values.changingTable ? 'CHANGING_TABLE' : null,
            values.singleOccupancy ? 'SINGLE_OCCUPANCY' : null,
            values.familyBathroom ? 'FAMILY' : null,
            values.hasFountain ? 'HAS_FOUNTAIN' : null
          ].filter(Boolean)
        };
      }

      // TODO(vontell): We probably should not init this here ever time, although it is likely fine.
      const app = initializeApp(resourcesConfig);
      const database = getDatabase(app);
      push(ref(database, '/'), newResource);
      dispatch(pushNewResource(newResource));
    });
  };

  const handleClose = () => {
    // on close we should reset form state so user can submit another resource

    setValues(initialState);
    setToolbarModal(TOOLBAR_MODAL_NONE);
  };

  return (
    <ModalWrapper
      open={toolbarModal === TOOLBAR_MODAL_CONTRIBUTE}
      onClose={handleClose}
    >
      {values.formStep === 'chooseResource' && (
        <ChooseResource setFormStep={onChangeFormStep} />
      )}

      {values.formStep == 'addWaterTap' && (
        <AddWaterTap
          prev={() => onChangeFormStep('chooseResource')}
          next={() => onChangeFormStep('shareSocials')}
          page={values.page}
          onNextPageChange={onChangeNextPage}
          onPrevPageChange={onChangePrevPage}
          onSubmit={e => onSubmit(WATER_RESOURCE_TYPE, e)}
          onDrop={onDrop}
          name={values.name}
          address={values.address}
          website={values.website}
          description={values.description}
          entryType={values.entryType}
          handicapAccessible={values.handicapAccessible}
          idRequired={values.idRequired}
          waterVesselNeeded={values.waterVesselNeeded}
          filtration={values.filtration}
          drinkingFountain={values.drinkingFountain}
          bottleFillerAndFountain={values.bottleFillerAndFountain}
          sink={values.sink}
          waterJug={values.waterJug}
          sodaMachine={values.sodaMachine}
          pitcher={values.pitcher}
          waterCooler={values.waterCooler}
          dispenserTypeOther={values.dispenserTypeOther}
          guidelines={values.guidelines}
          checkboxChangeHandler={checkboxChangeHandler}
          textFieldChangeHandler={textFieldChangeHandler}
        />
      )}

      {values.formStep === 'addFood' && (
        <AddFood
          prev={() => onChangeFormStep('chooseResource')}
          next={() => onChangeFormStep('shareSocials')}
          page={values.page}
          onNextPageChange={onChangeNextPage}
          onPrevPageChange={onChangePrevPage}
          onSubmit={e => onSubmit(FOOD_RESOURCE_TYPE, e)}
          onDrop={onDrop}
          name={values.name}
          address={values.address}
          website={values.website}
          description={values.description}
          organization={values.organization}
          handicapAccessible={values.handicapAccessible}
          idRequired={values.idRequired}
          childrenOnly={values.childrenOnly}
          communityFridges={values.communityFridges}
          perishable={values.perishable}
          nonPerishable={values.nonPerishable}
          prepared={values.prepared}
          foodTypeOther={values.foodTypeOther}
          eatOnSite={values.eatOnSite}
          delivery={values.delivery}
          pickUp={values.pickUp}
          distributionTypeOther={values.distributionTypeOther}
          guidelines={values.guidelines}
          checkboxChangeHandler={checkboxChangeHandler}
          textFieldChangeHandler={textFieldChangeHandler}
        />
      )}

      {values.formStep === 'addBathroom' && (
        <AddBathroom
          prev={() => onChangeFormStep('chooseResource')}
          next={() => onChangeFormStep('shareSocials')}
          page={values.page}
          onNextPageChange={onChangeNextPage}
          onPrevPageChange={onChangePrevPage}
          onSubmit={e => onSubmit(BATHROOM_RESOURCE_TYPE, e)}
          onDrop={onDrop}
          name={values.name}
          address={values.address}
          website={values.website}
          description={values.description}
          entryType={values.entryType}
          guidelines={values.guidelines}
          handicapAccessible={values.handicapAccessible}
          changingTable={values.changingTable}
          genderNeutral={values.genderNeutral}
          familyBathroom={values.familyBathroom}
          singleOccupancy={values.singleOccupancy}
          hasFountain={values.hasFountain}
          checkboxChangeHandler={checkboxChangeHandler}
          textFieldChangeHandler={textFieldChangeHandler}
        />
      )}

      {values.formStep === 'addForaging' && (
        <AddForaging
          prev={() => onChangeFormStep('chooseResource')}
          next={() => onChangeFormStep('shareSocials')}
          page={values.page}
          onNextPageChange={onChangeNextPage}
          onPrevPageChange={onChangePrevPage}
          onSubmit={e => onSubmit(FORAGE_RESOURCE_TYPE, e)}
          onDrop={onDrop}
          name={values.name}
          address={values.address}
          website={values.website}
          description={values.description}
          entryType={values.entryType}
          nut={values.nut}
          fruit={values.fruit}
          leaves={values.leaves}
          bark={values.bark}
          flowers={values.flowers}
          root={values.root}
          guidelines={values.guidelines}
          medicinal={values.medicinal}
          inSeason={values.inSeason}
          communityGarden={values.communityGarden}
          checkboxChangeHandler={checkboxChangeHandler}
          textFieldChangeHandler={textFieldChangeHandler}
        />
      )}

      {values.formStep === 'shareSocials' && <ShareSocials />}
    </ModalWrapper>
  );
}
