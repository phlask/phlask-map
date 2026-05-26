import ResourceRevisionContext from 'contexts/ResourceRevisionContext';
import { type PropsWithChildren, useState, useMemo } from 'react';
import type { ResourceEntry } from 'types/ResourceEntry';

const ResourceRevisionProvider = ({ children }: PropsWithChildren) => {
  const [resourceRevision, setResourceRevision] =
    useState<ResourceEntry | null>(null);

  const value = useMemo(
    () => ({ resourceRevision, setResourceRevision }),
    [resourceRevision, setResourceRevision]
  );

  return (
    <ResourceRevisionContext value={value}>{children}</ResourceRevisionContext>
  );
};

export default ResourceRevisionProvider;
