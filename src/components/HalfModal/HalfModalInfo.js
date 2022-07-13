import styles from './HalfModalInfo.module.scss';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { Button, Collapse,SvgIcon, IconButton } from '@mui/material';
import directionButton from '../images/ArrowElbowUpRight.svg';

// import {ReactComponent as DownArrow} from '../images/CaretDown.svg'
// import {ReactComponent as ThreeDots} from '../images/DotsThree.svg'
// import {ReactComponent as ExportIcon} from '../images/Export.svg'

import { ExportIcon, CaretDown, ThreeDots } from './Icons'

function HalfModalInfo(props) {

  const [ tags, setTags ] = useState([])
  const [ toggleCollapse, setToggleCollapse ] = useState(false)
  const [ pointerPositionY, setPointerPositionY ] = useState(0)

  const { imageOfPlace, estWalkTime, selectedPlace } = props;

  const {organization, address, infoIcon } = selectedPlace;

  const btnstyle =  {
      padding: '6px 20px 6px 25px',
      margin: '10px 0',
      fontSize: 16,
      borderRadius: '8px',
      textTransform: 'none',
      backgroundColor: '#00A5EE',
  }

  const RightArrow = () => {
    return <img src={directionButton} alt='' />
  }
  const { filtration, handicap, service, sparkling, tap_type, vessel } = props.selectedPlace;

  const  { description, norms_rules } = props.selectedPlace;

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    display: 'inline-block',
    wordWrap: 'break-word',
    fontSize: 14,
    color: '#2D3748',
    padding: '5px 7px',
    margin: '0 5px',
    marginBottom: "15px",
    border: '1px solid #2D3748',
    lineHeight: 1.5,
  });
  
  const detectSwipe = e => {
    setPointerPositionY(e.nativeEvent.offsetY)

    if (!toggleCollapse) {
       if (e.nativeEvent.offsetY < pointerPositionY) {
      setToggleCollapse(true)
    }}
  } 

  useEffect(()=> {
      const showTags = () => {
          const shownTags = []
          if (filtration === "yes") {
              shownTags.push("Filtered")
          }
          if (handicap === "yes") {
              shownTags.push("ADA Accessible")
          }
          if (service) {
            shownTags.push(service)
        }
          if (vessel != "yes") {
              shownTags.push("Vessel Needed")
          }

        if (tap_type) {
          shownTags.push(tap_type)
      }
          return shownTags
      }
      setTags(showTags())
  }, [])

  return (
<div className={styles.halfInfo}
      onPointerMove={detectSwipe}>

        {!toggleCollapse &&  <button className={styles.swipeIcon}></button> }
        {toggleCollapse &&  (
          <div>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <SvgIcon component={CaretDown} inheritViewBox />
              </IconButton>
            
            <SvgIcon component={ExportIcon} inheritViewBox />
            <SvgIcon component={ThreeDots} inheritViewBox />
          </div>
        )}
        <img src={imageOfPlace} className={styles.locationImage}  alt='' />
        <div className={styles.mainHalfInfo}>
          { infoIcon && <img src={infoIcon} alt='' /> }
            <div className={styles.mainHalfInfoText}>
                <h2 className={styles.nameOfPlace}>{organization}</h2>
                <p className={styles.addressOfPlace}>{address}</p>
                {props.children}
                <Button variant="contained" disableElevation sx={btnstyle} startIcon={<RightArrow />}>
                  Directions</Button>
                <p className={styles.estWalkTime}>Est. walking time: <span className={styles.walkTime}>{estWalkTime}min</span></p>
            </div>
        </div>

    <Collapse in={toggleCollapse} timeout="auto" unmountOnExit>
        <div className={styles.halfInfoExpand}>
          <div className={styles.tagGroup}>
            <hr className={styles.topDivider}/>
            {tags.map((tag,  index)=>
                <BootstrapButton size="small" variant="outlined" key={index}>{tag}</BootstrapButton>
            )}
            <hr/>
          </div>
          <div className={styles.details}>
            <h3>Description</h3>
            <p>{description ? description : "N/A" }</p>
          </div>
          <div className={styles.details}>
            <h3>PHLASK Statement</h3>
            <p>N/A</p>
          </div>
          <div className={styles.details}>
            <h3>Norms &#38; Rules </h3>
            <p>{norms_rules ? norms_rules : "N/A"}</p>
          </div>
        </div>
    </Collapse>
</div>
  );
}

export default HalfModalInfo;
