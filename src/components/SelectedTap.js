import React from 'react'
// import { isMobile } from 'react-device-detect'
// import { connect } from 'react-redux'
import './SelectedTap.css'
import sampleImg from './fountain.png'
import accessible from './images/accessible.png'
import filteredBlue from './images/filteredBlue.png'
import privateRestricted from './images/privateRestrictedTap.png'
import privateShared from './images/privateSharedTap.png'
import privateTap from './images/privateTap.png'
import profileImg1 from './images/profileImg1.jpg'
import profileImg2 from './images/profileImg2.png'
import profileImg3 from './images/profileImg3.jpg'

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
    profile: [profileImg1,profileImg2,profileImg3]
}
export class SelectedTap extends React.Component{

    render(){
        return(
            <div>

                <div id='tap-info-container'>
                    <div id='tap-content'>
                        {/* Location Name */}
                        <h4 id='tap-organization-name'>
                            {this.props.organization}
                        </h4>
                        {/* Main Image */}
                        <div id='tap-info-img-box'>
                            <image id ='tap-info-img'
                                // src={this.props.displayImg}
                                src={tempImages.tapImg}
                            > 
                            </image>
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
                                        <image className='tap-info-icon-img' src={icon}></image>
                                    </div>
                                ))}
                            </div>
                            <div id='tap-info-users-box'>
                                <div id='tap-info-users'>
                                {tempImages.profile.map((images, index) => (
                                   <div 
                                    className='tap-info-users-icon' 
                                    key={index}
                                    // style={{left: `${index * 20}px`}}
                                    >
                                        <image 
                                            className='tap-info-users-img' 
                                            src={images} 
                                        ></image>
                                    </div>
                                ))}
                                </div>
                                <div id='tap-info-other-users'>...12 others</div>
                            </div>
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
                </div>

                {/* <h4 className="infoWindow">
                {this.props.organization}
                </h4>
                <h5>{this.props.address}</h5> */}
            </div>
        )
    }
}

export default SelectedTap