import ResourceEditContext from 'contexts/ResourceEditContext';
import { type PropsWithChildren, useState, useMemo } from 'react';
import type { ResourceEntry } from 'types/ResourceEntry';

const ResourceRevisionProvider = ({ children }: PropsWithChildren) => {
  const [resourceEditCandidate, setResourceEditCandidate] =
    useState<ResourceEntry | null>(null);

  const value = useMemo(
    () => ({ resourceEditCandidate, setResourceEditCandidate }),
    [resourceEditCandidate, setResourceEditCandidate]
  );

  return <ResourceEditContext value={value}>{children}</ResourceEditContext>;
};

export default ResourceRevisionProvider;
