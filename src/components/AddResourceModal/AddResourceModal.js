import styles from './AddResourceModal.module.scss';
import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import ImageUploader from 'react-images-upload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { isMobile } from 'react-device-detect';
// eslint-disable-next-line import/no-unresolved
import ChooseResource from './ChooseResource';
// eslint-disable-next-line import/no-unresolved
import ShareSocials from './ShareSocials';
// eslint-disable-next-line import/no-unresolved
import AddFood from './AddFood';
// eslint-disable-next-line import/no-unresolved
import AddBathroom from './AddBathroom';
// eslint-disable-next-line import/no-unresolved
import AddForaging from './AddForaging';
// eslint-disable-next-line import/no-unresolved
import AddWaterTap from './AddWaterTap';
import { getDatabase, ref, set, onValue } from 'firebase/database';

export class AddResourceModal extends Component {
  constructor(props) {
    super(props);
    this.onChangeFormStep = this.onChangeFormStep.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onNameChange = this.onChangeName.bind(this);
    this.onChangeEntryType = this.onChangeEntryType.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
    this.onChangePhlaskStatement = this.onChangePhlaskStatement.bind(this);
    this.onChangeNormsAndRules = this.onChangeNormsAndRules.bind(this);
    this.onChangeHandicapAccess = this.onChangeHandicapAccess.bind(this);
    this.onChangeIdRequired = this.onChangeIdRequired.bind(this);
    // ADD TAP MODAL
    this.onChangeTapServiceType = this.onChangeTapServiceType.bind(this);
    this.onChangeTapType = this.onChangeTapType.bind(this);
    this.onChangeWaterVesselNeeded = this.onChangeWaterVesselNeeded.bind(this);
    this.onChangeFiltration = this.onChangeFiltration.bind(this);
    this.onChangeDrinkingFountain = this.onChangeDrinkingFountain.bind(this);
    this.onChangeBottleFillerAndFountain =
      this.onChangeBottleFillerAndFountain.bind(this);
    this.onChangeSink = this.onChangeSink.bind(this);
    this.onChangeWaterJug = this.onChangeWaterJug.bind(this);
    this.onChangeSodaMachine = this.onChangeSodaMachine.bind(this);
    this.onChangePitcher = this.onChangePitcher.bind(this);
    this.onChangeDispenserTypeOther =
      this.onChangeDispenserTypeOther.bind(this);
    // ADD FOOD MODAL
    this.onChangeFoodType = this.onChangeFoodType.bind(this);
    this.onChangeCommunityFridges = this.onChangeCommunityFridges.bind(this);
    this.onChangePershable = this.onChangePershable.bind(this);
    this.onChangeNonPerishable = this.onChangeNonPerishable.bind(this);
    this.onChangePrepared = this.onChangePrepared.bind(this);
    this.onChangeFoodTypeOther = this.onChangeFoodTypeOther.bind(this);
    this.onChangeEatOnSite = this.onChangeEatOnSite.bind(this);
    this.onChangeDelivery = this.onChangeDelivery.bind(this);
    this.onChangePickUp = this.onChangePickUp.bind(this);
    this.onChangeDistributionTypeOther =
      this.onChangeDistributionTypeOther.bind(this);
    this.onChangeChildrenOnly = this.onChangeChildrenOnly.bind(this);
    // ADD FORAGING MODAL FIELDS
    this.onChangeForagingFoodType = this.onChangeForagingFoodType.bind(this);
    this.onChangeNut = this.onChangeNut.bind(this);
    this.onChangeFruit = this.onChangeFruit.bind(this);
    this.onChangeLeaves = this.onChangeLeaves.bind(this);
    this.onChangeBark = this.onChangeBark.bind(this);
    this.onChangeFlowers = this.onChangeFlowers.bind(this);
    this.onChangeRoot = this.onChangeRoot.bind(this);
    this.onChangeMedicinal = this.onChangeMedicinal.bind(this);
    this.onChangeInSeason = this.onChangeInSeason.bind(this);
    this.onChangeCommuntiyGarden = this.onChangeCommuntiyGarden.bind(this);
    //  BATHROOM MODAL
    this.onChangeChangingTable = this.onChangeChangingTable.bind(this);
    this.onChangeGenderNeutral = this.onChangeGenderNeutral.bind(this);
    this.onChangeFamilyBathroom = this.onChangeFamilyBathroom.bind(this);
    this.onChangeSingleOccupancy = this.onChangeSingleOccupancy.bind(this);
    this.onChangeHasFountain = this.onChangeHasFountain.bind(this);

    // BACKEND
    this.onChangeDbConnection = this.onChangeDbConnection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      pictures: [],
      images: [],
      name: '',
      entryType: '',
      address: '',
      website: '',
      description: '',
      phlaskStatement: '',
      normsAndRules: '',
      handicapAccessable: false,
      idRequired: false,
      dbConnection: '',
      count: 0,
      show: false,
      formStep: 'chooseResource',
      // ADD TAP
      tapServiceType: '',
      tapType: '',
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
      foodType: '',
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
      foragingFoodType: '',
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
  }

