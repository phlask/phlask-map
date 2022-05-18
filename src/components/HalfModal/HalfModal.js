import React from 'react';
import { SwipeableDrawer } from '@mui/material';

export default function HalfModal(props) {

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