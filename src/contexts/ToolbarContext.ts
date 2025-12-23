import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction
} from 'react';
import noop from 'utils/noop';

export type ToolbarModal = 'resource' | 'filter' | 'search' | 'contribute';

type ToolbarContext = {
  toolbarModal: ToolbarModal | null;
  setToolbarModal: Dispatch<SetStateAction<ToolbarModal | null>>;
  toggle: (modal: ToolbarModal) => void;
};

export const ToolbarContext = createContext<ToolbarContext>({
  toolbarModal: null,
  setToolbarModal: noop,
  toggle: noop
});

export const useToolbarContext = () => useContext(ToolbarContext);

export default ToolbarContext;