  // controls which modal state to show
  // (e.g. choose resource, add water tap, social links)
  onChangeFormStep(step) {
    this.setState({ formStep: step });
  }

  onDrop(picture) {
    this.setState({
      pictures: picture
    });
  }

  submitImage(imageFile) {
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
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEntryType(e) {
    this.setState({
      entryType: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target ? e.target.value : e
    });
  }

  onChangeWebsite(e) {
    this.setState({
      website: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeOrganization(e) {
    this.setState({
      organization: e.target.value
    });
  }

  onChangeHandicapAccess(e) {
    this.setState({
      handicapAccessable: e.target.checked
    });
  }

  onChangeIdRequired(e) {
    this.setState({
      idRequired: e.target.checked
    });
  }

  onChangePhlaskStatement(e) {
    this.setState({
      phlaskStatement: e.target.value
    });
  }

  onChangeNormsAndRules(e) {
    this.setState({
      normsAndRules: e.target.value
    });
  }

  // ADD TAP MODAL FIELDS

  onChangeTapServiceType(e) {
    this.setState({
      tapServiceType: e.target.value
    });
  }

  onChangeTapType(e) {
    this.setState({
      tapType: e.target.value
    });
  }

  onChangeFiltration(e) {
    this.setState({
      filtration: e.target.checked
    });
  }

  onChangeWaterVesselNeeded(e) {
    this.setState({
      waterVesselNeeded: e.target.checked
    });
  }

  onChangeDrinkingFountain(e) {
    this.setState({
      drinkingFountain: e.target.checked
    });
  }

  onChangeBottleFillerAndFountain(e) {
    this.setState({
      bottleFillerAndFountain: e.target.checked
    });
  }

  onChangeSink(e) {
    this.setState({
      sink: e.target.checked
    });
  }

  onChangeWaterJug(e) {
    this.setState({
      waterJug: e.target.checked
    });
  }

  onChangeSodaMachine(e) {
    this.setState({
      sodaMachine: e.target.checked
    });
  }

  onChangePitcher(e) {
    this.setState({
      pitcher: e.target.checked
    });
  }

  onChangeWaterCooler(e) {
    this.setState({
      waterCooler: e.target.checked
    });
  }

  onChangeDispenserTypeOther(e) {
    this.setState({
      dispenserTypeOther: e.target.checked
    });
  }

  // ADD FOOD MODAL FIELDS

  onChangeChildrenOnly(e) {
    this.setState({
      childrenOnly: e.target.checked
    });
  }

  onChangePershable(e) {
    this.setState({
      perishable: e.target.checked
    });
  }

  onChangeNonPerishable(e) {
    this.setState({
      nonPerishable: e.target.checked
    });
  }

  onChangePrepared(e) {
    this.setState({
      prepared: e.target.checked
    });
  }

  onChangeFoodTypeOther(e) {
    this.setState({
      foodTypeOther: e.target.checked
    });
  }

  onChangeEatOnSite(e) {
    this.setState({
      eatOnSite: e.target.checked
    });
  }

  onChangeDelivery(e) {
    this.setState({
      delivery: e.target.checked
    });
  }

  onChangePickUp(e) {
    this.setState({
      pickUp: e.target.checked
    });
  }

  onChangeDistributionTypeOther(e) {
    this.setState({
      distributionTypeOther: e.target.checked
    });
  }

  onChangeFoodType(e) {
    this.setState({
      foodType: e.target.value
    });
  }

  onChangeCommunityFridges(e) {
    this.setState({
      communityFridges: e.target.checked
    });
  }

  // ADD FORAGING MODAL FIELDS

  onChangeForagingFoodType(e) {
    this.setState({
      foragingFoodType: e.target.value
    });
  }

  onChangeNut(e) {
    this.setState({
      nut: e.target.checked
    });
  }

  onChangeFruit(e) {
    this.setState({
      fruit: e.target.checked
    });
  }

  onChangeLeaves(e) {
    this.setState({
      leaves: e.target.checked
    });
  }

  onChangeBark(e) {
    this.setState({
      bark: e.target.checked
    });
  }

  onChangeFlowers(e) {
    this.setState({
      flowers: e.target.checked
    });
  }

  onChangeRoot(e) {
    this.setState({
      root: e.target.checked
    });
  }

  onChangeMedicinal(e) {
    this.setState({
      medicinal: e.target.checked
    });
  }

  onChangeInSeason(e) {
    this.setState({
      inSeason: e.target.checked
    });
  }

  onChangeCommuntiyGarden(e) {
    this.setState({
      communityGarden: e.target.checked
    });
  }

  // ADD BATHROOM MODAL FIELDS

  onChangeChangingTable(e) {
    this.setState({
      changingTable: e.target.checked
    });
  }

  onChangeGenderNeutral(e) {
    this.setState({
      genderNeutral: e.target.checked
    });
  }

  onChangeFamilyBathroom(e) {
    this.setState({
      familyBathroom: e.target.checked
    });
  }

  onChangeSingleOccupancy(e) {
    this.setState({
      singleOccupancy: e.target.checked
    });
  }

  onChangeHasFountain(e) {
    this.setState({
      hasFountain: e.target.checked
    });
  }

  // Database
  onChangeDbConnection(connection) {
    this.setState(
      {
        dbConnection: connection
      },
      () => {
        this.getCount();
      }
    );
  }

  getCount() {
    // need to reset count as switching between
    // resources have different counts
    this.setState({ count: 0 });
    const database = getDatabase(this.state.dbConnection);
    // this.state.dbConnection
    // .database()
    // .ref("/")
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
        this.setState((prevState, props) => ({
          count: prevState.count + 1
        }));
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var upload_promises = [];
    // Upload images
    this.state.pictures.forEach(picture => {
      upload_promises.push(this.submitImage(picture));
    });

    return Promise.all(upload_promises).then(images => {
      // All image uploads completed, loading tap record

      /* Easier to construct one new data object than to
       *  figure out which fields we need to submit for each resource type
       *  and create new data objects specific for each resource type
       *  and selectively pass it on to the submit function
       */
      const newData = {
        images: images,
        name: this.state.name,
        entryType: this.state.entryType,
        address: this.state.address,
        website: this.state.website,
        description: this.state.description,
        // TAP FIELDS
        filtration: this.state.filtration,
        handicap: this.state.handicapAccessable,
        service: this.state.tapServiceType,
        tap_type: this.state.tapType,
        vessel: this.state.waterVesselNeeded,
        drinking_fountain: this.state.drinkingFountain,
        bottle_filler_and_fountain: this.state.bottleFillerAndFountain,
        sink: this.state.sink,
        water_jug: this.state.waterJug,
        soda_machine: this.state.sodaMachine,
        pitcher: this.state.pitcher,
        water_cooler: this.state.waterCooler,
        dispenser_type_oher: this.state.dispenserTypeOther,
        // FOOD FIELDS
        food_type: this.state.foodType,
        organization: this.state.organization,
        id_required: this.state.idRequired,
        children_only: this.state.childrenOnly,
        community_fridges: this.state.communityFridges,
        perishable: this.state.perishable,
        non_perishable: this.state.nonPerishable,
        prepared: this.state.prepared,
        food_type_other: this.state.foodTypeOther,
        eat_on_site: this.state.eatOnSite,
        delivery: this.state.delivery,
        pick_up: this.state.pickUp,
        distribution_type_other: this.state.distributionTypeOther,
        // FORAGING FIELDS
        foraging_food_type: this.state.foragingFoodType,
        nut: this.state.nut,
        fruit: this.state.fruit,
        leaves: this.state.leaves,
        bark: this.state.bark,
        flowers: this.state.flowers,
        root: this.state.root,
        medicinal: this.state.medicinal,
        in_season: this.state.inSeason,
        community_garden: this.state.communityGarden,
        // BATHROOM FIELDS
        changing_table: this.state.changingTable,
        gender_neutral: this.state.genderNeutral,
        family_bathroom: this.state.familyBathroom,
        single_occupancy: this.state.singleOccupancy,
        has_fountain: this.state.hasFountain,
        // SHARED FIELDS
        statement: this.state.phlaskStatement,
        norms_rules: this.state.normsAndRules
      };

      console.log(newData);
      const database = getDatabase(this.state.dbConnection);
      set(ref(database, '/' + (this.state.count + 1).toString()), newData);
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    // on close we should reset form step and
    // form state so user can submit another resource
    const resetState = {
      pictures: [],
      images: [],
      name: '',
      entryType: '',
      address: '',
      website: '',
      description: '',
      organization: '',
      tapServiceType: '',
      tapType: '',
      phlaskStatement: '',
      normsAndRules: '',
      dbConnection: '',
      count: 0,
      show: false,
      formStep: 'chooseResource',
      idRequired: false,
      // ADD TAP MODAL
      filtration: false,
      handicapAccessable: false,
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
      foodType: '',
      communityFridges: false,
      perishable: false,
      nonPerishable: false,
      prepared: false,
      foodTypeOther: false,
      eatOnSite: false,
      delivery: false,
      pickUp: false,
      distributionTypeOther: false,
      // ADD FORAGING MODAL FIELDS
      foragingFoodType: '',
      nut: false,
      fruit: false,
      leaves: false,
      bark: false,
      flowers: false,
      root: false,
      medicinal: false,
      inSeason: false,
      communityGarden: false,
      // ADD BATHROOM MODAL FIELDS
      changingTable: false,
      genderNeutral: false,
      familyBathroom: false,
      singleOccupancy: false,
      hasFountain: false
    };
    this.setState(resetState);
  }

  render() {
    return (
      <>
        <Dialog
          open={this.state.show}
          onClose={this.handleClose}
          className={styles.modal}
        >
          {this.state.formStep === 'chooseResource' && (
            <ChooseResource setFormStep={this.onChangeFormStep} />
          )}

          {this.state.formStep === 'addWaterTap' && (
            <AddWaterTap
              prev={() => this.onChangeFormStep('chooseResource')}
              next={() => this.onChangeFormStep('shareSocials')}
              onSubmit={this.onSubmit}
              onDbConnectionChange={this.onChangeDbConnection}
              onDrop={this.onDrop}
              name={this.state.name}
              onNameChange={this.onNameChange}
              address={this.state.address}
              onAddressChange={this.onChangeAddress}
              website={this.state.website}
              onWebsiteChange={this.onChangeWebsite}
              description={this.state.description}
              onDescriptionChange={this.onChangeDescription}
              entryType={this.state.entryType}
              onEntryTypehange={this.onChangeEntryType}
              accessible={this.state.handicapAccessable}
              onAccessibleChange={this.onChangeHandicapAccess}
              idRequired={this.state.idRequired}
              onIdRequiredChange={this.onChangeIdRequired}
              childrenOnly={this.state.childrenOnly}
              onChildrenOnlyChange={this.onChangeChildrenOnly}
              waterVesselNeeded={this.state.waterVesselNeeded}
              onWaterVesselNeededChange={this.onChangeWaterVesselNeeded}
              filtration={this.state.filtration}
              onFiltrationChange={this.onChangeFiltration}
              tapServiceType={this.state.tapServiceType}
              onTapServiceTypeChange={this.onChangeTapServiceType}
              tapType={this.state.tapType}
              onTapTypeChange={this.onChangeTapType}
              phlaskStatement={this.state.phlaskStatement}
              onPhlaskStatementChange={this.onChangePhlaskStatement}
              drinkingFountain={this.state.drinkingFountain}
              onDrinkingFountainChange={this.onChangeDrinkingFountain}
              bottleFillerAndFountain={this.state.bottleFillerAndFountain}
              onBottleFillerAndFountainChange={
                this.onChangeBottleFillerAndFountain
              }
              sink={this.state.sink}
              onSinkChange={this.onChangeSink}
              waterJug={this.state.waterJug}
              onWaterJugChange={this.onChangeWaterJug}
              sodaMachine={this.state.sodaMachine}
              onSodaMachineChange={this.onChangeSodaMachine}
              pitcher={this.state.pitcher}
              onPitcherChange={this.onChangePitcher}
              waterCooler={this.state.waterCooler}
              onWaterCoolerChange={this.onChangeWaterCooler}
              dispenserTypeOther={this.state.dispenserTypeOther}
              onDispenserTypeOtherChange={this.onChangeDispenserTypeOther}
              normsAndRules={this.state.normsAndRules}
              onNormsAndRulesChange={this.onChangeNormsAndRules}
            />
          )}

          {this.state.formStep === 'addFood' && (
            <AddFood
              prev={() => this.onChangeFormStep('chooseResource')}
              next={() => this.onChangeFormStep('shareSocials')}
              onSubmit={this.onSubmit}
              onDbConnectionChange={this.onChangeDbConnection}
              onDrop={this.onDrop}
              name={this.state.name}
              onNameChange={this.onNameChange}
              address={this.state.address}
              onAddressChange={this.onChangeAddress}
              website={this.state.website}
              onWebsiteChange={this.onChangeWebsite}
              description={this.state.description}
              onDescriptionChange={this.onChangeDescription}
              organization={this.state.organization}
              onOrganizationChange={this.onChangeOrganization}
              accessible={this.state.handicapAccessable}
              onAccessibleChange={this.onChangeHandicapAccess}
              idRequired={this.state.idRequired}
              onIdRequiredChange={this.onChangeIdRequired}
              childrenOnly={this.state.childrenOnly}
              onChildrenOnlyChange={this.onChangeChildrenOnly}
              communityFridges={this.state.communityFridges}
              onCommunityFridgesChange={this.onChangeCommunityFridges}
              foodType={this.state.foodType}
              onFoodTypeChange={this.onChangeFoodType}
              perishable={this.state.perishable}
              onPerishableChange={this.onChangePershable}
              nonPerishable={this.state.nonPerishable}
              onNonPerishableChange={this.onChangeNonPerishable}
              prepared={this.state.prepared}
              onPreparedChange={this.onChangePrepared}
              foodTypeOther={this.state.foodTypeOther}
              onFoodTypeOtherChange={this.onChangeFoodTypeOther}
              eatOnSite={this.state.eatOnSite}
              onEatOnSiteChange={this.onChangeEatOnSite}
              delivery={this.state.delivery}
              onDeliveryChange={this.onChangeDelivery}
              pickUp={this.state.pickUp}
              onPickUpChange={this.onChangePickUp}
              distributionTypeOther={this.state.distributionTypeOther}
              onDistributionTypeOtherChange={this.onChangeDistributionTypeOther}
              phlaskStatement={this.state.phlaskStatement}
              onPhlaskStatementChange={this.onChangePhlaskStatement}
              normsAndRules={this.state.normsAndRules}
              onNormsAndRulesChange={this.onChangeNormsAndRules}
            />
          )}

          {this.state.formStep === 'addBathroom' && (
            <AddBathroom
              prev={() => this.onChangeFormStep('chooseResource')}
              next={() => this.onChangeFormStep('shareSocials')}
              onSubmit={this.onSubmit}
              onDbConnectionChange={this.onChangeDbConnection}
              onDrop={this.onDrop}
              name={this.state.name}
              onNameChange={this.onNameChange}
              address={this.state.address}
              onAddressChange={this.onChangeAddress}
              onAddressClick={this.onClickAddress}
              website={this.state.website}
              onWebsiteChange={this.onChangeWebsite}
              description={this.state.description}
              onDescriptionChange={this.onChangeDescription}
              entryType={this.state.entryType}
              onEntryTypeChange={this.onChangeEntryType}
              phlaskStatement={this.state.phlaskStatement}
              onPhlaskStatementChange={this.onChangePhlaskStatement}
              normsAndRules={this.state.normsAndRules}
              onNormsAndRulesChange={this.onChangeNormsAndRules}
              accessible={this.state.handicapAccessable}
              onAccessibleChange={this.onChangeHandicapAccess}
              idRequired={this.state.idRequired}
              onIdRequiredChange={this.onChangeIdRequired}
              changingTable={this.state.changingTable}
              onChangeChangingTable={this.onChangeChangingTable}
              genderNeutral={this.state.genderNeutral}
              onChangeGenderNeutral={this.onChangeGenderNeutral}
              familyBathroom={this.state.familyBathroom}
              onChangeFamilyBathroom={this.onChangeFamilyBathroom}
              singleOccupancy={this.state.singleOccupancy}
              onChangeSingleOccupancy={this.onChangeSingleOccupancy}
              hasFountain={this.state.hasFountain}
              onChangeHasFountain={this.onChangeHasFountain}
            />
          )}

          {this.state.formStep === 'addForaging' && (
            <AddForaging
              prev={() => this.onChangeFormStep('chooseResource')}
              next={() => this.onChangeFormStep('shareSocials')}
              onSubmit={this.onSubmit}
              onDbConnectionChange={this.onChangeDbConnection}
              onDrop={this.onDrop}
              name={this.state.name}
              onNameChange={this.onNameChange}
              address={this.state.address}
              onAddressChange={this.onChangeAddress}
              website={this.state.website}
              onWebsiteChange={this.onChangeWebsite}
              description={this.state.description}
              onDescriptionChange={this.onChangeDescription}
              entryType={this.state.entryType}
              onAccessChange={this.onChangeAccess}
              accessible={this.state.handicapAccessable}
              onAccessibleChange={this.onChangeHandicapAccess}
              foragingFoodType={this.state.foragingFoodType}
              onForagingFoodTypeChange={this.onChangeForagingFoodType}
              nut={this.state.nut}
              onNutChange={this.onChangeNut}
              fruit={this.state.fruit}
              onFruitChange={this.onChangeFruit}
              leaves={this.state.leaves}
              onLeavesChange={this.onChangeLeaves}
              bark={this.state.bark}
              onBarkChange={this.onChangeBark}
              flowers={this.state.flowers}
              onFlowersChange={this.onChangeFlowers}
              root={this.state.root}
              onRootChange={this.onChangeRoot}
              phlaskStatement={this.state.phlaskStatement}
              onPhlaskStatementChange={this.onChangePhlaskStatement}
              normsAndRules={this.state.normsAndRules}
              onNormsAndRulesChange={this.onChangeNormsAndRules}
              medicinal={this.state.medicinal}
              onMedicinalChange={this.onChangeMedicinal}
              inSeason={this.state.inSeason}
              onInSeasonChange={this.onChangeInSeason}
              communityGarden={this.state.communityGarden}
              onCommunityGardenChange={this.onChangeCommuntiyGarden}
            />
          )}

          {this.state.formStep === 'shareSocials' && <ShareSocials />}
        </Dialog>

        <button
          onClick={this.handleShow}
          className={`${isMobile ? styles.mobileAddButton : ''} ${
            styles.addButton
          }`}
          data-cy="AddResourceButton"
        >
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </button>
      </>
    );
  }
}

export default AddResourceModal;
