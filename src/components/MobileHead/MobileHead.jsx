import React from 'react';
import {
    AppBar,
    IconButton,
    Toolbar,
    Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter.js';
import {
    TOOLBAR_MODAL_FILTER,
    TOOLBAR_MODAL_NONE,
    TOOLBAR_MODAL_SEARCH,
} from '../../actions/actions';
import { HeaderContext } from '../../contexts/HeaderContext';
import Sidebar from '../../components/SideBar/SideBar';
import { ReactComponent as FilterIcon } from '../../components/icons/FilterIcon.svg';
import { ReactComponent as MenuIcon } from '../../components/icons/HamburgerMenu.svg';
import { ReactComponent as PhlaskIcon } from '../../components/icons/PHLASK_v2.svg';
import { ReactComponent as SearchIcon } from '../../components/icons/SearchIcon.svg';

export default function MobileHead(props) {
    const headerContext = React.useContext(HeaderContext);
    const { sidebarOpen, setSidebarOpen, showMapControls, setShowMapControls } = headerContext;
    return (
        <>
            <Sidebar
                open={sidebarOpen}
                setOpenResourceModal={setSidebarOpen}
                showControls={setShowMapControls}
            />
            <AppBar>
                {/* this Toolbar is an MUI template, NOT the Toolbar in the bottom left for desktop */}
                <Toolbar
                    sx={{
                        backgroundColor: '#fff',
                        color: '#fff',
                        boxShadow:
                            '0 1px 0 rgba(0, 0, 0.12, 0.12), 0 1px 0 rgba(0, 0, 0.24, 0.24)',
                        display: 'flex'
                    }}
                >
                    <IconButton
                        onClick={setSidebarOpen}
                        sx={{
                            position: 'relative',
                            left: '-10px',
                            right: '6px'
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" onClick={() => setShowMapControls(true)}>
                        <PhlaskIcon
                            sx={{
                                position: 'relative',
                                top: '-10px'
                            }}
                        />
                    </Link>

                    {showMapControls ? (
                        <Box
                            sx={{
                                position: 'relative',
                                marginLeft: 'auto'
                            }}
                        >
                            <IconButton onClick={() => {
                                if (props.toolbarModal != TOOLBAR_MODAL_SEARCH) {
                                    props.setToolbarModal(TOOLBAR_MODAL_SEARCH);
                                } else {
                                    props.setToolbarModal(TOOLBAR_MODAL_NONE);
                                }
                            }}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton
                                sx={{ marginRight: '-8px' }}
                                onClick={() => {
                                    if (props.toolbarModal != TOOLBAR_MODAL_FILTER) {
                                        props.setToolbarModal(TOOLBAR_MODAL_FILTER);
                                    } else {
                                        props.setToolbarModal(TOOLBAR_MODAL_NONE);
                                    }
                                }}
                            >
                                <FilterIcon />
                            </IconButton>
                        </Box>
                    ) : null}
                </Toolbar>
            </AppBar>
            <Filter />
        </>
    );
}