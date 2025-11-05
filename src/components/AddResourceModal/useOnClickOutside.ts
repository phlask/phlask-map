import { useEffect, type RefObject } from 'react';

/**
 * What it does.
 *
 * @param ref {React.MutableRefObject<Element>} - React Ref pointing to the DOM element we want to track clicks outside of
 * @param callback {(React.SyntheticEvent<Element, Event>) => void} - Callback function that gets called when you click outside
 * @param [exclusions] {Element[]} - List of DOM nodes to exclude from the click handler.
 *
 */
const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: (event: MouseEvent | TouchEvent) => void,
  exclusions: (Element | null)[]
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (
        ref?.current?.contains(event.target) ||
        exclusions?.some(el => {
          if (!(event.target instanceof Node)) {
            return false;
          }

          return el?.contains(event.target);
        })
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
