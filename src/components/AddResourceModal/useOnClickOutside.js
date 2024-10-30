import { useEffect } from 'react';

const useOnClickOutside = (ref, callback, exclusions) => {
  useEffect(() => {
    const listener = event => {
      if (
        ref?.current?.contains(event.target) ||
        exclusions?.some(el => el?.contains(event.target))
      ) {
        return;
      }

      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback, exclusions]);
};

export default useOnClickOutside;
