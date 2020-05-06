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
import accessible from './images/accessible.png'
import filteredBlue from './images/filteredBlue.png'
import phlaskGreen from './images/phlaskGreen.png'
import phlaskBlue from './images/phlaskBlue.png'
import phlaskYellow from './images/phlaskYellow.png'
import phlaskRed from './images/phlaskRed.png'
import privateRestricted from './images/privateRestrictedTap.png'
import privateShared from './images/privateSharedTap.png'
import privateTap from './images/privateTap.png'
import tapMenu from './images/tapMenu.png'
import { hours } from './hours.js'

// const hoursList = [
//         '8am-9pm',
//         '8am-9pm',
//         '8am-9pm',
//         '8am-9pm',
//         '8am-9pm',
//         '8am-9pm',
//         '8am-9pm'
// ]

const tempImages = {
    tapImg: sampleImg,
    infoImages: [
        // privateTap,
        phlaskGreen,
        // privateRestricted,
        // privateTap,
        // privateRestricted,
        accessible,
        filteredBlue,
        // privateShared
    ]
}

class SelectedTap extends React.Component{
    refSelectedTap =  React.createRef()
    refContentArea =  React.createRef()

    state = {
                previewHeight: 0,
                infoExpansionStyle: {},
                isDescriptionShown: false,
                isHoursExpanded: false,
                animationSpeed: 600,
                currentDay: null,
                currentHour: '',
                currentMinute: '',
                hoursList: null,
                isOpen: null
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
            console.log('Top')
            this.toggleInfoExpanded(true)
        }else if(direction === 'bottom'){
            console.log('Bottom');
            this.toggleInfoExpanded(false)
        }else if(direction === 'left'){
            console.log('Left');
        }else if(direction === 'right'){
            console.log('Right');
        }
        
    }

    // Handle Times
    
    setCurrentDate(){
        const today = new Date() 
        const currentDay = today.getDay()
        if( (this.props.hours === undefined) ){
            this.setState({
            currentDay: currentDay,
            currentHour: hours.getHourFromMilitary(today.getHours()),
            currentMinute: today.getMinutes(),
            hoursList: null,
            isOpen: null

        })
        
        return
        }
        
        
        this.setState({
            currentDay: currentDay,
            currentHour: hours.getHourFromMilitary(today.getHours()),
            currentMinute: today.getMinutes(),
            hoursList: this.getAllHours(),
            isOpen: hours.checkOpen(this.props.hours[currentDay].open.time, this.props.hours[currentDay].close.time)

        },  ()=>{
                // console.log('Set Current Date: ' + this.props.hours[this.state.currentDay].open.time)
            }
        
        )
    }

    /* Return an array of objects containing Day of the week, open time, 
        and closing time, starting with the current day
     */
    getAllHours(){
        
        const hoursList = []

        this.props.hours.map((orgHours,index)=>{
            const formattedHours = {
                day:  hours.getDays(index),
                open: hours.getSimpleHours(orgHours.open.time),
                close: hours.getSimpleHours(orgHours.close.time)
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

    // Handle Icons
    getIcon(property){

        return
    }
    

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            if(this.props.hours !== undefined){
                console.log(`${hours.getDays(this.props.hours[1].open.day)}: ${this.props.hours[1].open.time}`);      
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
            <div>

                {this.props.showingInfoWindow
                // Preview
                ?<div 
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
                                    <img className='tap-info-icon-img' src={phlaskGreen} alt=''></img>
                                </div>
                            </div>

                            {/* Name & Address */}
                            <div id='org-name-and-address'>
                                <div id='tap-organization-name'>
                                    {this.props.organization}
                                </div>
                                <h5 id='tap-info-address'>
                                    {this.props.address}
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
                                            <div className='tap-hours-list-item'></div>
                                                {this.state.hoursList !== null
                                                    ?`${this.state.hoursList[0].open} - ${this.state.hoursList[0].close}`
                                                    :''
                                                } 
                                        </div>

                                        {/* Current Day Hours */}
                                        <div id='current-hours' onClick={()=>{if(this.props.infoIsExpanded){this.setState({isHoursExpanded: !this.state.isHoursExpanded})}}}>
                                            <div className='tap-hours-list-item'>
                                                {this.state.hoursList !== null
                                                    ?`${this.state.hoursList[0].open} - ${this.state.hoursList[0].close}`
                                                    :''
                                                } 
                                            </div>
                                            <div 
                                                className='hours-dropdown-arrow-container'
                                                style={{width: this.props.infoIsExpanded
                                                    ? '20px'
                                                    : '0'
                                                }}
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
                                {tempImages.infoImages.map((icon,index) => (
                                    <div className='tap-info-icon' key={index}
                                        style={this.props.infoIsExpanded
                                            ?   {width: '4vh',
                                                height: '4vh',
                                                marginTop: '5px'}
                                            : {}
                                        }>
                                        <img className='tap-info-icon-img' src={icon} alt=''></img>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}

                        {this.state.isDescriptionShown
                        ?<div id='tap-info-description-container'>
                            <div id='tap-info-description'>
                            {/* {this.props.description} */}
                            Lorem ipsum dolor sit amet, vix ex modus philosophia. At mei idque noluisse suavitate. Probo reprimique delicatissimi nec ut, diam mandamus te cum. Ad mea bonorum voluptua, ex quo melius fabellas efficiendi. Alii vituperatoribus vix te, per inani disputationi eu, omnium assueverit an has.

No vim verear contentiones, sed et sale nihil dictas. Ad tamquam ornatus explicari est, sea laudem volutpat maiestatis ad. Dicit paulo an eam, id wisi copiosae dissentiunt cum, has malis indoctum eu. Eam et fuisset invenire, in erant nullam liberavisse ius, ut est affert ceteros. Cotidieque neglegentur usu ex, cu nam delectus definitiones, qui eu justo dicit iriure. Qui nibh scripta ne.

Scribentur deterruisset nec ea, meis possit diceret has ut. Inermis legendos sea te. Vis in quando mollis. Ne dolore alterum vim.

Eos tollit adipisci ne, ea euismod oporteat suscipiantur eos. Cu dicant nemore aperiri pro, ex pri ubique verear platonem. Ius ut albucius probatus intellegam, id recteque adipiscing per. Ex augue commune suavitate vis. Pri in pertinax intellegebat.

Vis ei diam ridens saperet, ius ei vitae regione cotidieque. Eam ut liber sapientem, definitiones signiferumque id est, modo essent honestatis ei pro. Senserit urbanitas comprehensam ne est. Vel docendi similique ex, reque mundi percipitur vix no. Vel bonorum delenit admodum te, eos cibo oratio melius et.
                            </div>
                        </div>
                        
                        
                        /** Preview **/

                        :<div id='tap-info-arrow-box' onClick={()=>{this.toggleInfoExpanded(true)}}>
                            <img className='tap-info-arrow' src={arrow} alt=''></img>
                        </div>
                        }
                    </div>
                </div>
                :<div></div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    showingInfoWindow: state.showingInfoWindow,
    infoIsExpanded: state.infoIsExpanded,
    infoWindowIn: state.infoWindowIn,
});
const mapDispatchToProps = { toggleInfoExpanded, toggleInfoWindow, toggleInfoWindowIn };


export default connect(mapStateToProps,mapDispatchToProps)(SelectedTap);