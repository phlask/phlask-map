import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import FoodOtherFilterIcon from '../icons/FoodOtherFilterIcon';
import FoodSchoolFilterIcon from '../icons/FoodSchoolFilterIcon';
import FoodRecreationFilterIcon from '../icons/FoodRecreationFilterIcon';
import FoodCongregationFilterIcon from '../icons/FoodCongregationFilterIcon';
import styles from '../ResourceMenu/Filter.module.scss';
import {
  OverlayTrigger,
  Popover,
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import {
  setToggleStateFood,
  setFilteredFoodTypes,
  resetFilterFunction
} from '../../actions/actions';
import useIsMobile from 'hooks/useIsMobile';
import { useSelector, useDispatch } from 'react-redux';

export const FoodFilter = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const idRequired = useSelector(
    state => state.filterMarkers.foodFilters.idRequired
  );
  const kidOnly = useSelector(state => state.filterMarkers.foodFilters.kidOnly);
  const openNow = useSelector(state => state.filterMarkers.foodFilters.openNow);
  const accessTypesHidden = useSelector(
    state => state.filterMarkers.foodFilters.accessTypesHidden
  );

  const handleChange = event => {
    if (event.target.id === 'idRequired') {
      dispatch(setToggleStateFood('idRequired', !idRequired));
    } else if (event.target.id === 'kidOnly') {
      dispatch(setToggleStateFood('kidOnly', !kidOnly));
    } else if (event.target.id === 'openNow') {
      dispatch(setToggleStateFood('openNow', !openNow));
    }
  };

  return (
    <OverlayTrigger
      trigger="click"
      key="top"
      placement={isMobile ? 'top' : 'top-end'}
      overlay={
        <Popover
          className={`${styles.filterPopover} ${
            isMobile ? styles.mobilePopover : styles.desktopPopover
          }`}
        >
          <Popover.Body>
            {/* // Legend button filters for tap type */}
            <Row className={styles.buttonRow}>
              <Col>
                <Row className={styles.legendRow}>
                  <button
                    className={
                      accessTypesHidden.includes('Food Site')
                        ? styles.disabledTapButton
                        : styles.tapButton
                    }
                    onClick={() => dispatch(setFilteredFoodTypes('Food Site'))}
                  >
                    OTHER
                    <FoodOtherFilterIcon
                      disabled={accessTypesHidden.includes('Food Site')}
                    />
                  </button>
                </Row>
                <Row className={styles.legendRow}>
                  <button
                    className={
                      accessTypesHidden.includes('School')
                        ? styles.disabledTapButton
                        : styles.tapButton
                    }
                    onClick={() => dispatch(setFilteredFoodTypes('School'))}
                  >
                    SCHOOL
                    <FoodSchoolFilterIcon
                      disabled={accessTypesHidden.includes('School')}
                    ></FoodSchoolFilterIcon>
                  </button>
                </Row>
                <Row className={styles.legendRow}>
                  <button
                    className={
                      accessTypesHidden.includes('Charter School')
                        ? styles.disabledTapButton
                        : styles.tapButton
                    }
                    onClick={() =>
                      dispatch(setFilteredFoodTypes('Charter School'))
                    }
                  >
                    RECREATION
                    <FoodRecreationFilterIcon
                      disabled={accessTypesHidden.includes('Charter School')}
                    ></FoodRecreationFilterIcon>
                  </button>
                </Row>
                <Row className={styles.legendRow}>
                  <button
                    className={
                      accessTypesHidden.includes('PHA Community Center')
                        ? styles.disabledTapButton
                        : styles.tapButton
                    }
                    onClick={() =>
                      dispatch(setFilteredFoodTypes('PHA Community Center'))
                    }
                  >
                    CONGREGATION
                    <FoodCongregationFilterIcon
                      disabled={accessTypesHidden.includes(
                        'PHA Community Center'
                      )}
                    ></FoodCongregationFilterIcon>
                  </button>
                </Row>
              </Col>

              {/* Toggle Switches */}
              <Col>
                <Row className={`${styles.legendRow} ${styles.filterRow}`}>
                  <Form.Check.Label>Open Now</Form.Check.Label>
                  <Form.Check
                    type="switch"
                    id="openNow"
                    label=""
                    checked={openNow}
                    onClick={e => handleChange(e)}
                    readOnly
                  />
                </Row>

                <Row className={`${styles.legendRow} ${styles.filterRow}`}>
                  <Form.Check.Label>ID Required</Form.Check.Label>
                  <Form.Check
                    type="switch"
                    id="idRequired"
                    label=""
                    checked={idRequired}
                    onClick={e => handleChange(e)}
                    readOnly
                  />
                </Row>

                <Row className={`${styles.legendRow} ${styles.filterRow}`}>
                  <Form.Check.Label>Kids Only</Form.Check.Label>
                  <Form.Check
                    type="switch"
                    id="kidOnly"
                    label=""
                    checked={kidOnly}
                    onClick={e => handleChange(e)}
                    readOnly
                  />
                </Row>
              </Col>
            </Row>

            <Row className={styles.resetButtonRow}>
              <Button
                variant="secondary"
                className={styles.resetButton}
                onClick={() => dispatch(resetFilterFunction())}
              >
                Reset
              </Button>
            </Row>
          </Popover.Body>
        </Popover>
      }
    >
      <div>
        <FontAwesomeIcon
          icon={faSlidersH}
          className={styles.filterIcon}
          size="3x"
          color="#999"
        />
      </div>
    </OverlayTrigger>
  );
};

export default FoodFilter;
