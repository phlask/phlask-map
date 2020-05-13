/* eslint-disable no-console */
import React from 'react'
import ReactTouchEvents from 'react-touch-events'
import { connect } from 'react-redux'
import { toggleInfoExpanded, toggleInfoWindow, toggleInfoWindowIn } from '../actions'
import { isMobile } from 'react-device-detect'
// import { connect } from 'react-redux'
import './SelectedTap.css'
import arrow from './images/arrow.png'
import hoursArrow from './images/hoursArrow.png'
import sampleImg from './fountain.png'
import accessibilityIcon from './images/accessible.png'
import filteredBlue from './images/filteredBlue.png'
import phlaskGreen from './images/phlaskGreen.png'
import phlaskBlue from './images/phlaskBlue.png'
import phlaskYellow from './images/phlaskYellow.png'
import phlaskRed from './images/phlaskRed.png'
import privateRestricted from './images/privateRestrictedTap.png'
import privateShared from './images/privateSharedTap.png'
import privateTap from './images/privateTap.png'
import tempUnverified from './images/tempUnverified.png'
import tapMenu from './images/tapMenu.png'
import { hours } from './hours.js'

const tempImages = {
    tapImg: sampleImg,
}

class SelectedTap extends React.Component{
    refSelectedTap =  React.createRef()
    refContentArea =  React.createRef()

    state = {
                previewHeight: 0,
                infoExpansionStyle: {},
                isDescriptionShown: false,
                tapDescription: null,
                isHoursExpanded: false,
                animationSpeed: 600,
                currentDay: null,
                currentHour: '',
                currentMinute: '',
                hoursList: null,
                currentOrgHours: null,
                isOpen: null,
                organization: this.props.selectedPlace.organization,
                hours: this.props.selectedPlace.hours,
                address: this.props.selectedPlace.address,
                accessible: this.props.selectedPlace.accessible,
                tapIcons: {
                    access: null,
                    accessibility: null,
                    filtered: null
                },
                testIcons: {
                    access: phlaskBlue,
                    accessibility: phlaskGreen
                }
            }

    toggleInfoExpanded(shouldExpand){
        
        if(!shouldExpand){
            // Start animation before unmounting description
            setTimeout(() => {
                this.setState({
                    isDescriptionShown: shouldExpand
                })
            }, this.state.animationSpeed);
            // Close if in preview mode
            if(!this.props.infoIsExpanded){
                this.toggleInfoWindow(false)
            }
            this.setState({
                isHoursExpanded: false
            })
        }else{
            // Unmount the arrow before animation
            this.setState({
                isDescriptionShown: shouldExpand
            })
        }
        // Expand or Collapse
        this.animateInfoExpansion(shouldExpand)        
    }

    toggleInfoWindow(shouldShow){
        this.props.toggleInfoWindowIn(shouldShow)
        // Animate in
        if(shouldShow){
            this.props.toggleInfoWindow(shouldShow)
        }
        // Animate Out
        else{
            setTimeout(() => {
                this.props.toggleInfoWindow(false)
            }, this.state.animationSpeed);
        }
    } 

    animateInfoExpansion(shouldExpand){
        // if(shouldExpand){
        //     this.refContentArea.current.scrollTop = 0
        // }
        this.setState({
            infoExpansionStyle: {
                height: shouldExpand
                    ? '80vh'
                    : '40vh'
            }
        }, ()=>{
            this.props.toggleInfoExpanded(shouldExpand)
        })
    }
    
    handleSwipe(direction){
        if(direction === 'top'){
            // console.log('Top')
            this.toggleInfoExpanded(true)
        }else if(direction === 'bottom'){
            // console.log('Bottom');
            this.toggleInfoExpanded(false)
        }else if(direction === 'left'){
            // console.log('Left');
        }else if(direction === 'right'){
            // console.log('Right');
        }
        
    }

    // Handle Times
    
