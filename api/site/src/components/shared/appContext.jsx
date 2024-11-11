import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMobile from './../../hooks/useMobile';

export const appContext = createContext();
export const useAppContext = () => {
  return React.useContext(appContext);
};

const initialState = {
  token: null,
  currentUser: null,
  aggregate: null,
};

const AppContextProvider = ({ children }) => {
  const { isMobile } = useMobile();
  const [state, setState] = useState({ ...initialState, isMobile });

  useEffect(() => {
    try {
      const user = JSON.parse(window.localStorage.getItem('user')) || {};
      const token = JSON.parse(window.localStorage.getItem('token')) || {};
      const aggregate =
        JSON.parse(window.localStorage.getItem('aggregate')) || [];

      if (user) {
        setState({ token, currentUser: user, ...aggregate });
      }
    } catch (error) {
      console.error('Failed to load state from local storage:', error);
    }
  }, []);

  const action = {
    login: (params) => {
      const { token = {}, user, aggregate = [] } = params;

      if (user) {
        try {
          window.localStorage.setItem('token', JSON.stringify(token));
          window.localStorage.setItem('user', JSON.stringify(user));
          window.localStorage.setItem('aggregate', JSON.stringify(aggregate));

          setState({ token, currentUser: user, ...aggregate });
        } catch (error) {
          console.error('Failed to save state to local storage:', error);
        }
      }
    },

    signOut: () => {
      try {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('aggregate');
        window.localStorage.removeItem('token');
        setState(initialState);
      } catch (error) {
        console.error('Failed to remove state from local storage:', error);
      }
    },

    updateCurrentUser: (currentUser) => {
      setState((prevState) => ({ ...prevState, currentUser }));
      window.localStorage.setItem('user', JSON.stringify(currentUser));
    },

    getAggregateByStatus: (status) => {
      const result = (state.aggregateResults || []).find(
        (j) => j.status === status,
      );
      return result ? result.count : 0;
    },
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
