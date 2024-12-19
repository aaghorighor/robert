import React from 'react';
import AppContextProvider from './components/shared/appContext';
import { Provider } from 'react-redux';
import Routers from './routers';
import './assets/scss/styles.scss';
import 'suftnet-ui-kit/dist/index.css';
import { FontsStyle } from './assets/fonts';
import store from './redux/store/store';

function App() {

  return (
    <Provider store={store}>
      <AppContextProvider>
        <FontsStyle />
        <Routers />
      </AppContextProvider>
    </Provider>
  );
}

export default App;