    setCurrentDate(){
        const today = new Date() 
        const currentDay = today.getDay()
        // if( (this.props.selectedPlace.hours === undefined) ){
        //     this.setState({
        //         currentDay: currentDay,
        //         currentHour: hours.getHourFromMilitary(today.getHours()),
        //         currentMinute: today.getMinutes(),
        //         hoursList: null,
        //         currentOrgHours: null,
        //         isOpen: null

        //     })
        
        //     return
        // }
        
        const selectedPlace = this.props.selectedPlace
        // console.log("Hours Length:" + selectedPlace.hours.length);
        
        this.setState({
            currentDay: currentDay,
            currentHour: hours.getHourFromMilitary(today.getHours()),
            currentMinute: today.getMinutes(),
            hoursList: selectedPlace.hours !== undefined
                ? this.getAllHours()
                : null,
            currentOrgHours: selectedPlace.hours !== undefined
                ? selectedPlace.hours[currentDay] !== undefined
                    ? {
                        open: hours.getSimpleHours(selectedPlace.hours[currentDay].open.time),
                        close: hours.getSimpleHours(selectedPlace.hours[currentDay].close.time)
                    }
                    : null
                : null,
            organization: selectedPlace.organization,
            address: selectedPlace.address,
            isOpen: selectedPlace.hours !== undefined
                ?selectedPlace.hours.length >= currentDay + 1
                    ? hours.checkOpen(
                        selectedPlace.hours[currentDay].open.time, 
                        selectedPlace.hours[currentDay].close.time
                    )
                    : false
                : null,
            tapIcons: this.setTapIcons(),
            tapDescription: selectedPlace.description !== undefined
                        ? selectedPlace.description
                        : null

        })
    }

    /* Return an array of objects containing Day of the week, open time, 
        and closing time, starting with the current day
     */
    getAllHours(){
        const selectedPlace = this.props.selectedPlace

        if(selectedPlace.hours === undefined){
            return null
        }
        else{
            const hoursList = []

            selectedPlace.hours.map((orgHours,index)=>{
                const formattedHours = {
                    day:  hours.getDays(index),
                    open: selectedPlace.hours.open !== undefined
                        ? hours.getSimpleHours(orgHours.open.time)
                        : null,
                    close: selectedPlace.hours.close !== undefined 
                        ? hours.getSimpleHours(orgHours.close.time)
                        : null
                }
                hoursList.push(formattedHours)
            })

            // Shift array so current day is first
            const date = new Date()
            const day = date.getDay()
            for(let x = 0; x < day; x++){
                hoursList.push(hoursList.shift())
            }

            return hoursList
        }
        
    }

    getAccess(){
        if(this.props.selectedPlace.access === undefined || this.props.selectedPlace.access.length === 0){
            console.log('Access is not defined for this entry');
            return null
        }
        else {
            let access = tempUnverified
            switch(this.props.selectedPlace.access){
                case 'Public': access = phlaskBlue
                    break
                case 'Semi-public': access = phlaskGreen
                    break
                case 'Private-Shared': access = phlaskGreen
                    break
                case 'Private': access = phlaskYellow
                    break
                case 'Restricted': access = phlaskRed
                    break
                case 'Unverified': access = tempUnverified
                    break    
                // case 'TrashAcademy': access = trashAcademyIcon
                //     break 
                // case 'Water Monsters': access = waterMonstersIcon
                //     break                       
            }
            return access
        }
    }

    getAccessibility(){
        if(this.props.selectedPlace.handicap === undefined || this.props.selectedPlace.handicap.length === 0){
            // console.log('Handicap access is not defined for this entry');
            return null
        } 
        else {
            let accessibility = null
            switch(this.props.selectedPlace.handicap){
                case 'Yes': accessibility = accessibilityIcon
                    break
                case 'No': 
                    break
                // case 'Unsure': accessibility = accessibilityUnsureIcon
                default: return accessibility
            }
            return accessibility
        }
    }
    
    getFiltration(){
        if(this.props.selectedPlace.filtration === undefined || this.props.selectedPlace.filtration.length === 0){
            // console.log('Filtration is not defined for this entry');
            return null
        } 
        else {
            let filtered = null
            switch(this.props.selectedPlace.filtration){
                case 'Yes': filtered = filteredBlue
                    break
                case 'No': 
                    break
                // case 'Unsure': accessibility = accessibilityUnsureIcon
                default: return filtered
            }
            return filtered
        }
    }

