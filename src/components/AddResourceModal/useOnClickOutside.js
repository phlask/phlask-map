import { useEffect } from "react";

const useOnClickOutside = (ref, callback) => {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
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
    }, [ref, callback]);
  };
  
  export default useOnClickOutside;