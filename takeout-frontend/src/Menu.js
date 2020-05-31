import React, { Component } from 'react';
import './Menu.css';
// import { Container, Row, Col } from 'shards-react';
import { Button, ButtonGroup } from 'shards-react';
import { Card, CardImg, CardTitle, CardBody } from 'shards-react';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import * as apiCalls from './api';

class Menu extends Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   componentDidMount() {

   }
   
   render() {
      const categories = this.props.menuCategories.slice().map( (category) => {
         return <Button key={category._id} onClick={this.props.onCategoryClick.bind(this, category._id)} size="lg" theme="light">{category.name}</Button>
      });
      const visibleItems = this.props.visibleItems.slice().map( (item) => {
         return   <Card key={item._id} className="category-card">
                     <CardImg src="https://place-hold.it/300x200"/>
                     <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        <p>${item.price}</p>
                        <button onClick={this.props.handleAddToOrderClick.bind(this, item._id)}>
                           Add to Order
                        </button>
                     </CardBody>
                  </Card>
      });
      
      return (
         <div>

            <div className="category">
               
               <div className="category-buttons">
                  <ButtonGroup vertical>
                     {categories}
                  </ButtonGroup>
               </div>
               {/* end of category-button div */}

               <div className="category-contents">
                  {visibleItems}
               </div>
               {/* end of category-content div */}

            </div> 
            {/* end of category div */}
         </div>
      );
   }
}

export default Menu;