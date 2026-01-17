import { useQuery } from '@tanstack/react-query';
import { minutesToMilliseconds } from 'date-fns';
import { getContributors } from 'services/db';
import type { Contributor } from 'types/Contributor';
import shuffleArray from 'utils/shuffleArray';

type SelectedContributors = Record<'past' | 'current', Contributor[]>;

const useGetContributorsQuery = () =>
  useQuery({
    queryKey: ['contributors'],
    queryFn: () => getContributors().then(shuffleArray),
    select: data =>
      data.reduce<SelectedContributors>(
        (prev, next) => {
          if (next.is_active) {
            prev.current.push(next);
          } else if (next.is_contributor === 'checked') {
            prev.past.push(next);
          }
          return prev;
        },
        { past: [], current: [] }
      ),
    placeholderData: [],
    staleTime: minutesToMilliseconds(30)
  });

export default useGetContributorsQuery;
