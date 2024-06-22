import { Button } from "@mui/material";
import { styled } from "@mui/styles";

const DropLink = styled(Button)(({ theme }) => ({
    color: '#2D3748',
    backgroundColor: 'transparent',
    width: 'fit-content',
    textDecoration: 'none',
    margin: '10px 25px',
    borderRadius: '24px',
    padding: '0 20px',
    fontSize: '16px',
    '& span': {
        borderRadius: '24px'
    },
    '& svg': {
        width: '36px',
        height: '36px',
        margin: '4px 0'
    },
    '&:hover': {
        backgroundColor: '#5286E9',
        color: '#fff'
    },
    '&:nth-child(1):hover svg path': {
        stroke: '#fff',
        fill: '#fff'
    },
    '&:nth-child(2):hover svg path': {
        stroke: '#fff'
    },
    '&:nth-child(3):hover svg path': {
        stroke: '#fff'
    },
    '&:nth-child(4):hover svg path': {
        stroke: '#fff'
    }
}));

export default DropLink;