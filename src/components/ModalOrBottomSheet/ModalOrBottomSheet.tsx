import type { ReactNode } from 'react';

import Paper from '@mui/material/Paper';
import { Modal, SwipeableDrawer } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import noop from 'utils/noop';

type ModalOrBottomSheetProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose?: VoidFunction;
  shouldHideBackdrop?: boolean;
  shouldCloseOnBackdropClick?: boolean;
};

const ModalOrBottomSheet = ({
  children,
  isOpen,
  onClose = noop,
  shouldHideBackdrop = false,
  shouldCloseOnBackdropClick = false
}: ModalOrBottomSheetProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={isOpen}
        onOpen={noop}
        onClose={onClose}
        hideBackdrop={shouldHideBackdrop}
      >
        <Paper
          sx={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          }}
          elevation={0}
        >
          {children}
        </Paper>
      </SwipeableDrawer>
    );
  }

  return (
    <Modal open={isOpen} onClose={shouldCloseOnBackdropClick ? onClose : noop}>
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

export default ModalOrBottomSheet;
