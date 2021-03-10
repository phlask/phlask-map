import styles from "./AddTapModal.module.scss";
import React, { Component } from "react";
import {
  Modal,
  Button,
  Form,
  OverlayTrigger,
  Popover
} from "react-bootstrap";
import ImageUploader from "react-images-upload";
import * as firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import {
  PHLASK_TYPE_WATER,
  PHLASK_TYPE_FOOD
} from "../actions";
import { prod_config, test_config, beta_config } from "../firebase/firebaseConfig";


export class AddFoodTapModal extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeConsumptionOptions = this.onChangeConsumptionOptions.bind(this);
    this.onChangeFoodType = this.onChangeFoodType.bind(this);
    this.onChangeHandicapAccess = this.onChangeHandicapAccess.bind(this);
    this.onChangeIdRequired = this.onChangeIdRequired.bind(this);
    this.onChangeAgeRequirement = this.onChangeAgeRequirement.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
    this.onChangePhlaskStatement = this.onChangePhlaskStatement.bind(this);
    this.onChangeNormsAndRules = this.onChangeNormsAndRules.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      pictures: [],
      images: [],
      address: "",
      city: "",
      consumptionOptions: "",
      foodType: "",
      handicapAccess: "",
      idRequired: "",
      ageRequirement: "",
      website: "",
      description: "",
      organization: "",
      phlaskStatement: "",
      normsAndRules: "",
      dbConnection: "",
      count: 0,
      show: false,
    };
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
    const imageType = imageFile.type
    const submitUrl = "/submit-image?type=" + imageType
    
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
        return data.getURL
      })
    })
    .catch(console.error)
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value
    });
  }

  onChangeConsumptionOptions(e) {
    this.setState({
      consumptionOptions: e.target.value
    });
  }

  onChangeFoodType(e) {
    this.setState({
      foodType: e.target.value
    });
  }

  onChangeHandicapAccess(e) {
    this.setState({
      handicapAccess: e.target.value
    });
  }

  onChangeIdRequired(e) {
    this.setState({
      idRequired: e.target.value
    });
  }

  onChangeAgeRequirement(e) {
    this.setState({
      ageRequirement: e.target.value
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

  connectToFirebase() {

    // Modals connect to the database independently.  Need to find a more elegant solution.
    switch(window.location.hostname) {
      case 'phlask.me':
        return firebase.initializeApp(prod_config, "food_form");
      case 'beta.phlask.me':
        return firebase.initializeApp(beta_config, "food_form");
      default:
        return firebase.initializeApp(test_config, "food_form");    
    }
  }

  getCount() {
    this.state.dbConnection
      .database()
      .ref("/")
      .once("value")
      .then(snapshot => {
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
            count: (prevState.count + 1)
          }));
        }
      });
  }

  componentDidMount() {
    this.setState(
      {
        dbConnection: this.connectToFirebase()
      },
      () => {
        this.getCount();
      }
    );
  }

  onSubmit(e) {

    e.preventDefault();
    var upload_promises = []
    // Upload images
    this.state.pictures.forEach(picture => 
      upload_promises.push(
        this.submitImage(picture)
      )
    )

    Promise.all(upload_promises).then((images) => {
        // All image uploads completed, loading tap record
        const newTapData = {
          images: images,
          address: this.state.address,
          city: this.state.city,
          consumptionOptions: this.state.consumptionOptions,
          foodType: this.state.foodType,
          handicapAccess: this.state.handicapAccess,
          idRequired: this.state.idRequired,
          ageRequirement: this.state.ageRequirement,
          website: this.state.website,
          description: this.state.description,
          organization: this.state.organization,
          handicap: this.state.handicapAcces,
          statement: this.state.phlaskStatement,
          norms_rules: this.state.normsAndRules
        };

        this.state.dbConnection
          .database()
          .ref("/" + (this.state.count + 1).toString())
          .set(newTapData);
    })
  }

  handleShow() {
    this.setState({ show: true });
  }
  
  handleClose() {
    this.setState({ show: false });
  }

  render() {
    const popoverAccess = (
      <Popover id="popover-access">
        <Popover.Title as="h3">Tap Access Types</Popover.Title>
        <Popover.Content>
          <strong>Public</strong> - This tap resides in a public space (e.g. a
          water fountain in a park)
          <br></br>
          <strong>Private</strong> - This tap resides in a private space (e.g.
          inside a retail store or cafe)
        </Popover.Content>
      </Popover>
    );
    const imageGuidlines = (
      <Popover id="imageGuidlines">
        <Popover.Title as="h3">Image Guidlines</Popover.Title>
        <Popover.Content>
          <strong>1.</strong> - Try to capture as much information as possible.
          <br></br>
          <strong>2.</strong> - Try to include as much light in the image as possible.
          <br></br>
          <strong>3.</strong> - Make sure the light source is above and behind you and the object you are photographing.
          <br></br>
          <strong>4.</strong> - No selfies pleaase
        </Popover.Content>
      </Popover>
    );
    return (
      <>
        <Modal 
          show={this.state.show} 
          onHide={this.handleClose}
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Submit a Tap!</Modal.Title>
          </Modal.Header>
            <Form onSubmit={this.onSubmit}>
              <Modal.Body>
                <OverlayTrigger
                  delay={{ show: 500, hide: 400 }}
                  placement="right"
                  overlay={imageGuidlines}
                >
                  <Form.Group controlId="Images" value={this.state.images} onChange={this.onChangeImages}>
                    <Form.Label>
                      <strong>Images</strong>
                    </Form.Label>
                    <ImageUploader
                      withIcon={true}
                      buttonText="Choose images"
                      onChange={this.onDrop}
                      imgExtension={[".jpg", ".png", ".gif"]}
                      maxFileSize={5242880}
                      withPreview={true}
                    />
                  </Form.Group>
                </OverlayTrigger>
                <Form.Group
                  controlId="Address"
                  id="time"
                  label="End Time"
                  type="time"
                  defaultValue="07:30"
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                >
                  <Form.Label>
                    <strong>Address</strong>
                  </Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group
                  controlId="City"
                  value={this.state.city}
                  onChange={this.onChangeCity}
                >
                  <Form.Label>
                    <strong>City</strong>
                  </Form.Label>
                  <Form.Control/>
                </Form.Group>
                <Form.Group
                  controlId="ConsumptionOptions"
                  value={this.state.consumptionOptions}
                  onChange={this.onChangeConsumptionOptions}
                >
                  <Form.Label>
                    <strong>Consumption Options</strong>
                  </Form.Label>
                  <Form.Control         
                    as="select"
                    id="ConsumptionOptions"
                    custom
                  >
                    <option value="Unknown">Choose...</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Take-Away">Take-Away</option>
                    <option value="Unsure">Not Sure</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="Food Type"
                  value={this.state.foodType}
                  onChange={this.onChangeFoodType}
                >
                  <Form.Label>
                    <strong>Food Type</strong>
                  </Form.Label>
                  <Form.Control         
                    as="select"
                    id="FoodType"
                    custom
                  >
                    <option value="Unknown">Choose...</option>
                    <option value="Perishable">Perishable</option>
                    <option value="Non-perishable">Non-perishable</option>
                    <option value="Prepared Foods ">Prepared Foods</option>
                    <option value="Other">Other</option>
                    <option value="Unsure">Not Sure</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="Handicap Access"
                  value={this.state.handicapAccess}
                  onChange={this.onChangeHandicapAccess}
                >
                  <Form.Label>
                    <strong>Handicap Accessible</strong>
                  </Form.Label>
                  <Form.Control         
                    as="select"
                    id="Handicap Acces"
                    custom
                  >
                    <option value="Unknown">Choose...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Unsure">Not Sure</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="ID Required"
                  value={this.state.idRequired}
                  onChange={this.onChangeIdRequired}
                >
                  <Form.Label>
                    <strong>ID Required</strong>
                  </Form.Label>
                  <Form.Control         
                    as="select"
                    id="ID Required"
                    custom
                  >
                    <option value="Unknown">Choose...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Unsure">Not Sure</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="Age Requirement"
                  value={this.state.ageRequirement}
                  onChange={this.onChangeAgeRequirement}
                >
                  <Form.Label>
                    <strong>Age Requirement</strong>
                  </Form.Label>
                  <Form.Control         
                    as="select"
                    id="Age Requirement"
                    custom
                  >
                    <option value="Unknown">Choose...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Unsure">Not Sure</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="Website"
                  value={this.state.website}
                  onChange={this.onChangeWebsite}
                >
                  <Form.Label>
                    <strong>Website</strong>
                  </Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group
                  controlId="Description"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                >
                  <Form.Label>
                    <strong>Description</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="2"
                    placeholder="A brief description of the tap's location and appearance"
                  />
                </Form.Group>

                <Form.Group
                  controlId="Organization"
                  value={this.state.organization}
                  onChange={this.onChangeOrganization}
                >
                  <Form.Label>
                    <strong>Organization</strong>
                  </Form.Label>
                  <Form.Control placeholder="What organization/company does this tap belong to?" />
                </Form.Group>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" onClick={this.handleClose}>
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
        </Modal>

        <button
          onClick={this.handleShow}
          type="button"
          className={`${isMobile ? styles.mobileAddButton : ""} ${
            styles.addButton
          }`}
        >
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </button>
      </>
    );
  }
}

export default AddFoodTapModal;
