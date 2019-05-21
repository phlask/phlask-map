import React, { Component } from 'react'
import './Head.css';
import logo from "./cropped-phlask-text-icon-logo.png"

export class Head extends Component {
  render() {
    return (
      <div>
        <header>
          <div className = "headColumns">
            <a  href = "https://phlask.me/"><img src={logo} alt="Logo" className = "logoImage" /></a>
            <h3><a href = "https://phlask.me/ecosystem/">Phlask EcoSystem</a></h3>
            <a href = "https://phlask.me/find-water/"><h3>Phlask Map</h3></a>
            <a href = "https://phlask.me/share-water/" ><h3>Share Water</h3></a>
            <a href = "https://phlask.me/blog/"><h3>Blog</h3></a>
            <h3>Data</h3>
            <a href= "https://phlask.me/contact/"><h3>Contact</h3></a>
            <div className="search">
									<i class="fa fa-search"></i>
									<span class="title">Site Search</span>
								</div> 
          </div>
        </header>
      </div>
    )
  }
}

export default Head
