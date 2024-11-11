import React from 'react';
import AppContextProvider from './components/shared/appContext';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';
import Routers from './routers';
import './assets/scss/styles.scss';
import 'suftnet-ui-kit/dist/index.css';
import { FontsStyle } from './assets/fonts';
import store from './redux/store/store';

function App() {

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppContextProvider>
          <FontsStyle />
          <Routers />
        </AppContextProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
