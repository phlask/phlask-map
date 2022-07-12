import styles from './HalfModalInfo.module.scss';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { Button, Collapse } from '@mui/material';
import directionButton from '../images/ArrowElbowUpRight.svg'

function HalfModalInfo(props) {
    
  const [ tags, setTags ] = useState([])
  const [ toggleCollapse, setToggleCollapse ] = useState(false)

  const { imageOfPlace, estWalkTime, selectedPlace } = props;
  // nameOfPlace={this.state.organization}
  // addressOfPlace={this.state.address}
  // estWalkTime={this.state.walkingDuration}
  // iconSrc={this.props.selectedPlace.infoIcon}
  
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

  console.log(selectedPlace)

  const { filtration, handicap, service, sparkling, tap_type, vessel } = props.selectedPlace;

  const  { description, norms_rules } = props.selectedPlace;

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 14,
    color: '#2D3748',
    padding: '2px 5px',
    margin: '2px 5px',
    border: '1px solid #2D3748',
    lineHeight: 1.5,
  });
  


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


  const toggleBtn = () => {
    setToggleCollapse((prev)=> !prev)
}

  return (
<div className={styles.halfInfo}>
        <span className={styles.swipeIcon}></span>
        <img src={imageOfPlace} className={styles.locationImage}  alt='' />
        <div className={styles.mainHalfInfo}>
          { infoIcon && <img src={infoIcon} alt='' /> }
            <div className={styles.mainHalfInfoText}>
                <h2 className={styles.nameOfPlace}>{organization}</h2>
                <p className={styles.addressOfPlace}>{address}</p>
                {/* <p><span className={styles.locationOpen}>Open</span> - Closes 10PM</p> */}
                {props.children}
                <Button variant="contained" disableElevation sx={btnstyle} startIcon={<RightArrow />}>
                  Directions</Button>
                <p className={styles.estWalkTime}>Est. walking time: <span className={styles.walkTime}>{estWalkTime}min</span></p>
            </div>
        </div>

    <button onClick={toggleBtn}>test</button>
    <Collapse in={toggleCollapse} timeout="auto" unmountOnExit>
        <hr/>
        <div className={styles.halfInfoExpand}>
          <div className={styles.tagGroup}>
            {tags.map((tag,  index)=>
                <BootstrapButton size="small" variant="outlined" key={index}>{tag}</BootstrapButton>
            )}
          </div>
        <hr/>
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