    // Handle Icons
    setTapIcons(){
        const iconList = {
            access: this.getAccess(),
            accessibility: this.getAccessibility(),
            filtered: this.getFiltration()
        }
        
        if(iconList.access !== null){
            // console.log(`Access: ${ typeof (iconList.access)} -- ${this.props.selectedPlace.access}`)
        }
        if(iconList.accessibility !== null){
            // console.log(`Accessible: ${ typeof (iconList.accessibility)} -- ${this.props.selectedPlace.handicap}`);
        }
        
        
        
        return iconList
    }
    

    componentDidUpdate(prevProps){                
        if(this.props.selectedPlace !== prevProps.selectedPlace){
            if(this.props.selectedPlace.hours !== undefined){
                // console.log('Did Update. Props: ' + this.props.selectedPlace);
            }
            this.setCurrentDate()
        }
    }
      
    componentDidMount(){

        this.setCurrentDate()
        
        this.setState({
            previewHeight: this.refSelectedTap.current.clientHeight,
            infoExpansionStyle: {
                height: this.refSelectedTap.current.clientHeight
            }
        })
        
    }

    render(){
        return(
            <div 
                ref={this.refSelectedTap}
                id={isMobile ? 'tap-info-container-mobile' :'tap-info-container'}
                className={this.props.infoWindowIn}
                style={this.state.infoExpansionStyle}
            >
                {/* Drag & Close Area */}
                <ReactTouchEvents onSwipe={this.handleSwipe.bind(this)}>
                    <div id='tap-info-top'>
                        <div id='tap-info-drag-area' onClick={()=>{this.toggleInfoExpanded(false)}}>
                            <div className='drag-bar-dash'></div>
                            <div className='drag-bar-dash'></div>
                        </div>
                        <div id='tap-menu'>
                            <img id='tap-menu-icon' src={tapMenu} alt=''/>
                        </div>
                    </div>
                </ReactTouchEvents>
                

                {/* Placeholder for Fixed Close Area */}
                <div id='tap-info-drag-area-placeholder'>
                    <div id='tap-menu'>
                        <img id='tap-menu-icon' src={tapMenu} alt=''/>
                    </div>
                </div>

                {/* Tap Info */}

                {/* Location Name */}
                <div 
                    ref= {this.refContentArea}
                    id={this.props.infoIsExpanded
                        ? 'tap-content-expanded'
                        : 'tap-content'
                    }
                    >

                    {/* Main Image */}

                    <div id='tap-info-img-box'>
                        <img id ='tap-info-img'
                            // src={this.props.displayImg}
                            src={tempImages.tapImg}
                            alt=''
                        > 
                        </img>
                    </div>

                    <div id='tap-head-info'>
                        {/* Tap Type Icon */}
                        <div id='tap-type-icon-container'>
                            <div id='tap-type-icon'>
                                <img className='tap-info-icon-img' src={this.state.tapIcons.access} alt=''></img>
                            </div>
                        </div>

                        {/* Name & Address */}
                        <div id='org-name-and-address'>
                            <div id='tap-organization-name'>
                                {this.state.organization}
                            </div>
                            <h5 id='tap-info-address'>
                                {this.state.address}
                            </h5>
                        </div>

                        {/* Hours */}
                        <div id='org-hours'>
                            <div id='tap-info-org-status'>
                            {/* Continue Here */}
                                {this.state.isOpen
                                    ? 'Open'
                                    : this.state.isOpen !== null
                                        ? 'Closed'
                                        : 'unavailable'
                                }
                            </div>
                            <div id='hours-area'>

                                {/* Placeholder for Dropdown */}
                                
                                <div id='tap-info-hours-container-placeholder'>
                                    <div className='tap-hours-list-item'>Placeholder</div>
                                    {/* <div className='hours-dropdown-arrow-container' style={{width: this.props.infoIsExpanded ? '20px' : '0' }}>
                                        <img className='hours-dropdown-arrow' src={hoursArrow} alt=''></img>
                                    </div> */}
                                </div>

                                {/* Container of all visible hours elements */}
                                <div id='tap-info-hours-container'>
                                    {/* Placeholder for Dropdown */}
                                    <div id='current-hours-placeholder'>
                                        <div className='tap-hours-list-item'>
                                            {this.state.currentOrgHours !== null
                                                ?`${this.state.currentOrgHours.open} - ${this.state.currentOrgHours.close}`
                                                :''
                                            } 
                                        </div>
                                        <div 
                                            className='hours-dropdown-arrow-container'
                                            style={this.props.infoIsExpanded && this.props.hoursList !== null
                                                    ? {width: '10px',marginLeft: '3px'}
                                                    : {width: '0'}
                                                }                                       
                                            >
                                            <img className='hours-dropdown-arrow' src={hoursArrow} alt=''></img>
                                        </div>
                                            
                                    </div>

                                    {/* Current Day Hours */}
                                    <div id='current-hours' onClick={()=>{if(this.props.infoIsExpanded){this.setState({isHoursExpanded: !this.state.isHoursExpanded})}}}>
                                        <div className='tap-hours-list-item'>
                                            {this.state.currentOrgHours !== null
                                                ?`${this.state.currentOrgHours.open} - ${this.state.currentOrgHours.close}`
                                                :''
                                            } 
                                        </div>
                                        <div 
                                            className='hours-dropdown-arrow-container'
                                            style={this.props.infoIsExpanded && this.props.hoursList !== null
                                                ? {width: '10px',marginLeft: '3px'}
                                                : {width: '0'}
                                            }   
                                        >
                                            <img className='hours-dropdown-arrow' src={hoursArrow} alt=''></img>
                                        </div>
                                    </div>
                                    {/* Other Days */}
                                    {this.state.isHoursExpanded && this.props.infoIsExpanded
                                        ? <div id='other-hours-container'>
                                            {(this.state.hoursList !== null)
                                                ?this.state.hoursList.map((hours,index) => {
                                                    if(index !== 0){
                                                        return <div 
                                                                    className='tap-hours-list-item' 
                                                                    key={index}
                                                                >
                                                                    {`${hours.day} ${hours.open} - ${hours.close}`}
                                                                </div>
                                                    }
                                                })
                                                :<div className='tap-hours-list-item'>n/a</div>
                                        }
                                        </div>
                                        :<div></div>
                                    }

                                </div>
                            </div>
                            
                        </div>
                    </div>
                    {/* Walk Time & Info Icons */}
                    <div id='walk-time-and-icons'
                        style={{flexDirection: this.props.infoIsExpanded
                            ? 'column'
                            : 'row'
                        }}
                    >
                        <div id='tap-info-walk-time'>Estimated Walk Time: 12 mins</div>
                        <div id='tap-info-icons-box'
                            style={this.props.infoIsExpanded
                                ? {width: '100%'}
                                : {}
                            }
                        >
                            {Object.keys(this.state.tapIcons).map((icon,index) => (
                                this.state.tapIcons[icon] !== null
                                    ? <div className='tap-info-icon' key={index}
                                        style={this.props.infoIsExpanded
                                            ?   {width: '4vh',
                                                height: '4vh',
                                                marginTop: '5px'}
                                            : {}
                                        }>
                                        <img 
                                            className='tap-info-icon-img' 
                                            alt=''
                                            src={this.state.tapIcons[icon]} 
                                        ></img>
                                    </div>
                                    :[]
                            ))}
                        </div>
                    </div>

                    {/* Description */}

                    {this.state.isDescriptionShown
                    ?<div id='tap-info-description-container'>
                        <div id='tap-info-description'>
                        {this.state.tapDescription !== null || this.state.tapDescription !== undefined
                            ? this.state.tapDescription.length > 0
                                ? this.state.tapDescription
                                : 'Happy Phlasking'
                            : this.state.organization !== null || this.state.organization !== undefined
                                ? this.state.organization
                                : 'Happy Phlasking'
                        }
                        
                        </div>
                    </div>
                    
                    
                    /** Preview **/

                    :<div id='tap-info-arrow-box' onClick={()=>{this.toggleInfoExpanded(true)}}>
                        <img className='tap-info-arrow' src={arrow} alt=''></img>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    showingInfoWindow: state.showingInfoWindow,
    infoIsExpanded: state.infoIsExpanded,
    infoWindowIn: state.infoWindowIn,
    selectedPlace: state.selectedPlace
});
const mapDispatchToProps = { toggleInfoExpanded, toggleInfoWindow, toggleInfoWindowIn };


export default connect(mapStateToProps,mapDispatchToProps)(SelectedTap);