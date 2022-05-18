import styles from "./AddResourceModal.module.scss";
import React, { Component } from "react";
import {
  Modal,
  Button,
  Form,
  OverlayTrigger,
  Popover,
  Accordion
} from "react-bootstrap";
import ImageUploader from "react-images-upload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
// eslint-disable-next-line import/no-unresolved
import ChooseResource from "./ChooseResource";
// eslint-disable-next-line import/no-unresolved
import ShareSocials from "./ShareSocials";
// eslint-disable-next-line import/no-unresolved
import AddFood from "./AddFood";
// eslint-disable-next-line import/no-unresolved
import AddBathroom from "./AddBathroom";
// eslint-disable-next-line import/no-unresolved
import AddForaging from "./AddForaging";
// eslint-disable-next-line import/no-unresolved
import AddWaterTap from "./AddWaterTap";
import { getDatabase, ref, set, onValue } from "firebase/database";

export class AddResourceModal extends Component {
  constructor(props) {
    super(props);
    this.onChangeFormStep = this.onChangeFormStep.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onNameChange = this.onChangeName.bind(this);
    this.onChangeAccess = this.onChangeAccess.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
    this.onChangeTapServiceType = this.onChangeTapServiceType.bind(this);
    this.onChangeTapType = this.onChangeTapType.bind(this);
    this.onChangePhlaskStatement = this.onChangePhlaskStatement.bind(this);
    this.onChangeNormsAndRules = this.onChangeNormsAndRules.bind(this);
    this.onChangeHandicapAccess = this.onChangeHandicapAccess.bind(this);
    this.onChangeIdRequired = this.onChangeIdRequired.bind(this);
    this.onChangeChildrenOnly = this.onChangeChildrenOnly.bind(this);
    this.onChangeWaterVesselNeeded = this.onChangeWaterVesselNeeded.bind(this);
    this.onChangeFiltration = this.onChangeFiltration.bind(this);
    // ADD FOOD MODAL
    this.onChangeConsumptionType = this.onChangeConsumptionType.bind(this);
    this.onChangeFoodType = this.onChangeFoodType.bind(this);
    // ADD FORAGING MODAL FIELDS
    this.onChangeForagingFoodType = this.onChangeForagingFoodType.bind(this);
    // BACKEND
    this.onChangeDbConnection = this.onChangeDbConnection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      pictures: [],
      images: [],
      name: "",
      access: "",
      address: "",
      website: "",
      description: "",
      organization: "",
      tapServiceType: "",
      tapType: "",
      phlaskStatement: "",
      normsAndRules: "",
      filtration: false,
      handicapAccessable: false,
      waterVesselNeeded: false,
      idRequired: false,
      childrenOnly: false,
      dbConnection: "",
      count: 0,
      show: false,
      formStep: "chooseResource",
      // ADD FOOD MODAL FIELDS
      consumptionType: "",
      foodType: "",
      // ADD FORAGING MODAL FIELDS
      foragingFoodType: ""
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
    const submitUrl = "/submit-image?type=" + imageType;

    return fetch(submitUrl)
      .then(response => response.json())
      .then(data => {
        return fetch(data.putURL, {
          method: "PUT",
          headers: {
            "Content-Type": imageFile.type
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

  onChangeAccess(e) {
    this.setState({
      access: e.target.value
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
    console.log("ORGANIZATION CHANGE TO " + e.target.value)
    this.setState({
      organization: e.target.value
    });
  }

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

  onChangeHandicapAccess(e) {
    this.setState({
      handicapAccessable: e.target.checked
    });
  }

  onChangeWaterVesselNeeded(e) {
    this.setState({
      waterVesselNeeded: e.target.checked
    });
  }

  onChangeIdRequired(e) {
    this.setState({
      idRequired: e.target.checked
    });
  }

  onChangeChildrenOnly(e) {
    this.setState({
      childrenOnly: e.target.checked
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

  // ADD FOOD MODAL FIELDS

  onChangeConsumptionType(e) {
    console.log("CONSUMPTION CHANGE TO " + e.target.value)
    this.setState({
      consumptionType: e.target.value
    });
  }

  onChangeFoodType(e) {
    this.setState({
      foodType: e.target.value
    });
  }

  // ADD FORAGING MODAL FIELDS

  onChangeForagingFoodType(e) {
    this.setState({
      foragingFoodType: e.target.value
    });
  }

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
    const database = getDatabase(this.state.dbConnection)
    // this.state.dbConnection
      // .database()
      // .ref("/")
      // .once("value")
      // .then(snapshot => {
    onValue(ref(database, "/"), (snapshot) => {
        for (let item in snapshot.val()) {
          if (snapshot.val()[item].access === "WM") {
            continue;
          }
          if (snapshot.val()[item].active === "N") {
            continue;
          }
          if (snapshot.val()[item].access === "TrashAcademy") {
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
    this.state.pictures.forEach(picture =>
      {upload_promises.push(this.submitImage(picture))}
    );

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
        access: this.state.access,
        address: this.state.address,
        website: this.state.website,
        description: this.state.description,
        organization: this.state.organization,
        // TAP FIELDS
        filtration: this.state.filtration,
        handicap: this.state.handicapAccessable,
        service: this.state.tapServiceType,
        tap_type: this.state.tapType,
        vessel: this.state.waterVesselNeeded,
        // FOOD FIELDS
        food_type: this.state.foodType,
        consumption_type: this.state.consumptionType,
        id_required: this.state.idRequired,
        children_only: this.state.childrenOnly,
        // FORAGING FIELDS
        foraging_food_type: this.state.foragingFoodType,
        // SHARED FIELDS
        statement: this.state.phlaskStatement,
        norms_rules: this.state.normsAndRules
      };

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
      name: "",
      access: "",
      address: "",
      website: "",
      description: "",
      organization: "",
      tapServiceType: "",
      tapType: "",
      phlaskStatement: "",
      normsAndRules: "",
      filtration: false,
      handicapAccessable: false,
      waterVesselNeeded: false,
      idRequired: false,
      childrenOnly: false,
      dbConnection: "",
      count: 0,
      show: false,
      formStep: "chooseResource",
      // ADD FOOD MODAL FIELDS
      consumptionType: "",
      foodType: "",
      // ADD FORAGING MODAL FIELDS
      foragingFoodType: ""
    };
    this.setState(resetState);
  }

  render() {
    return (
      <>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          className={styles.modal}
        >
          {this.state.formStep === "chooseResource" && (
            <ChooseResource setFormStep={this.onChangeFormStep} />
          )}

          {this.state.formStep === "addWaterTap" && (
            <AddWaterTap
              prev={() => this.onChangeFormStep("chooseResource")}
              next={() => this.onChangeFormStep("shareSocials")}
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
              access={this.state.access}
              onAccessChange={this.onChangeAccess}
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
              normsAndRules={this.state.normsAndRules}
              onNormsAndRulesChange={this.onChangeNormsAndRules}
            />
          )}

          {this.state.formStep === "addFood" && (
            <AddFood
              prev={() => this.onChangeFormStep("chooseResource")}
              next={() => this.onChangeFormStep("shareSocials")}
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
              consumptionType={this.state.consumptionType}
              onConsumptionTypeChange={this.onChangeConsumptionType}
              foodType={this.state.foodType}
              onFoodTypeChange={this.onChangeFoodType}
              phlaskStatement={this.state.phlaskStatement}
              onPhlaskStatementChange={this.onChangePhlaskStatement}
              normsAndRules={this.state.normsAndRules}
              onNormsAndRulesChange={this.onChangeNormsAndRules}
            />
          )}

          {this.state.formStep === "addBathroom" && (
            <AddBathroom
              prev={() => this.onChangeFormStep("chooseResource")}
              next={() => this.onChangeFormStep("shareSocials")}
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
              access={this.state.access}
              onAccessChange={this.onChangeAccess}
              phlaskStatement={this.state.phlaskStatement}
              onPhlaskStatementChange={this.onChangePhlaskStatement}
              normsAndRules={this.state.normsAndRules}
              onNormsAndRulesChange={this.onChangeNormsAndRules}
            />
          )}

          {this.state.formStep === "addForaging" && (
            <AddForaging
              prev={() => this.onChangeFormStep("chooseResource")}
              next={() => this.onChangeFormStep("shareSocials")}
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
              access={this.state.access}
              onAccessChange={this.onChangeAccess}
              accessible={this.state.handicapAccessable}
              onAccessibleChange={this.onChangeHandicapAccess}
              foragingFoodType={this.state.foragingFoodType}
              onForagingFoodTypeChange={this.onChangeForagingFoodType}
              phlaskStatement={this.state.phlaskStatement}
              onPhlaskStatementChange={this.onChangePhlaskStatement}
              normsAndRules={this.state.normsAndRules}
              onNormsAndRulesChange={this.onChangeNormsAndRules}
            />
          )}

          {this.state.formStep === "shareSocials" && <ShareSocials />}
        </Modal>

        <button
          onClick={this.handleShow}
          className={`${isMobile ? styles.mobileAddButton : ""} ${
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
