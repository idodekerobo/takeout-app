import React, { Component } from 'react';
import './TakeoutOrderApp.css';
import * as apiCalls from './api';
import NavComponent from './NavComponent';
import Menu from './Menu';
import Cart from './Cart';
import MenuEditor from './MenuEditor'

import { Container, Row, Col } from 'shards-react';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";


class TakeoutOrderApp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         restaurant: {},
         menuCategories: [],
         activeCategory: {},
         visibleItemCards: [],
         cart: [],
         subtotal: 0,
         tax: 0,
         totalPrice: 0
      }

      this.updateVisibleItemCards = this.updateVisibleItemCards.bind(this);
      this.loadMenu = this.loadMenu.bind(this);

      this.loadRestauarantInfo = this.loadRestauarantInfo.bind(this);

      this.onCategoryButtonClick = this.onCategoryButtonClick.bind(this);
      this.handleAddToOrderClick = this.handleAddToOrderClick.bind(this);
      this.handleRemovefromCart = this.handleRemovefromCart.bind(this);
      // this.calculatePricing = this.calculatePricing.bind(this);
      // this.loadAllItems = this.loadAllItems.bind(this);
      // this.loadItem = this.loadItem.bind(this);
      // this.postItem = this.postItem.bind(this);
   }

   updateVisibleItemCards(category) {
      let visibleItemCards = category.categoryItems;
      this.setState({visibleItemCards});
   }

   async loadRestauarantInfo() {
      // let restaurantInfo = await apiCalls.
   }

   async loadMenu() {
      const menuObj = await apiCalls.getAllMenus();
      if (!menuObj || !menuObj[0]) return; // if menuObj is empty than just end the function so it doesn't crash
      const menuCategories = menuObj[0].menuCategories;
      const activeCategory = menuCategories[0];

      this.updateVisibleItemCards(activeCategory);

      this.setState({
         menuCategories,
         activeCategory
      });
   }

   onCategoryButtonClick(id) {
      console.log(id);
      const clickedCategory = this.state.menuCategories.slice().find( (category) => category._id === id);
      this.setState({
         activeCategory: clickedCategory
      });
      this.updateVisibleItemCards(clickedCategory);
   }

   // calculatePricing() {
   //    var currentSubtotal = 0;
   //    var currentTax = 0;
   //    var currentTotalPrice = 0;
   //    var taxRate = 0.07;
   //    this.state.cart.forEach(item => {
   //       currentSubtotal += item.price;
   //    });

   //    currentTax = currentSubtotal*taxRate;
   //    var currentTotalPrice = currentSubtotal+currentTax

   //    let pricingArr = {
   //       subtotal: currentSubtotal,
   //       tax: currentTax,
   //       totalPrice: currentTotalPrice
   //    }

   //    return pricingArr;

   //    this.setState({
   //       subtotal: currentSubtotal,
   //       tax: currentTax,
   //       totalPrice: currentTotalPrice
   //    });
   // }

   handleAddToOrderClick(id) {
      console.log(id);
      const clickedItem = this.state.visibleItemCards.slice().find( (item) => item._id === id);
      console.log(clickedItem);


      this.setState(prevState => ({
         cart: [...prevState.cart, clickedItem]
      }));
      
   }

   handleRemovefromCart(id) {
      console.log(this.state.cart);
      let removeIndex = this.state.cart.findIndex( (item) => item._id === id);
      let cartCopy = JSON.parse(JSON.stringify(this.state.cart));
      cartCopy.splice(removeIndex, 1);
      this.setState({
         cart: cartCopy
      });
   }

   
   componentDidMount() {
      this.loadMenu();
   }

   render() {

      return (
         <div>
            <div className="main-body">
               <Container>
                  <NavComponent restaurant={this.state.restaurant}/>

                  <Row>
                     <Col sm="12" lg="9">
                        <Menu menuCategories={this.state.menuCategories}
                              visibleItems={this.state.visibleItemCards}
                              onCategoryClick={this.onCategoryButtonClick.bind(this)}
                              handleAddToOrderClick={this.handleAddToOrderClick.bind(this)}
                        />
                     </Col>
                     <Col sm="12" lg="3">
                        <Cart
                           cartItems={this.state.cart}
                           handleRemoveFromCart={this.handleRemovefromCart}
                        />
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

   // async loadAllItems() {
   //    var itemArr = [];
   //    let items = await apiCalls.getAllItems();
   //    items.forEach(itemObj => {
   //       itemArr.push(itemObj); // change the itemArr to an arr of objects instead of strings
   //    });
   //    // console.log('These are the items', items);
   //    this.setState({
   //       items: itemArr
   //    });
   // }

   // async loadItem(itemId) {
   //    var item = await apiCalls.getItem(itemId);
   //    var itemName = item.name
   //    // this.setState({
   //    //    currentItem: itemName
   //    // });
   //    console.log(itemName);
   // }

   // async postItem(name, price) {
   //    let newItem = await apiCalls.postItem(name, price);
   //    this.setState({
   //       items: [...this.state.items, newItem]
   //    });
   // }