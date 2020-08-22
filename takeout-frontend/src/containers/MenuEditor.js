import React, { Component } from 'react';
import * as api from '../api/api';
import '../styles/MenuEditor.css';
import { Container, Row, Col } from 'shards-react';
import ItemForm from '../components/ItemForm';
import ItemUpdateForm from '../components/ItemUpdateForm';


import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";

// try making dropdowns and radio buttons fully controlled 

class MenuEditor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedRadio: "Item",
         itemArr: [], 
         // selectedItemToEdit:
      }

      this.grabDataFromDb = this.grabDataFromDb.bind(this);
      this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
      this.handleDropDownClick = this.handleDropDownClick.bind(this);
   }

   async grabDataFromDb() {
      var itemArr = [];
      if (this.state.selectedRadio === 'Item') {
         itemArr = await api.getAllItems();
      } else if (this.state.selectedRadio === 'Category') {
         itemArr = await api.getAllCategories();
      }
      // console.log('this is the arr grabbed from menu editor component: ', itemArr);
      this.setState({
         itemArr
      });
   }

   
   handleRadioButtonChange(e) {
      this.setState({
         selectedRadio: e.target.value
      });
      this.grabDataFromDb();
   }

   handleRadioButtonClick() {
      
   }

   handleDropDownClick(e) {
      console.log(e.target.value);
   }

   componentDidMount() {
      this.grabDataFromDb();
   }

   render() {

      const dropdown = this.state.itemArr.slice().map( (arrItem, index) => {
         return   <option value={arrItem.name} key={arrItem._id} >
                     {arrItem.name}
                  </option>
      })

      return (
         <div className="menu-editor">

            <div className="radio-form">
               <label className="radio-element">
                  <input
                     type="radio"
                     name="group-to-edit"
                     value="Item"
                     checked={this.state.selectedRadio === "Item"}
                     // onChange={this.handleRadioButtonChange}
                     onClick={this.handleRadioButtonChange}
                     className="radio-button"
                  />
                  Items
               </label>
               
               <label>
                  <input
                     type="radio"
                     name="group-to-edit"
                     value="Category"
                     checked={this.state.selectedRadio === "Category"}
                     // onChange={this.handleRadioButtonChange}
                     onClick={this.handleRadioButtonChange}
                  />
                  Categories
               </label>
            </div>

            <select name={this.state.currentlyEditing}>
               <option onClick={this.handleDropDownClick}>
                  Select {this.state.selectedRadio} to Edit</option>
               {dropdown}
            </select>

            {/* <Row>
               <ItemForm />
            </Row>
            <Row>
               <ItemUpdateForm />
            </Row> */}

         </div>
      )
   }
}

export default MenuEditor;