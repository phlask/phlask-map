import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@mui/material/Dialog';
import ChooseResource from './ChooseResource';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { isMobile } from 'react-device-detect';
import styles from './AddResourceModal.module.scss';

const AddResourceModalV2 = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modal}
      >
        <ChooseResource setFormStep={() => {}} />
      </Dialog>
      <button
        onClick={() => setOpen(true)}
        className={`${isMobile ? styles.mobileAddButton : ''} ${
          styles.addButton
        }`}
        data-cy="AddResourceButton"
      >
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </button>
    </>
  );
};

export default AddResourceModalV2;
