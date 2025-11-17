import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import noop from 'utils/noop';
import useIsMobile from 'hooks/useIsMobile';
import { TOOLBAR_MODAL_NONE, pushNewResource, setEditingResource } from 'actions/actions';

import debounce from 'utils/debounce';

import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE
} from 'types/ResourceEntry';
import { getUserLocation } from 'reducers/user';
import { addResource } from '../../db';

import ChooseResource from './ChooseResource';
import AddFood from './AddFood/AddFood';
import AddBathroom from './AddBathroom/AddBathroom';
import AddForaging from './AddForaging/AddForaging';
import AddWaterTap from './AddWaterTap/AddWaterTap';
import ModalWrapper from './ModalWrapper';

const initialState = {
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
  closeModal: false,
  latitude: null,
  longitude: null,
  isValidAddress: false,

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

const mapResourceToFormState = resource => {
  if (!resource) return initialState;

  const state = {
    name: resource.name || '',
    address: resource.address || '',
    website: resource.website || '',
    description: resource.description || '',
    guidelines: resource.guidelines || '',
    entryType: resource.entry_type || '',
    latitude: resource.latitude,
    longitude: resource.longitude,
    isValidAddress: true,
    pictures: [],
    images: [],
    handicapAccessible: false,
    idRequired: false
  };

  if (resource.resource_type === WATER_RESOURCE_TYPE) {
    state.filtration = resource.water?.tags?.includes('FILTERED') || false;
    state.waterVesselNeeded = resource.water?.tags?.includes('BYOB') || false;
    state.idRequired = resource.water?.tags?.includes('ID_REQUIRED') || false;
    state.handicapAccessible = resource.water?.tags?.includes('WHEELCHAIR_ACCESSIBLE') || false;
    state.drinkingFountain = resource.water?.dispenser_type?.includes('DRINKING_FOUNTAIN') || false;
    state.bottleFillerAndFountain = resource.water?.dispenser_type?.includes('BOTTLE_FILLER') || false;
    state.sink = resource.water?.dispenser_type?.includes('SINK') || false;
    state.waterJug = resource.water?.dispenser_type?.includes('JUG') || false;
    state.sodaMachine = resource.water?.dispenser_type?.includes('SODA_MACHINE') || false;
    state.pitcher = resource.water?.dispenser_type?.includes('PITCHER') || false;
    state.waterCooler = resource.water?.dispenser_type?.includes('WATER_COOLER') || false;
  }

  if (resource.resource_type === FOOD_RESOURCE_TYPE) {
    state.perishable = resource.food?.food_type?.includes('PERISHABLE') || false;
    state.nonPerishable = resource.food?.food_type?.includes('NON_PERISHABLE') || false;
    state.prepared = resource.food?.food_type?.includes('PREPARED') || false;
    state.eatOnSite = resource.food?.distribution_type?.includes('EAT_ON_SITE') || false;
    state.delivery = resource.food?.distribution_type?.includes('DELIVERY') || false;
    state.pickUp = resource.food?.distribution_type?.includes('PICKUP') || false;
    state.organization = resource.food?.organization_name || '';
  }

  if (resource.resource_type === FORAGE_RESOURCE_TYPE) {
    state.nut = resource.forage?.forage_type?.includes('NUT') || false;
    state.fruit = resource.forage?.forage_type?.includes('FRUIT') || false;
    state.leaves = resource.forage?.forage_type?.includes('LEAVES') || false;
    state.bark = resource.forage?.forage_type?.includes('BARK') || false;
    state.flowers = resource.forage?.forage_type?.includes('FLOWERS') || false;
    state.root = resource.forage?.forage_type?.includes('ROOT') || false;
    state.medicinal = resource.forage?.tags?.includes('MEDICINAL') || false;
    state.inSeason = resource.forage?.tags?.includes('IN_SEASON') || false;
    state.communityGarden = resource.forage?.tags?.includes('COMMUNITY_GARDEN') || false;
  }

  if (resource.resource_type === BATHROOM_RESOURCE_TYPE) {
    state.handicapAccessible = resource.bathroom?.tags?.includes('WHEELCHAIR_ACCESSIBLE') || false;
    state.genderNeutral = resource.bathroom?.tags?.includes('GENDER_NEUTRAL') || false;
    state.changingTable = resource.bathroom?.tags?.includes('CHANGING_TABLE') || false;
    state.singleOccupancy = resource.bathroom?.tags?.includes('SINGLE_OCCUPANCY') || false;
    state.familyBathroom = resource.bathroom?.tags?.includes('FAMILY') || false;
    state.hasFountain = resource.bathroom?.tags?.includes('HAS_FOUNTAIN') || false;
  }

  return { ...initialState, ...state };
};

const AddResourceModalV2 = () => {
  const [page, setPage] = useState(0);
  const [resourceForm, setResourceForm] = useState(null);

  const isMobile = useIsMobile();
  const editingResource = useSelector(state => state.filterMarkers.editingResource);
  const isEditMode = !!editingResource;

  const onPageChange = update => {
    setPage(prev => {
      const newValue = Math.max(0, update(prev));
      if (newValue === 0) {
        setResourceForm(null);
      }
      return newValue;
    });
  };

  const [values, setValues] = useState(() => {
    if (isEditMode && editingResource) {
      return mapResourceToFormState(editingResource);
    }
    return initialState;
  });
  const dispatch = useDispatch();
  const userLocation = useSelector(getUserLocation);

  const setToolbarModal = modal => {
    dispatch({ type: 'SET_TOOLBAR_MODAL', modal });
  };

  useEffect(() => {
    if (isEditMode && editingResource) {
      setResourceForm(editingResource.resource_type);
      setValues(mapResourceToFormState(editingResource));
    }
  }, [isEditMode, editingResource]);

  const checkboxChangeHandler = e => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.checked
    }));
  };

  const debouncedGeocode = useMemo(
    () =>
      debounce(address => {
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
              longitude: lng,
              isValidAddress: true
            }));
          })
          .catch(() => {
            setValues(prevValues => ({
              ...prevValues,
              isValidAddress: false
            }));
          });
      }, 500),
    []
  ); // 500ms debounce delay

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
    setValues(prevValues => ({ ...prevValues, formStep: step }));
  };

  const onDrop = picture => {
    setValues(prevValues => ({ ...prevValues, pictures: picture }));
  };

  const submitImage = imageFile => {
    // Open a request for a new signed URL for S3 upload
    // Upload the image with a PUT request
    // Store the image URL in state.images
    const imageType = imageFile.type;
    const submitUrl = `/submit-image?type=${imageType}`;

    return fetch(submitUrl)
      .then(response => response.json())
      .then(data =>
        fetch(data.putURL, {
          method: 'PUT',
          headers: {
            'Content-Type': imageFile.type
          },
          body: imageFile
        }).then(() => data.getURL)
      )
      .catch(noop);
  };

  const onSubmit = (resourceType, e) => {
    e.preventDefault();

    return Promise.all(
      values.pictures.map(picture => submitImage(picture))
    ).then(async images => {
      // All image uploads completed, loading tap record

      // First, we geocode the address to fill out city, state, zip code, and gp_id from
      // the address_components
      const geocodedAddresses = await geocodeByAddress(values.address);
      const geocodedAddress = geocodedAddresses[0];
      const placeId = geocodedAddress.place_id;
      const city =
        geocodedAddress.address_components.find(component =>
          component.types.includes('locality')
        )?.long_name || null;
      const state =
        geocodedAddress.address_components.find(component =>
          component.types.includes('administrative_area_level_1')
        )?.long_name || null;
      const postalCode =
        geocodedAddress.address_components.find(component =>
          component.types.includes('postal_code')
        )?.long_name || null;

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
        verification: {
          last_modified: new Date().toISOString(),
          last_modifier: 'phlask_app',
          verified: false
        },
        resource_type: resourceType,
        address: values.address,
        city,
        state,
        zip_code: postalCode,
        latitude: values.latitude || userLocation.latitude,
        longitude: values.longitude || userLocation.longitude,
        gp_id: placeId,
        images,
        guidelines: values.guidelines,
        description: values.description,
        name: values.name,
        status: 'OPERATIONAL', // By default, if they are creating a resource, we assume it is operational
        entry_type: values.entryType
        // hours: undefined
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

      // If editing an existing resource, we should submit as a suggestion instead of creating a new resource
      // TODO: Implement suggestion submission workflow with admin review/approval system
      if (isEditMode && editingResource?.id) {
        // For now, editing is disabled - awaiting suggestion workflow implementation
        console.warn('Edit suggestions not yet implemented');
        dispatch(setEditingResource(null));
      } else {
        // Adding a new resource
        addResource(newResource).then(result => {
          dispatch(pushNewResource(newResource));
        });
      }
    });
  };

  const onExitedWrapper = () => {
    setValues(initialState);
    setResourceForm(null);
    dispatch(setEditingResource(null));
  };

  const handleClose = () => {
    setToolbarModal(TOOLBAR_MODAL_NONE);
    setPage(0);

    // This is done as the "Modal" component in ModalWrapper does not invoke
    // "onClose" when it is closed using the close button.
    // Since there is no transition animation on mobile, it is safe to immediately reset the
    // contribution form without impacting the user's experience.
    if (isMobile) {
      onExitedWrapper();
    }
  };

  return (
    <ModalWrapper onExited={onExitedWrapper}>
      <IconButton
        aria-label="close"
        onClick={() => handleClose()}
        sx={{
          position: 'absolute',
          width: isMobile ? '32px' : '23px',
          height: isMobile ? '32px' : '22.3px',
          right: isMobile ? '32px' : '42px',
          top: isMobile ? '25px' : '19px',
          color:
            // Page = 2 assumes Desktop page 2 = Share Socials view
            // Page 2 is not reachable via any Mobile flows
            !resourceForm || page === 2 ? 'black' : 'white'
        }}
        size="large"
      >
        <CloseIcon
          sx={{
            fontSize: 32
          }}
        />
      </IconButton>
      {!resourceForm && (
        <ChooseResource
          onSelectResource={resource => setResourceForm(resource)}
          isMobile={isMobile}
        />
      )}

      {resourceForm === WATER_RESOURCE_TYPE && (
        <AddWaterTap
          key={editingResource?.id || 'new'}
          onPageChange={onPageChange}
          page={page}
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
          isValidAddress={values.isValidAddress}
          editMode={isEditMode}
        />
      )}

      {resourceForm === FOOD_RESOURCE_TYPE && (
        <AddFood
          key={editingResource?.id || 'new'}
          onPageChange={onPageChange}
          page={page}
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
          isValidAddress={values.isValidAddress}
          editMode={isEditMode}
        />
      )}

      {resourceForm === BATHROOM_RESOURCE_TYPE && (
        <AddBathroom
          key={editingResource?.id || 'new'}
          onPageChange={onPageChange}
          page={page}
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
          isValidAddress={values.isValidAddress}
          editMode={isEditMode}
        />
      )}

      {resourceForm === FORAGE_RESOURCE_TYPE && (
        <AddForaging
          key={editingResource?.id || 'new'}
          onPageChange={onPageChange}
          page={page}
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
          isValidAddress={values.isValidAddress}
          editMode={isEditMode}
        />
      )}
    </ModalWrapper>
  );
};

export default AddResourceModalV2;
