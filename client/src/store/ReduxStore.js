import {
   legacy_createStore as createStore,
   applyMiddleware,
   compose,
} from "redux";
import thunk from "redux-thunk"; // import thunk from Redux
import { reducers } from "../reducers"; // import all our Reducers

// Save our states inside the local storage
function saveToLocalStorage(store) {
   try {
      const serializedStore = JSON.stringify(store);
      window.localStorage.setItem("store", serializedStore);
   } catch (e) {
      console.log(e);
   }
}

// Retrieve our states data from the local storage
function loadFromLocalStorage() {
   try {
      const serializedStore = window.localStorage.getItem("store");
      if (serializedStore === null) return undefined;
      return JSON.parse(serializedStore);
   } catch (e) {
      console.log(e);
      return undefined;
   }
}

// Make our "store" available for Redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

// Store
const store = createStore(
   reducers,
   persistedState,
   composeEnhancers(applyMiddleware(thunk))
);

// Everytime there's a change in our Store, it'll be reflected in our local storage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
