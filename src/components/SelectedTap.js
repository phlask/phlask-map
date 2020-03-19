import React from 'react'
// import { isMobile } from 'react-device-detect'
// import { connect } from 'react-redux'
import './SelectedTap.css'
import sampleImg from './fountain.png'

export class SelectedTap extends React.Component{

    render(){
        return(
            <div>

                <div id='tap-info-container'>
                    <div id='tap-content'>
                        {/* Main Image */}
                        <div id='tap-info-img-box'>
                            <div id ='tap-info-img'
                                // src={this.props.displayImg}
                                src={sampleImg}
                            > 
                            </div>
                        </div>
                        {/* Address */}
                        <div id='tap-info-address-box'>
                            <div id='tap-info-address'>
                                {this.props.address}
                            </div>
                        </div>
                        
                        {/* Icons & Users*/}
                        {/* Receive a list of icons corresponding to the selected tap,
                            as well as the first [4] profile images [shrunken] of users 
                            who've contributed to this tap
                        */}
                        <div id='tap-info-icons-and-users'>
                            <div id='tap-info-icons-box'>
                                {/* {this.props.icons.map((icon) => {
                                    <image className='tap-info-icon' src={icon}></image>
                                })} */}
                            </div>
                            <div id='tap-info-users-box'>
                                <div id='tap-info-users'>
                                {/* {this.props.profileImages.map((images) => {
                                    <image className='tap-info-icon' src={images}></image>
                                })} */}
                                </div>
                            </div>
                        </div>
                        
                        {/* Description */}
                        <div id='tap-info-description-box'>
                            <div id='tap-infodescription'>
                                {this.props.description}
                            </div>
                        </div>
                        {/* "More" arrow */}
                        <div id='tap-info-arrow-box'>
                            <div id='tap-info-arrow'></div>
                        </div>

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