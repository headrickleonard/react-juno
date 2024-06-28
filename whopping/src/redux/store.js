
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  // your reducers
});

const store = createStore(rootReducer);

export default store;
