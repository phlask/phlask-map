import React from 'react';
import { SvgIcon, IconButton } from '@mui/material';


function ExportIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.75 7.24862L16 2L21.25 7.24862" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 16.0002V2.00391" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 12H25C25.2652 12 25.5196 12.1054 25.7071 12.2929C25.8946 12.4804 26 12.7348 26 13V26C26 26.2652 25.8946 26.5196 25.7071 26.7071C25.5196 26.8946 25.2652 27 25 27H7C6.73478 27 6.48043 26.8946 6.29289 26.7071C6.10536 26.5196 6 26.2652 6 26V13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12H10" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

function CaretDown() {
    return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 12L16 22L6 12" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>)
}

function ThreeDots() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 17.5C16.8284 17.5 17.5 16.8284 17.5 16C17.5 15.1716 16.8284 14.5 16 14.5C15.1716 14.5 14.5 15.1716 14.5 16C14.5 16.8284 15.1716 17.5 16 17.5Z" fill="#2D3748"/>
            <path d="M24 17.5C24.8284 17.5 25.5 16.8284 25.5 16C25.5 15.1716 24.8284 14.5 24 14.5C23.1716 14.5 22.5 15.1716 22.5 16C22.5 16.8284 23.1716 17.5 24 17.5Z" fill="#2D3748"/>
            <path d="M8 17.5C8.82843 17.5 9.5 16.8284 9.5 16C9.5 15.1716 8.82843 14.5 8 14.5C7.17157 14.5 6.5 15.1716 6.5 16C6.5 16.8284 7.17157 17.5 8 17.5Z" fill="#2D3748"/>
        </svg>
    )
}

export { ExportIcon, CaretDown, ThreeDots }