import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { ResourceEntry } from 'types/ResourceEntry';
import noop from 'utils/noop';

type ResourceRevisionContextValue = {
  resourceRevision: ResourceEntry | null;
  setResourceRevision: Dispatch<SetStateAction<ResourceEntry | null>>;
};

export const ResourceRevisionContext = createContext<ResourceRevisionContextValue>({
  resourceRevision: null,
  setResourceRevision: noop
});


export const useResourceRevisionContext = () => useContext(ResourceRevisionContext);

export default ResourceRevisionContext;
