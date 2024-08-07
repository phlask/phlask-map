import { Box, styled } from '@mui/material';
import React from 'react';

const CloseIconBar = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '4px',
    width: '24px',
    height: '2px',
    backgroundColor: '#2D3748',
    borderRadius: '1px',
    transitionDuration: '0.5s',
    transitionProperty: 'transform opacity'
}));

const CloseIcon = props => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '32px',
                height: '32px'
            }}
        >
            <CloseIconBar
                sx={{
                    top: '7px',
                    transform: `translateY(${props.close ? 8 : 0}px) rotate(${props.close ? 45 : 0
                        }deg)`
                }}
            />
            <CloseIconBar
                sx={{
                    top: '15px',
                    transform: `rotate(${props.close ? 45 : 0}deg)`,
                    opacity: `${props.close ? 0 : 1}`
                }}
            />
            <CloseIconBar
                sx={{
                    top: '23px',
                    transform: `translateY(${props.close ? -8 : 0}px) rotate(${props.close ? -45 : 0
                        }deg)`
                }}
            />
        </Box>
    );
};

export default CloseIcon;