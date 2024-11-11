import { useCallback, useEffect, useState } from 'react';

const useSticky = (height = 100) => {
  const [sticky, setSticky] = useState(false);

  // scroll listener
  const listener = useCallback(() => {     
    if (window.scrollY > height) setSticky(true);
    else setSticky(false);
  }, [height]);

  useEffect(() => {
    if (!window) return;
    window.addEventListener('scroll', listener);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('scroll', listener);
  }, [listener]);

  return sticky;
};

export default useSticky;
