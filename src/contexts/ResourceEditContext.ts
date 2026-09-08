import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction
} from 'react';
import type { ResourceEntry } from 'types/ResourceEntry';
import noop from 'utils/noop';

type ResourceEditContextValue = {
  resourceEditCandidate: ResourceEntry | null;
  setResourceEditCandidate: Dispatch<SetStateAction<ResourceEntry | null>>;
};

export const ResourceEditContext = createContext<ResourceEditContextValue>({
  resourceEditCandidate: null,
  setResourceEditCandidate: noop
});

export const useResourceEditContext = () => useContext(ResourceEditContext);

export default ResourceEditContext;
