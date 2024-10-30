import { useEffect } from 'react';

/**
 * What it does.
 *
 * @param ref {React.MutableRefObject<Element>} - React Ref pointing to the DOM element we want to track clicks outside of
 * @param callback {(React.SyntheticEvent<Element, Event>) => void} - Callback function that gets called when you click outside
 * @param [exclusions] {Element[]} - List of DOM nodes to exclude from the click handler.
 *
 */
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
