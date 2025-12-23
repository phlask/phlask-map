import { ToolbarContext, type ToolbarModal } from 'contexts/ToolbarContext';
import { useState, type PropsWithChildren } from 'react';

const ToolbarContextProvider = ({ children }: PropsWithChildren) => {
  const [toolbarModal, setToolbarModal] = useState<ToolbarModal | null>(null);

  const toggle = (modal: ToolbarModal) => {
    setToolbarModal(prev => {
      if (prev === modal) {
        return null;
      }

      return modal;
    });
  };

  return (
    <ToolbarContext value={{ toolbarModal, setToolbarModal, toggle }}>
      {children}
    </ToolbarContext>
  );
};

export default ToolbarContextProvider;
