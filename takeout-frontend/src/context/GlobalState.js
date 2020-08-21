import React, { createContext, useReducer } from 'react';
import { Reducer }  from './AppReducer';

const initialState = {
   cart: [],
   restaurant: {},
   menuCategories: [],
   activeCategory: {},
   visibleItemCards: [],
};

// creating context
// export const GlobalContext = createContext(initialState);
export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
   const [state, dispatch] = useReducer(Reducer, initialState);

   return (
      <GlobalContext.Provider value={{state, dispatch}}  >
         {children}
      </GlobalContext.Provider>
   );
}