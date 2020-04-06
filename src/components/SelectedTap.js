import React from 'react'
import { isMobile } from 'react-device-detect'
// import { connect } from 'react-redux'
import './SelectedTap.css'
import sampleImg from './fountain.png'
import accessible from './images/accessible.png'
import filteredBlue from './images/filteredBlue.png'
import privateRestricted from './images/privateRestrictedTap.png'
import privateShared from './images/privateSharedTap.png'
import privateTap from './images/privateTap.png'
// import profileImg1 from './images/profileImg1.jpg'
// import profileImg2 from './images/profileImg2.png'
// import profileImg3 from './images/profileImg3.jpg'
import tapMenu from './images/tapMenu.png'

const tempImages = {
    tapImg: sampleImg,
    infoImages: [
        // privateTap,
        privateRestricted,
        privateTap,
        privateRestricted,
        accessible,
        filteredBlue,
        privateShared],
    // profile: [profileImg1,profileImg2,profileImg3]
}
export class SelectedTap extends React.Component{

    state = {
        isExpanded: false
    }

    expandTap(){
        this.setState({
            isExpanded: true
        })
    }
    
    collapseTap(){
        this.setState({
            isExpanded: false
        })
    }

    render(){
        return(
            <div>

                {this.props.visible
                // Preview
                ?<div id={isMobile ? 'tap-info-container-mobile' :'tap-info-container'}>

                    {/* Expanded View */}

                    {this.state.isExpanded
                    ?<div id='tap-content-expanded'>
                        {/* Location Name */}
                        <h4 id='selected-tap-head'>
                            <div id='tap-organization-name'>
                                {this.props.organization}
                            </div>
                            <div id='tap-menu'>
                                <img id='tap-menu-icon' src={tapMenu} alt=''/>
                            </div>
                        </h4>
                        {/* Main Image */}
                        <div id='tap-info-img-box'>
                            <img id ='tap-info-img'
                                // src={this.props.displayImg}
                                src={tempImages.tapImg}
                                alt=''
                            > 
                            </img>
                        </div>
                        {/* Address */}
                        <div id='tap-info-address-box'>
                            <h5 id='tap-info-address'>
                                {this.props.address}
                            </h5>
                        </div>
                        
                        {/* Icons & Users*/}
                        {/* Receive a list of icons corresponding to the selected tap,
                            as well as the first [4] profile images [shrunken] of users 
                            who've contributed to this tap
                        */}
                        <div id='tap-info-quick-info'>
                            <div id='tap-info-icons-box'>
                                {tempImages.infoImages.map((icon,index) => (
                                    <div className='tap-info-icon' key={index}>
                                        <img className='tap-info-icon-img' src={icon} alt=''></img>
                                    </div>
                                ))}
                            </div>
                            {/* <div id='tap-info-users-box'>
                                <div id='tap-info-users'>
                                {tempImages.profile.map((images, index) => (
                                <div 
                                    className='tap-info-users-icon' 
                                    key={index}
                                    // style={{left: `${index * 20}px`}}
                                    >
                                        <img 
                                            className='tap-info-users-img' 
                                            src={images} 
                                            alt=''
                                        ></img>
                                    </div>
                                ))}
                                </div>
                                <div id='tap-info-other-users'>...12 others</div>
                            </div> */}
                            <div id='tap-info-hours-container'>
                                <div id='tap-info-org-status'>
                                    Open
                                </div>
                            </div>
                        </div>
                        
                        {/* Description */}
                        <div id='tap-info-description-box'>
                            <div id='tap-info-description-expanded'>
                                {/* {this.props.description} */}
                                This place is located downtown, near Wawa at the corner of Broad and Chestnut.
                                There is a gate next to the build ding, the fountain is on the left side of the gate.
                            </div>
                        </div>
                        {/* "More" arrow */}
                    </div>
                    
                    /** Preview **/

                    :<div id='tap-content'>
                        {/* Location Name */}
                        <h4 id='selected-tap-head'>
                            <div id='tap-organization-name'>
                                {this.props.organization}
                            </div>
                            <div id='tap-menu'>
                                <img id='tap-menu-icon' src={tapMenu} alt=''/>
                            </div>
                        </h4>
                        {/* Main Image */}
                        <div id='tap-info-img-box'>
                            <img id ='tap-info-img'
                                // src={this.props.displayImg}
                                src={tempImages.tapImg}
                                alt=''
                            > 
                            </img>
                        </div>
                        {/* Address */}
                        <div id='tap-info-address-box'>
                            <h5 id='tap-info-address'>
                                {this.props.address}
                            </h5>
                        </div>
                        
                        {/* Icons & Users*/}
                        {/* Receive a list of icons corresponding to the selected tap,
                            as well as the first [4] profile images [shrunken] of users 
                            who've contributed to this tap
                        */}
                        <div id='tap-info-quick-info'>
                            <div id='tap-info-icons-box'>
                                {tempImages.infoImages.map((icon,index) => (
                                    <div className='tap-info-icon' key={index}>
                                        <img className='tap-info-icon-img' src={icon} alt=''></img>
                                    </div>
                                ))}
                            </div>
                            {/* <div id='tap-info-users-box'>
                                <div id='tap-info-users'>
                                {tempImages.profile.map((images, index) => (
                                <div 
                                    className='tap-info-users-icon' 
                                    key={index}
                                    // style={{left: `${index * 20}px`}}
                                    >
                                        <img 
                                            className='tap-info-users-img' 
                                            src={images} 
                                            alt=''
                                        ></img>
                                    </div>
                                ))}
                                </div>
                                <div id='tap-info-other-users'>...12 others</div>
                            </div> */}
                            <div id='tap-info-hours-container'>
                                <div id='tap-info-org-status'>
                                    Open
                                </div>
                            </div>
                        </div>
                        
                        {/* Description */}
                        <div id='tap-info-description-box'>
                            <div id='tap-info-arrow-box'>
                                <div id='tap-info-arrow'></div>
                            </div>
                            <div id='tap-info-description'>
                                {/* {this.props.description} */}
                                This place is located downtown, near Wawa at the corner of Broad and Chestnut.
                                There is a gate next to the build ding, the fountain is on the left side of the gate.
                            </div>
                            
                        </div>
                        {/* "More" arrow */}
                        

                    </div>
                    }
                </div>
                :<div></div>
                }

                
            </div>
        )
    }
}

export default SelectedTap