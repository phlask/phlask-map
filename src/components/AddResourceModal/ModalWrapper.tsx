import Paper from '@mui/material/Paper';
import useIsMobile from 'hooks/useIsMobile';
import { Modal, SwipeableDrawer } from '@mui/material';
import { type ReactNode } from 'react';
import noop from 'utils/noop';
import { useToolbarContext } from 'contexts/ToolbarContext';

type ModalWrapperProps = {
  children: ReactNode;
  onClose: VoidFunction;
};

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  const isMobile = useIsMobile();
  const { toolbarModal } = useToolbarContext();

  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={toolbarModal === 'contribute'}
        onOpen={noop}
        onClose={onClose}
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
    <Modal
      open={toolbarModal === 'contribute'}
      // We forbid closing the modal on backdrop click or escape
      onClose={noop}
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          borderRadius: '10px'
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
};

export default ModalWrapper;
