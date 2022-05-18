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
import firebase from "firebase/compat/app";
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
      handicapAccessable: "",
      tapServiceType: "",
      tapType: "",
      waterVessleNeeded: "",
      phlaskStatement: "",
      normsAndRules: "",
      dbConnection: "",
      count: 0,
      show: false
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
      handicapAccessable: e.target.value
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

    switch (window.location.hostname) {
      case "phlask.me":
        return firebase.initializeApp(prod_config, "new");
      case "beta.phlask.me":
        return firebase.initializeApp(beta_config, "new");
      default:
        return firebase.initializeApp(test_config, "new");
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
            count: prevState.count + 1
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
    var upload_promises = [];
    // Upload images
    this.state.pictures.forEach(picture =>
      upload_promises.push(this.submitImage(picture))
    );

    Promise.all(upload_promises).then(images => {
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
        statement: this.state.phlaskStatement,
        norms_rules: this.state.normsAndRules
      };

      this.state.dbConnection
        .database()
        .ref("/" + (this.state.count + 1).toString())
        .set(newTapData);
    });
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

    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Submit a Tap!</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.onSubmit}>
            <Modal.Body>
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

              <Accordion>
                <Accordion.Toggle as={Button} eventKey="0">
                  <h5 style={{ fontSize: "1rem", marginBottom: "10px" }}>
                    Additional Information
                  </h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <div className="additional-info">
                    <Form.Group
                      value={this.state.filtration}
                      onChange={this.onChangeFiltration}
                    >
                      <Form.Label as="legend">
                        <strong>Filtration</strong>
                      </Form.Label>

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Yes"
                        name="FilterRadios"
                        id="FilterRadios1"
                        value="yes"
                      />

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="No"
                        name="FilterRadios"
                        id="FilterRadios2"
                        value="no"
                      />
                    </Form.Group>

                    <Form.Group
                      value={this.state.handicapAccessable}
                      onChange={this.onChangeHandicapAccess}
                    >
                      <Form.Label as="legend">
                        <strong>Handicap Accessible</strong>
                      </Form.Label>

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Yes"
                        name="HandicapRadios"
                        id="HandicapRadios1"
                        value="yes"
                      />

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="No"
                        name="HandicapRadios"
                        id="HandicapRadios2"
                        value="no"
                      />
                    </Form.Group>

                    <Form.Group
                      value={this.state.tapServiceType}
                      onChange={this.onChangeTapServiceType}
                    >
                      <Form.Label as="legend">
                        <strong>Tap Service Type</strong>
                      </Form.Label>

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Self-serve"
                        name="ServiceRadios"
                        id="ServiceRadios1"
                        value="self serve"
                      />

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Ask proprietor"
                        name="ServiceRadios"
                        id="ServiceRadios2"
                        value="ask proprietor"
                      />
                    </Form.Group>

                    <Form.Group
                      value={this.state.tapType}
                      onChange={this.onChangeTapType}
                    >
                      <Form.Label as="legend">
                        <strong>Tap Type</strong>
                      </Form.Label>

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Drinking Foutain"
                        name="TypeRadios"
                        id="TypeRadios1"
                        value="drinking fountain"
                      />

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Bottle filler and fountain"
                        name="TypeRadios"
                        id="TypeRadios2"
                        value="bottle filter and fountain"
                      />

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Sink"
                        name="TypeRadios"
                        id="TypeRadios3"
                        value="sink"
                      />

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Soda fountain"
                        name="TypeRadios"
                        id="TypeRadios4"
                        value="soda fountain"
                      />

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Dedicated water dispenser"
                        name="TypeRadios"
                        id="TypeRadios5"
                        value="dedicated water dispenser"
                      />

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Water cooler"
                        name="TypeRadios"
                        id="TypeRadios6"
                        value="water cooler"
                      />

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Other"
                        name="TypeRadios"
                        id="TypeRadios7"
                        value="other"
                      />
                    </Form.Group>

                    <Form.Group
                      value={this.state.waterVessleNeeded}
                      onChange={this.onChangeWaterVessleNeeded}
                    >
                      <Form.Label as="legend">
                        <strong>Water Vessel Needed</strong>
                      </Form.Label>

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="Yes"
                        name="VesselRadios"
                        id="VesselRadios1"
                        value="yes"
                      />

                      <Form.Check
                        className="radioText"
                        type="radio"
                        label="No"
                        name="VesselRadios"
                        id="VesselRadios2"
                        value="no"
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="Phlask Statement"
                      value={this.state.phlaskStatement}
                      onChange={this.onChangePhlaskStatement}
                    >
                      <Form.Label>
                        <strong>PHLASK Statement</strong>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="2"
                        placeholder="Please use this section to make any statement about your organization or enterprise!"
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="Norms and Rules"
                      value={this.state.normsAndRules}
                      onChange={this.onChangeNormsAndRules}
                    >
                      <Form.Label>
                        <strong>Norms and Rules</strong>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="PHLASKing is intended to be an unobtrusive part of doing business. If there are special norms associated with accessing water, please use this space to describe them."
                      />
                    </Form.Group>
                  </div>
                </Accordion.Collapse>
              </Accordion>

              <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={this.onDrop}
                imgExtension={[".jpg", ".png", ".gif"]}
                maxFileSize={5242880}
                withPreview={true}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleClose}
              >
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
