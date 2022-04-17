import React from "react";

const ResourceIcon = ({ disabled = false }) => {
return (
    <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
        d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z"
        stroke="#2D3748"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />

    <path
        d="M26 13C26 22 16 29 16 29C16 29 6 22 6 13C6 10.3478 7.05357 7.8043 8.92893 5.92893C10.8043 4.05357 13.3478 3 16 3C18.6522 3 21.1957 4.05357 23.0711 5.92893C24.9464 7.8043 26 10.3478 26 13V13Z"
        stroke="#2D3748"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    </svg>

    );
};

export default ResourceIcon;

