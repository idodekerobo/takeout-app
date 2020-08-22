import React, { Component } from 'react';

class ItemUpdateForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         updateItem: this.props.updateItem,
         itemName: ''
      }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleStockChange = this.handleStockChange.bind(this);
      this.handleDiscountChange = this.handleDiscountChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleNameChange(e) {

   }

   handlePriceChange(e) {

   }

   handleStockChange(e) {

   }

   handleDiscountChange(e) {

   }

   handleSubmit(e) {
      e.preventDefault();
      // api.updateItem      
   }

   render() {

      return (
         <div>
            <h3>Update Item</h3>
            
            <form>

               <label>
                  Name
                  <input type="text"
                     value={this.state.itemName}
                  />
               </label>

               <label>
                  Price
                  <input type="text"
                  placeholder="item price"

                  />
               </label>

               <label>
                  In Stock
                  <input type="text"
                  placeholder="item name"

                  />
               </label>
               

               <label>
                  On Sale
                  <input type="text"
                  placeholder="On Sale"
                  />
               </label>

               <label>
                  Discount
                  <input type="text"
                  placeholder="discount"
                  />
               </label>

               <button onClick={this.handleSubmit}>
                  Update Item
               </button>
            </form>

         </div>
      );
   }

}

export default ItemUpdateForm;