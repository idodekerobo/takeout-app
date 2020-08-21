import React, { Component, useContext } from 'react';
import './TakeoutOrderApp.css';
import * as api from './api';
import NavComponent from './NavComponent';
import Menu from './Menu';
import Cart from './Cart';
import MenuEditor from './MenuEditor'

import { Container, Row, Col } from 'shards-react';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";

import { GlobalContext } from './context/GlobalState';
import * as Actions from './context/Actions';

const TAX_RATE = .028;

function roundTo(n, digits) {
   if (digits === undefined) {
      digits = 0;
   }

   var multiplicator = Math.pow(10, digits);
   n = parseFloat((n * multiplicator).toFixed(11));
   return Math.round(n)/multiplicator;
}

class TakeoutOrderApp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
      }
      this.updateVisibleItemCards = this.updateVisibleItemCards.bind(this);
      this.loadMenu = this.loadMenu.bind(this);
      this.onCategoryButtonClick = this.onCategoryButtonClick.bind(this);
      this.handleAddToOrderClick = this.handleAddToOrderClick.bind(this);
      this.handleRemovefromCart = this.handleRemovefromCart.bind(this);
   }
   static contextType = GlobalContext;

   updateVisibleItemCards(category) {
      let visibleItemCards = category.categoryItems;
      const { dispatch } = this.context;
      dispatch({type: Actions.GET_ITEM_CARDS, payload: visibleItemCards});
   }

   async loadMenu() {
      const menuObj = await api.getAllMenus();
      if (!menuObj || !menuObj[0]) return; // if menuObj is empty than just end the function so it doesn't crash
      const menuCategories = menuObj[0].menuCategories;
      const activeCategory = menuCategories[0];
      this.updateVisibleItemCards(activeCategory);
      const { dispatch } = this.context;  // have to write like this since class component
      dispatch({type: Actions.LOAD_MENU, payload: menuCategories});
      dispatch({type: Actions.GET_ACTIVE_CATEGORY, payload: activeCategory});
      this.setState({isLoading:false})
   }

   onCategoryButtonClick(id) {
      console.log(id);
      const { state, dispatch } = this.context;
      const clickedCategory = state.menuCategories.slice().find( (category) => category._id === id);
      dispatch({type: Actions.GET_ACTIVE_CATEGORY, payload: clickedCategory});
      this.updateVisibleItemCards(clickedCategory);
   }

   handleAddToOrderClick(id) {
      console.log(id);
      const { state, dispatch } = this.context
      const clickedItem = state.visibleItemCards.slice().find( (item) => item._id === id);
      dispatch({type: Actions.ADD_TO_CART, payload: [...state.cart, clickedItem]});
   }

   handleRemovefromCart(id) {
      const { state, dispatch } = this.context;
      let removeIndex = state.cart.findIndex( (item) => item._id === id);
      let cartCopy = JSON.parse(JSON.stringify(state.cart));
      cartCopy.splice(removeIndex, 1);
      dispatch({type: Actions.REMOVE_FROM_CART, payload: cartCopy});
   }

   componentDidMount() {
      this.loadMenu();
   }

   render() {
      if (!this.state.isLoading) {
         var menu = (<Menu onCategoryClick={this.onCategoryButtonClick.bind(this)} handleAddToOrderClick={this.handleAddToOrderClick.bind(this)} />)
      } else {
         var menu = null;
      }
      return (
         <div>
            <div className="main-body">
               <Container>
                  <NavComponent/>
                  <Row>
                     <Col sm="12" lg="9">
                        {menu}
                     </Col>

                     <Col sm="12" lg="3">
                        <Cart handleRemoveFromCart={this.handleRemovefromCart} />
                     </Col>
                  </Row>

                  <Row>
                     <MenuEditor/>
                  </Row>
               </Container>
            </div>

         </div>
      );
   }
}

export default TakeoutOrderApp;