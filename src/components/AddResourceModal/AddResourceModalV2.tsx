import { useMemo, useState, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
// @ts-expect-error need to use the updated geocoding API
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import noop from 'utils/noop';
import useIsMobile from 'hooks/useIsMobile';
import {
  TOOLBAR_MODAL_NONE,
  pushNewResource,
  setToolbarModal,
  type ResourceType,
  type ToolbarModalType
} from 'actions/actions';

import debounce from 'utils/debounce';

import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE,
  type ResourceEntry,
  type BathroomType,
  type ForageType,
  type ForageTag,
  type FoodType,
  type FoodDistributionType,
  type FoodOrganizationType,
  type WaterDispenserType,
  type WaterTag
} from 'types/ResourceEntry';
import { getUserLocation } from 'reducers/user';
import { addResource } from '../../db';

import ChooseResource from './ChooseResource';
import AddFood from './AddFood/AddFood';
import AddBathroom from './AddBathroom/AddBathroom';
import AddForaging from './AddForaging/AddForaging';
import AddWaterTap from './AddWaterTap/AddWaterTap';
import ModalWrapper from './ModalWrapper';
import useAppSelector from 'hooks/useSelector';

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

const AddResourceModalV2 = () => {
  const [page, setPage] = useState(0);
  const [resourceForm, setResourceForm] = useState<ResourceType | null>(null);

  const isMobile = useIsMobile();

  const onPageChange = (update: (prev: number) => number) => {
    return setPage(prev => {
      const newValue = Math.max(0, update(prev));
      if (newValue === 0) {
        setResourceForm(null);
      }
      return newValue;
    });
  };

  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const userLocation = useAppSelector(getUserLocation);

  const setToolbar = (modalType: ToolbarModalType) => {
    dispatch(setToolbarModal(modalType));
  };

  const checkboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.checked
    }));
  };

  const debouncedGeocode = useMemo(
    () =>
      debounce((address: string) => {
        geocodeByAddress(address)
          .then((results: google.maps.LatLng[]) => {
            if (results.length === 0) {
              throw new Error('ZERO_RESULTS');
            }
            return getLatLng(results[0]);
          })
          .then(({ lat, lng }: google.maps.LatLngLiteral) => {
            // Update the state with the latitude and longitude
            // @ts-expect-error Need to write actual form management
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

  const extractValueFromEvent = (event: ChangeEvent<HTMLInputElement>) => {
    return { name: event.target.name, value: event.target.value };
  };

  const textFieldChangeHandler = (
    eventOrString: ChangeEvent<HTMLInputElement> | string
  ) => {
    let newValue;
    let fieldName;

    if (typeof eventOrString !== 'string') {
      // This is an event object
      const event = extractValueFromEvent(eventOrString);

      fieldName = event.name;
      newValue = event.value;
    } else {
      // This is a direct string input - "Use My Location" button was clicked
      fieldName = 'address';
      newValue = eventOrString;
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

  const onDrop = (picture: never[]) => {
    setValues(prevValues => ({ ...prevValues, pictures: picture }));
  };

  const submitImage = (imageFile: File) => {
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

  const onSubmit = (resourceType: ResourceType, e: SubmitEvent) => {
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

      const newResource: ResourceEntry = {
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
          verifier: 'phlask_app',
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
        entry_type: values.entryType as 'OPEN' | 'RESTRICTED' | 'UNSURE'
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
          ].filter(Boolean) as WaterDispenserType[],
          tags: [
            values.handicapAccessible ? 'WHEELCHAIR_ACCESSIBLE' : null,
            values.filtration ? 'FILTERED' : null,
            values.waterVesselNeeded ? 'BYOB' : null,
            values.idRequired ? 'ID_REQUIRED' : null
          ].filter(Boolean) as WaterTag[]
        };
      }

      if (resourceType === FOOD_RESOURCE_TYPE) {
        newResource.food = {
          food_type: [
            values.perishable ? 'PERISHABLE' : null,
            values.nonPerishable ? 'NON_PERISHABLE' : null,
            values.prepared ? 'PREPARED' : null
          ].filter(Boolean) as FoodType[],
          distribution_type: [
            values.eatOnSite ? 'EAT_ON_SITE' : null,
            values.delivery ? 'DELIVERY' : null,
            values.pickUp ? 'PICKUP' : null
          ].filter(Boolean) as FoodDistributionType[],
          organization_type: [
            values.organization
              ? values.organization.toUpperCase().replace(/\s+/g, '_')
              : null
          ].filter(Boolean) as FoodOrganizationType[],
          organization_name: values.organization,
          organization_url: values.website,
          tags: []
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
          ].filter(Boolean) as ForageType[],
          tags: [
            values.medicinal ? 'MEDICINAL' : null,
            values.inSeason ? 'IN_SEASON' : null,
            values.communityGarden ? 'COMMUNITY_GARDEN' : null
          ].filter(Boolean) as ForageTag[]
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
          ].filter(Boolean) as BathroomType[]
        };
      }

      addResource.render(newResource).then(() => {
        dispatch(pushNewResource(newResource));
      });
    });
  };

  const onExitedWrapper = () => {
    setValues(initialState);
    setResourceForm(null);
  };

  const handleClose = () => {
    setToolbar(TOOLBAR_MODAL_NONE);
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
      {!resourceForm && (
        <ChooseResource
          onSelectResource={resource => setResourceForm(resource)}
          onClose={handleClose}
        />
      )}

      {resourceForm === WATER_RESOURCE_TYPE && (
        <AddWaterTap
          onClose={handleClose}
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
        />
      )}

      {resourceForm === FOOD_RESOURCE_TYPE && (
        <AddFood
          onClose={handleClose}
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
        />
      )}

      {resourceForm === BATHROOM_RESOURCE_TYPE && (
        <AddBathroom
          onClose={handleClose}
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
        />
      )}

      {resourceForm === FORAGE_RESOURCE_TYPE && (
        <AddForaging
          onClose={handleClose}
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
        />
      )}
    </ModalWrapper>
  );
};

export default AddResourceModalV2;
