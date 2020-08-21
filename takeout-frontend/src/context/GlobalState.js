import React, { createContext, useReducer } from 'react';
import { Reducer }  from './AppReducer';

const initialState = {
   cart: [{
      id: 1,
      price: 10.00,
      name: 'pop tart',
   }],
   restaurant: {},
   menuCategories: [{_id: 1, name: 'filler'}],
   activeCategory: {},
   visibleItemCards: [{_id: 1, name: 'filler card', price: 2}],
};

// creating context
// export const GlobalContext = createContext(initialState);
export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
   const [state, dispatch] = useReducer(Reducer, initialState);


   function addToCart(id) {
      dispatch({
         type: 'ADD_TO_CART',
         payload: id,
      });
   }

   return (
      <GlobalContext.Provider value={{state, dispatch}}  >
         {children}
      </GlobalContext.Provider>
   );
}