import styles from "./AddTapModal.module.scss";
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
import * as firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";

export class AddTapModal extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAccessToTap = this.onChangeAccessToTap.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
    this.onChangeFiltration = this.onChangeFiltration.bind(this);
    this.onChangeHandicapAccess = this.onChangeHandicapAccess.bind(this);
    this.onChangeTapServiceType = this.onChangeTapServiceType.bind(this);
    this.onChangeTapType = this.onChangeTapType.bind(this);
    this.onChangeWaterVessleNeeded = this.onChangeWaterVessleNeeded.bind(this);
    this.onChangeSparkling = this.onChangeSparkling.bind(this);
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
      description: "",
      accessToTap: "",
      organization: "",
      filtration: "",
      handicapAccess: "",
      tapServiceType: "",
      tapType: "",
      waterVessleNeeded: "",
      sparkling: "",
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

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeAccessToTap(e) {
    this.setState({
      accessToTap: e.target.value
    });
  }

  onChangeOrganization(e) {
    this.setState({
      organization: e.target.value
    });
  }

  onChangeFiltration(e) {
    this.setState({
      filtration: e.target.value
    });
  }

  onChangeHandicapAccess(e) {
    this.setState({
      handicapAccess: e.target.value
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

  onChangeWaterVessleNeeded(e) {
    this.setState({
      waterVessleNeeded: e.target.value
    });
  }

  onChangeSparkling(e) {
    this.setState({
      sparkling: e.target.value
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
    const prod_config = {
      apiKey: "AIzaSyA2E1tiV34Ou6CJU_wzlJtXxwATJXxi6K8",
      authDomain: "phlask-web-map-new-taps.firebaseapp.com",
      databaseURL: "https://phlask-web-map-new-taps.firebaseio.com",
      projectId: "phlask-web-map-new-taps",
      storageBucket: "phlask-web-map-new-taps.appspot.com",
      messagingSenderId: "673087230724",
      appId: "1:673087230724:web:2545788342843cccdcf651"
    };

    const beta_config = {
      apiKey: "AIzaSyA1dTfOeX5aXeHViJqiV-mT2iFUaasRcZc",
      authDomain: "phlask-web-map.firebaseapp.com",
      databaseURL: "https://phlask-web-map-beta-new.firebaseio.com/",
      projectId: "phlask-web-map",
      storageBucket: "phlask-web-map.appspot.com",
      messagingSenderId: "428394983826",
      appId: "1:428394983826:web:b81abdcfd5af5401e0514b"
    };
    
    const test_config = {
      apiKey: "AIzaSyA1dTfOeX5aXeHViJqiV-mT2iFUaasRcZc",
      authDomain: "phlask-web-map.firebaseapp.com",
      databaseURL: "https://phlask-web-map-test-new.firebaseio.com/",
      projectId: "phlask-web-map",
      storageBucket: "phlask-web-map.appspot.com",
      messagingSenderId: "428394983826",
      appId: "1:428394983826:web:b81abdcfd5af5401e0514b"
    };

    // Modals connect to the database independently.  Need to find a more elegant solution.
    switch(window.location.hostname) {
      case 'phlask.me':
        return firebase.initializeApp(prod_config, "water");
      case 'beta.phlask.me':
        return firebase.initializeApp(beta_config, "water");
      default:
        return firebase.initializeApp(test_config, "water");    
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
          description: this.state.description,
          access: this.state.accessToTap,
          organization: this.state.organization,
          filtration: this.state.filtration,
          handicap: this.state.handicapAccessable,
          service: this.state.tapServiceType,
          tap_type: this.state.tapType,
          vessel: this.state.waterVessleNeeded,
          sparkling: this.state.sparkling,
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
        <Modal show={this.state.show} onHide={this.handleClose}>
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
                controlId="Access Type"
                value={this.state.accessType}
                onChange={this.onChangeAccessType}
              >
                <Form.Label>
                  <strong>Access Type</strong>
                </Form.Label>
                <Form.Control         
                  as="select"
                  id="AccessType"
                  custom
                >
                  <option value="Unknown">Choose...</option>
                  <option value="Self-Serve">Self-Serve</option>
                  <option value="Ask Proprietor">Ask Proprietor</option>
                  <option value="Unsure">Not Sure</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="Tap Type"
                value={this.state.tapType}
                onChange={this.onChangeTapType}
              >
                <Form.Label>
                  <strong>Tap Type</strong>
                </Form.Label>
                <Form.Control         
                  as="select"
                  id="TapType"
                  custom
                >
                  <option value="Unknown">Choose...</option>
                  <option value="Drinking Fountain">Drinking Fountain</option>
                  <option value="Bottle Filler">Bottle Filler</option>
                  <option value="Bottle Filler and Fountain ">Bottle Filler & Fountain</option>
                  <option value="Sink">Sink</option>
                  <option value="Soda Fountain">Soda Fountain</option>
                  <option value="Dedicated Water Dispenser">Dedicated Water Dispenser</option>
                  <option value="Water Cooler">Water Cooler</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="Water Vessel Needed"
                value={this.state.waterVessleNeeded}
                onChange={this.onChangeWaterVessleNeeded}
              >
                <Form.Label>
                  <strong>Water Vessel Needed</strong>
                </Form.Label>
                <Form.Control         
                  as="select"
                  id="WaterVesselNeeded"
                  custom
                >
                  <option value="Unknown">Choose...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Unsure">Not Sure</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="Sparkling"
                value={this.state.sparkling}
                onChange={this.onChangeSparkling}
              >
                <Form.Label>
                  <strong>Sparkling</strong>
                </Form.Label>
                <Form.Control         
                  as="select"
                  id="Sparkling"
                  custom
                >
                  <option value="Unknown">Choose...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Unsure">Not Sure</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="Filtration"
                value={this.state.Filtration}
                onChange={this.onChangeFiltration}
              >
                <Form.Label>
                  <strong>Filtration</strong>
                </Form.Label>
                <Form.Control         
                  as="select"
                  id="Filtration"
                  custom
                >
                  <option value="Unknown">Choose...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Unsure">Not Sure</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="Handicap Access"
                value={this.state.handicapAccess}
                onChange={this.onChangehandicapAccess}
              >
                <Form.Label>
                  <strong>Handicap Accessible</strong>
                </Form.Label>
                <Form.Control         
                  as="select"
                  id="Handicap Access"
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
              <OverlayTrigger
                delay={{ show: 500, hide: 400 }}
                placement="right"
                overlay={popoverAccess}
              >
                <Form.Group
                  value={this.state.accessToTap}
                  onChange={this.onChangeAccessToTap}
                >
                  <Form.Label as="legend">
                    <strong>Access to Tap</strong>
                  </Form.Label>

                  <Form.Check
                    className="radioText"
                    type="radio"
                    label="Public"
                    name="AccessRadios"
                    id="AccessRadio1"
                    value="public"
                  />

                  <Form.Check
                    className="radioText"
                    type="radio"
                    label="Private"
                    name="AccessRadios"
                    id="AccessRadio2"
                    value="private"
                  />
                </Form.Group>
              </OverlayTrigger>

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

export default AddTapModal;
