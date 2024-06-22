import React from 'react';
import { Box, IconButton, Paper, Collapse, Button } from '@mui/material';
import CloseIcon from '../../components/icons/CloseIcon';
import { ReactComponent as PhlaskIcon } from '../../components/icons/PHLASK_v2.svg';
import { ReactComponent as PhlaskNoTextIcon } from '../../components/icons/PhlaskNoText.svg';
import { ReactComponent as UsersIcon } from '../../components/icons/UsersIcon.svg';
import { ReactComponent as IDIcon } from '../../components/icons/ModalIDRequired.svg';
import { ReactComponent as FilterIcon } from '../../components/icons/FilterIcon.svg';
import { ReactComponent as SearchIcon } from '../../components/icons/SearchIcon.svg';
import { HeaderContext } from '../../contexts/HeaderContext';
import DropLink from '../../components/Buttons/DropLink';
import {
    TOOLBAR_MODAL_FILTER,
    TOOLBAR_MODAL_NONE,
    TOOLBAR_MODAL_SEARCH,
} from '../../actions/actions';

export const DesktopHead = (props) => {
    const headerContext = React.useContext(HeaderContext);
    const {
        shownPage,
        menuClicked,
        toggleMenuExpand,
        menuExpand,
        setShowMapControls,
        showMapControls,
        pageExpand,
        verticalAnimFinished1,
        verticalAnimFinished2,
        setVerticalAnimFinished1,
        setVerticalAnimFinished2,
    } = headerContext;
    return (
        <Box
            sx={{
                backgroundColor: 'transparent',
                position: 'absolute',
                maxWidth: '100%',
                zIndex: '9',
                margin: '25px auto 0 25px'
            }}
        >
            <Paper
                sx={{
                    display: 'grid',
                    gridAutoRows: 'min-content',
                    gridTemplateColumns: '310px 1fr',
                    borderRadius: '10px'
                }}
            >
                <Box sx={{ height: 'fit-content' }}>
                    <Box width={310}>
                        <IconButton
                            sx={{
                                margin: '15px'
                            }}
                            onClick={toggleMenuExpand}
                            data-cy="head-sidebar-button"
                        >
                            <CloseIcon close={menuExpand} />
                        </IconButton>
                        <Button
                            href="/"
                            sx={{
                                margin: '15px'
                            }}
                            onClick={() => setShowMapControls(true)}
                        >
                            <PhlaskIcon
                                sx={{
                                    position: 'relative',
                                    top: '-10px'
                                }}
                            />
                        </Button>
                    </Box>
                    <Collapse
                        in={pageExpand}
                        timeout="auto"
                        onEntered={() => {
                            if (pageExpand) {
                                setVerticalAnimFinished1(true);
                            }
                        }}
                    >
                        <Box sx={{ height: '50px' }}></Box>
                    </Collapse>
                    <Collapse in={menuExpand} timeout="auto">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <DropLink
                                onClick={() => menuClicked('about')}
                                startIcon={<PhlaskNoTextIcon />}
                                data-cy="sidebar-about-button"
                            >
                                About
                            </DropLink>
                            <DropLink
                                onClick={() => menuClicked('join')}
                                startIcon={<UsersIcon />}
                                data-cy="sidebar-jointeam-button"
                            >
                                Join the team
                            </DropLink>
                            <DropLink
                                onClick={() => menuClicked('contact')}
                                startIcon={<IDIcon />}
                                data-cy="sidebar-contact-button"
                            >
                                Contact
                            </DropLink>
                        </Box>
                    </Collapse>
                    <Collapse
                        in={pageExpand}
                        timeout="auto"
                        onEntered={() => {
                            if (pageExpand) {
                                setVerticalAnimFinished2(true);
                            }
                        }}
                    >
                        <Box
                            sx={{
                                height:
                                    'calc(100vh - 50px - 25px - 274px - 76px - 32px - 25px)'
                            }}
                        ></Box>
                    </Collapse>
                </Box>
                <Collapse orientation="horizontal" in={pageExpand} timeout="auto">
                    <Box
                        sx={{
                            width: 'min(900px, calc(100vw - 25px - 25px - 310px))',
                            padding: '25px'
                        }}
                    >
                        {verticalAnimFinished1 && verticalAnimFinished2 && shownPage}
                    </Box>
                </Collapse>
            </Paper>
        </Box>
    );
}