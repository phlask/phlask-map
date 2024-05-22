import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

import {
  SET_PHLASK_TYPE,
  SET_TOOLBAR_MODAL,
  TOOLBAR_MODAL_NONE
} from '../../actions/actions';
import styles from './ChooseResource.module.scss';
import { handleGA } from './chooseResourceHelper';

const ResourceItemDesktop = props => {
  const dispatch = useDispatch();

  const switchResourceType = type => {
    handleGA(type);
    dispatch({
      type: SET_PHLASK_TYPE,
      mode: type
    });
    dispatch({
      type: SET_TOOLBAR_MODAL,
      mode: TOOLBAR_MODAL_NONE
    });
  };

  const ResourceIcon = props.largeIcon;
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
        switchResourceType(props.actionLabel);
      }}
    >
      <ResourceIcon className={styles.icon} width="45px" height="45px" />
      <p className={styles.label}>{props.resourceType}</p>
    </Button>
  );
};

export default ResourceItemDesktop;
