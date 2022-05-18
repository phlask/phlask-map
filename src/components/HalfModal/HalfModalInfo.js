import styles from './HalfModalInfo.module.scss';
import React from 'react';
import { Button } from '@mui/material';
import locationImage from '../images/phlask-tessellation@2x.png';
import waterButton from '../images/waterButton.png';

function HalfModalInfo(props) {

  const {nameOfPlace, addressOfPlace, imageOfPlace, estWalkTime} = props;

  const btnstyle =  {
      padding: '2px 10px',
      margin: 1,
      fontSize: 11.67,
      borderRadius: '8px',
      textTransform: 'none',
      backgroundColor: '#00A5EE',
  }

  return (
    <div className={styles.halfInfo}>
        <span className={styles.swipeIcon}></span>
        <img src={locationImage} className={styles.locationImage}  alt='' />
        <div className={styles.mainHalfInfo}>
        <img src={waterButton} alt='' />
            <div className={styles.mainHalfInfoText}>
                <h2 className={styles.nameOfPlace}>{nameOfPlace}</h2>
                <p className={styles.addressOfPlace}>{addressOfPlace}</p>
                {/* <p><span className={styles.locationOpen}>Open</span> - Closes 10PM</p> */}
                {props.children}
                <Button variant="contained" disableElevation sx={btnstyle}>
                  Directions</Button>
                <p>Est. walking time: <span className={styles.walkTime}>{estWalkTime}min</span></p>
            </div>
        </div>
    </div>
  );
}

export default HalfModalInfo;