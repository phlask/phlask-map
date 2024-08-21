import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  resetFilterFunction,
  setResourceType,
  setToolbarModal,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE
} from '../../actions/actions';
import useOnClickOutside from '../AddResourceModal/useOnClickOutside';
import styles from './ChooseResourceType.module.scss';

const DesktopResourceButton = props => {
  const dispatch = useDispatch();
  const Icon = props.desktopIcon;
  return (
    <Button
      sx={{
        margin: '12px',
        backgroundColor: props.color,
        '&:hover': { backgroundColor: props.color },
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '5px',
        placeItems: 'center',
        borderRadius: '8px'
      }}
      onClick={() => {
        dispatch(resetFilterFunction());
        dispatch(setResourceType(props.type));
      }}
      data-cy={props['data-cy']}
    >
      <Icon className={styles.icon} width="45px" height="45px" />
      <p className={styles.label}>{props.textLabel}</p>
    </Button>
  );
};

function DesktopChooseResourceType(props) {
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const ref = useRef(null);

  const handleClickOutside = () => {
    if (toolbarModal === TOOLBAR_MODAL_RESOURCE) {
      dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      <Paper
        sx={{
          position: 'absolute',
          left: '32px',
          bottom: '133px',
          width: '686px',
          borderRadius: '10px'
        }}
        ref={ref}
      >
        <Collapse
          in={toolbarModal === TOOLBAR_MODAL_RESOURCE}
          orientation="vertical"
          timeout="auto"
        >
          <Box sx={{ padding: '40px' }}>
            <Box>
              <h1 className={styles.header}>Show Resource Type</h1>
              <p className={styles.description}>
                Choose the type of resource you
                <br />
                would like to see on screen
              </p>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {props.resourceTypeInfo.map(entry => (
                <DesktopResourceButton
                  key={entry.type}
                  {...entry}
                  data-cy={`button-${entry.type}-data-selector`}
                />
              ))}
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </>
  );
}

export default DesktopChooseResourceType;
