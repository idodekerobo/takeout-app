import React, { Component } from 'react';
import * as apiCalls from './api';

class ItemForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         itemName: '',
         itemPrice: 0
      }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleNameChange(e) {
      this.setState({
         itemName: e.target.value
      })
   }

   handlePriceChange(e) {
      this.setState({
         itemPrice: e.target.value
      })
   }

   handleSubmit(e) {
      // e.preventDefault(); // comment this out because the refresh allows the new item to be shown on the screen
      apiCalls.postItem(this.state.itemName, this.state.itemPrice);
      console.log('Added a new item to your menu.');
      console.log('You added', this.state.itemName, 'at a price of', this.state.itemPrice, '.');
   }

   render() {

      return (
         <div>
            <h3>Create new items!</h3>
            <form>
               <input type="text"
                  placeholder="What's the name of the item?"
                  value={this.state.newItemName}
                  onChange={this.handleNameChange}
               />
               <input type="number"
                  placeholder="Price"
                  value={this.state.newItemPrice}
                  onChange={this.handlePriceChange}
               />
               <button onClick={this.handleSubmit}>Add New Item!</button>
            </form>
         </div>
      );
   }
}

export default ItemForm;