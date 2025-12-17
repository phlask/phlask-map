import Paper from '@mui/material/Paper';
import useIsMobile from 'hooks/useIsMobile';
import { Modal, SwipeableDrawer } from '@mui/material';
import { TOOLBAR_MODAL_CONTRIBUTE } from 'actions/actions';
import type { ReactNode } from 'react';
import useAppSelector from 'hooks/useSelector';
import noop from 'utils/noop';
import { getToolbarModal } from 'reducers/toolbar';

type ModalWrapperProps = {
  children: ReactNode;
  onExited: VoidFunction;
};

const ModalWrapper = ({ children, onExited }: ModalWrapperProps) => {
  const isMobile = useIsMobile();
  const toolbarModal = useAppSelector(getToolbarModal);

  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={toolbarModal === TOOLBAR_MODAL_CONTRIBUTE}
        onOpen={noop}
        onClose={onExited}
        hideBackdrop
      >
        <Paper
          sx={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          }}
          // This is used to configure the removal of the shadow that would normally appear in this element
          // The shadow is part of the standard MUI styling for Paper elements
          elevation={0}
        >
          {children}
        </Paper>
      </SwipeableDrawer>
    );
  }

  return (
    <Modal open={toolbarModal === TOOLBAR_MODAL_CONTRIBUTE} onClose={noop}>
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          borderRadius: '10px'
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
};

export default ModalWrapper;
