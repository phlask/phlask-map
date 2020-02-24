import React from "react";
import icon from "./icons8-filter-mod.png";
import "./Filter.css";

export default function Filter() {
  return (
    <div>
      <img
        src={icon}
        alt="filterImg"
        className="filterIcon"
        //   onClick={this.display}
      />
    </div>
  );
}
