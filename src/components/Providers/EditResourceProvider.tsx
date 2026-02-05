import { EditResourceContext } from 'contexts/EditResourceContext';
import { useState, type PropsWithChildren } from 'react';
import type { ResourceEntry } from 'types/ResourceEntry';

const EditResourceProvider = ({ children }: PropsWithChildren) => {
  const [editingResource, setEditingResource] =
    useState<ResourceEntry | null>(null);

  const startEdit = (resource: ResourceEntry) => {
    setEditingResource(resource);
  };

  const clearEdit = () => {
    setEditingResource(null);
  };

  return (
    <EditResourceContext value={{ editingResource, startEdit, clearEdit }}>
      {children}
    </EditResourceContext>
  );
};

export default EditResourceProvider;
