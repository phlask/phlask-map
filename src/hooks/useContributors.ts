import { useQuery } from '@tanstack/react-query';
import { getContributors } from 'db';
import type { Contributor } from 'types/Contributor';
import shuffleArray from 'utils/shuffleArray';

type SelectedContributors = Record<'past' | 'current', Contributor[]>;

const useContributors = () =>
  useQuery({
    queryKey: ['contributors'],
    queryFn: () => getContributors().then(shuffleArray),
    select: data =>
      data.reduce<SelectedContributors>(
        (prev, next) => {
          if (next.is_active) {
            prev.current.push(next);
          } else {
            prev.past.push(next);
          }
          return prev;
        },
        { past: [], current: [] }
      ),
    initialData: [],
    staleTime: 1000 * 60 * 30 // 30 minutes
  });

export default useContributors;
