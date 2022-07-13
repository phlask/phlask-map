import React from 'react';
import { SvgIcon, IconButton } from '@mui/material';

export default function IconBtn(props) {
    const { component, ariaLabel, onClick } = props
    return ( 
    <IconButton color="primary" aria-label={ariaLabel} component="label" onClick={onClick}>
        <SvgIcon component={component} inheritViewBox />
    </IconButton>
    )
}

