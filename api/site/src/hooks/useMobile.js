import { useEffect, useState } from 'react';

const useMobile = () => {
  const [isMobile, setMobile] = useState(false);
  const [md, setMd] = useState(false);
  const [lg, setLg] = useState(false);
  const [xlg, setXlg] = useState(false);
  const [xxlg, setXxlg] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    setMobile(false);
    setMd(false);
    setLg(false);
    setXlg(false);
    if (window.innerWidth <= 760) {
      setMobile(true);
    } else if (window.innerWidth >= 761 && window.innerWidth <= 800) {
      setMd(true);
    }else if (window.innerWidth >= 801 && window.innerWidth <= 1024) {
      setLg(true);
    }else if (window.innerWidth >= 1025 && window.innerWidth <= 1280) {
      setXlg(true);
    }else if (window.innerWidth >= 1280) {
      setXxlg(true);
    }
  };

  return { isMobile, md, lg, xlg, xxlg };
};

export default useMobile;
