/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { 
  togglePhlaskType, 
  PHLASK_TYPE_WATER, 
  PHLASK_TYPE_FOOD } from '../actions'
import { connect } from 'react-redux'
import Filter from "./Filter";
import FoodFilter from "./FoodFilter";
import TypeToggle from './TypeToggle.js'
import './Toolbar.css'
import phlaskImg from './images/PHLASK Button.png'
import waterImg from './images/waterButton.png'
import foodImg from './images/foodButton.png'
import sliderImg from './images/slider.png'


function Toolbar(props) {

  function switchType(type){
    if(props.phlaskType !== type){
      props.togglePhlaskType(type)
    }
  }
  
  return (
    <div id="toolbar-container">
      <div id='slider-btn'>
        {props.phlaskType === PHLASK_TYPE_WATER 
          ? <Filter/>
          : <FoodFilter/>
        }
      </div>
      <div 
        className='toolbar-item'
        onClick={()=>{switchType(PHLASK_TYPE_WATER)}}
      >
          <img className='img' src={waterImg} alt=''></img>
      </div>
      <div id='phlask-btn'>
        <img className='img' src={phlaskImg} alt=''></img>
      </div>
      <div 
        className='toolbar-item'
        onClick={()=>{switchType(PHLASK_TYPE_FOOD)}}
      >
          <img className='img' src={foodImg} alt=''></img>
      </div>
      {/* <TypeToggle/>
      <Filter /> */}
    </div>
  );
}

const mapStateToProps = state => ({
  phlaskType: state.phlaskType
})

const mapDispatchToProps = { togglePhlaskType, PHLASK_TYPE_FOOD, PHLASK_TYPE_WATER}

export default connect(mapStateToProps,mapDispatchToProps)(Toolbar)