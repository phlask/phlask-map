import React, { useState, useEffect } from 'react';
import { SwipeableDrawer, Button, Collapse } from '@mui/material';

export default function SelectedTapMobile(props) {
    return(
        <SwipeableDrawer anchor='bottom'
                open={props.open}
                onOpen={props.onOpen}
                onClose={props.onClose}
                PaperProps={{ square: false }}
                >
            {props.children}
        </SwipeableDrawer>
    )
}