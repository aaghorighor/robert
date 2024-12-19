import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMobile from './../../hooks/useMobile';

export const appContext = createContext();
export const useAppContext = () => {
  return React.useContext(appContext);
};

const initialState = {

};

const AppContextProvider = ({ children }) => {
  const { isMobile } = useMobile();
  const [state, setState] = useState({ ...initialState, isMobile });

   const action = {
    

  
  };

  return (
    <appContext.Provider value={{ ...action, ...state }}>
      {children}
    </appContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AppContextProvider;
