import { configureStore } from '@reduxjs/toolkit';
import reducers from '../reducers';

const store = configureStore({
  reducer: reducers,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../reducers', () => {
    const rootReducer = reducers;
    store.replaceReducer(rootReducer);
  });
}

export default store;
