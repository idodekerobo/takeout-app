import * as Actions from './Actions';

export const Reducer = (state, action) => {
   switch (action.type) {
      case Actions.LOAD_MENU: 
         return {
            // do stuff w/ state
            ...state,
            menuCategories: action.payload
         }
      case Actions.GET_ACTIVE_CATEGORY:
         return {
            ...state, 
            activeCategory: action.payload
         }
      case Actions.GET_ITEM_CARDS:
         return {
            ...state, 
            visibleItemCards: action.payload
         }
      case Actions.ADD_TO_CART: 
         return {
            ...state, 
            cart: action.payload
         }
      case Actions.REMOVE_FROM_CART: 
         return {
            ...state, 
            cart: action.payload
         }
      default: 
         return state;
   }
}