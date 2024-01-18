import ImageUploader from 'react-images-upload';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_CONTRIBUTE
} from '../../actions/actions';

import { Box, DialogContent, Paper } from '@mui/material';

// eslint-disable-next-line import/no-unresolved
import ChooseResource from './ChooseResource';
// eslint-disable-next-line import/no-unresolved
import ShareSocials from './ShareSocials';
// eslint-disable-next-line import/no-unresolved
import AddFood from './AddFood/AddFood';
// eslint-disable-next-line import/no-unresolved
import AddBathroom from './AddBathroom/AddBathroom';
// eslint-disable-next-line import/no-unresolved
import AddForaging from './AddForaging/AddForaging';
// eslint-disable-next-line import/no-unresolved
import AddWaterTap from './AddWaterTap/AddWaterTap';
import Wrapper from './Wrapper';
import { getDatabase, ref, set, onValue } from 'firebase/database';

export default function AddResourceModalV3(props) {
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

    // ADD TAP
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
  const [dbConnection, setDbConnection] = useState('');
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.toolbarModal);

  const setToolbarModal = modal => {
    dispatch({ type: 'SET_TOOLBAR_MODAL', modal: modal });
  };

  const checkboxChangeHandler = e => {
    setValues(prevValues => {
      return { ...prevValues, [e.target.name]: e.target.checked };
    });
  };

  const textFieldChangeHandler = e => {
    setValues(prevValues => {
      // the address textbox is set with react-hook-form setValue() when user clicks "use my location instead",
      //  which doesn't fire an event. When that happens, a string is passed instead of an event object, so this
      // conditional expression handles that

      if (e.target) {
        return {
          ...prevValues,
          [e.target.name]: e.target.value
        };
      } else {
        return {
          ...prevValues,
          address: e
        };
      }
    });
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

  // Database
  const onChangeDbConnection = connection => {
    setDbConnection(connection);
  };

  // This useEffect Simulate's the this.setState() callback from original AddResourceModal component
  // for onChangeDbConnection.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }

    // When a form component unmounts (e.g. AddBathroom), it will delete the dbConnection by calling deleteApp(firebaseConnection), which will
    // trigger this useEffect. This will prevent dbConnection from getting passed to the getDatabase() in getCount()
    // when it's undefined after getting deleted
    if (dbConnection === undefined) {
      return;
    }

    getCount();
  }, [dbConnection]);

  const getCount = () => {
    // need to reset count as switching between
    // resources have different counts
    setValues(prevValues => {
      return { ...prevValues, count: 0 };
    });

    const database = getDatabase(dbConnection);
    // this.state.dbConnection
    // .database()
    // .ref("/")g
    // .once("value")
    // .then(snapshot => {
    onValue(ref(database, '/'), snapshot => {
      for (let item in snapshot.val()) {
        if (snapshot.val()[item].access === 'WM') {
          continue;
        }
        if (snapshot.val()[item].active === 'N') {
          continue;
        }
        if (snapshot.val()[item].access === 'TrashAcademy') {
          continue;
        }

        setValues(prevValues => {
          return { ...prevValues, count: prevValues.count + 1 };
        });
      }
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
      .catch(console.error);
  };

  const onSubmit = e => {
    e.preventDefault();
    var upload_promises = [];
    // Upload images
    values.pictures.forEach(picture => {
      upload_promises.push(submitImage(picture));
    });

    return Promise.all(upload_promises).then(images => {
      // All image uploads completed, loading tap record

      /* Easier to construct one new data object than to
       *  figure out which fields we need to submit for each resource type
       *  and create new data objects specific for each resource type
       *  and selectively pass it on to the submit function
       */
      const newData = {
        // SHARED FIELDS
        images: images,
        name: values.name,
        entry_type: values.entryType,
        address: values.address,
        website: values.website,
        description: values.description,
        guidelines: values.guidelines,
        // TAP FIELDS
        filtration: values.filtration,
        handicap: values.handicapAccessible,
        vessel: values.waterVesselNeeded,
        drinking_fountain: values.drinkingFountain,
        bottle_filler_and_fountain: values.bottleFillerAndFountain,
        sink: values.sink,
        water_jug: values.waterJug,
        soda_machine: values.sodaMachine,
        pitcher: values.pitcher,
        water_cooler: values.waterCooler,
        dispenser_type_other: values.dispenserTypeOther,
        // FOOD FIELDS
        organization: values.organization,
        id_required: values.idRequired,
        children_only: values.childrenOnly,
        community_fridges: values.communityFridges,
        perishable: values.perishable,
        non_perishable: values.nonPerishable,
        prepared: values.prepared,
        food_type_other: values.foodTypeOther,
        eat_on_site: values.eatOnSite,
        delivery: values.delivery,
        pick_up: values.pickUp,
        distribution_type_other: values.distributionTypeOther,
        // FORAGING FIELDS
        nut: values.nut,
        fruit: values.fruit,
        leaves: values.leaves,
        bark: values.bark,
        flowers: values.flowers,
        root: values.root,
        medicinal: values.medicinal,
        in_season: values.inSeason,
        community_garden: values.communityGarden,
        // BATHROOM FIELDS
        changing_table: values.changingTable,
        gender_neutral: values.genderNeutral,
        family_bathroom: values.familyBathroom,
        single_occupancy: values.singleOccupancy,
        has_fountain: values.hasFountain
      };

      const database = getDatabase(dbConnection);
      set(ref(database, '/' + (values.count + 1).toString()), newData);
    });
  };

  const handleClose = () => {
    // on close we should reset form state so user can submit another resource

    setValues(initialState);
    setToolbarModal(TOOLBAR_MODAL_NONE);
  };

  return (
    <>
      <Wrapper
        open={toolbarModal === TOOLBAR_MODAL_CONTRIBUTE} // managed by parent component
        onClose={handleClose}
      >
        {values.formStep === 'chooseResource' && (
          <ChooseResource setFormStep={onChangeFormStep} />
        )}

        {/* {PHLASK_TYPE_WATER === phlaskType && ( */}
        {values.formStep == 'addWaterTap' && (
          <AddWaterTap
            prev={() => onChangeFormStep('chooseResource')}
            next={() => onChangeFormStep('shareSocials')}
            page={values.page}
            onNextPageChange={onChangeNextPage}
            onPrevPageChange={onChangePrevPage}
            onSubmit={onSubmit}
            onDbConnectionChange={onChangeDbConnection}
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
            onSubmit={onSubmit}
            onDbConnectionChange={onChangeDbConnection}
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
            onSubmit={onSubmit}
            onDbConnectionChange={onChangeDbConnection}
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
            onSubmit={onSubmit}
            onDbConnectionChange={onChangeDbConnection}
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
      </Wrapper>
    </>
  );
}
