import { createContext, useContext } from 'react';
import type { ResourceEntry } from 'types/ResourceEntry';

type EditResourceContextValue = {
  editingResource: ResourceEntry | null;
  startEdit: (resource: ResourceEntry) => void;
  clearEdit: () => void;
};

export const EditResourceContext = createContext<EditResourceContextValue>({
  editingResource: null,
  startEdit: () => {},
  clearEdit: () => {}
});

export const useEditResourceContext = () => useContext(EditResourceContext);
