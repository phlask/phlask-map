import React, {useState} from 'react';
import { SwipeableDrawer, Button, Collapse } from '@mui/material';

export default function HalfModal(props) {

    const [ toggleCollapse, setToggleCollapse ] = useState(false)

    const toggleBtn = () => {
        setToggleCollapse((prev)=> !prev)
    }

    return(
        <SwipeableDrawer anchor='bottom'
                open={props.open}
                onOpen={props.onOpen}
                onClose={props.onClose}
                PaperProps={{ square: false }}
                >
            {props.children}
            <button onClick={toggleBtn}>test</button>
            <Collapse in={toggleCollapse} timeout="auto" unmountOnExit>
                <p>more things to the bottom?</p>
            </Collapse>
        </SwipeableDrawer>
    )
}