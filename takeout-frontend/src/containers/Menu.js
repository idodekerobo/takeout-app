import React, { useContext } from 'react';
import '../styles/Menu.css';
import { Button, ButtonGroup } from 'shards-react';
import { Card, CardImg, CardTitle, CardBody } from 'shards-react';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalContext } from '../context/GlobalState';

// import Button from '../components/Button';
import burritoImg from '../assets/burrito.jpg'

const Menu = ({onCategoryClick, handleAddToOrderClick}) => {
   const { state } = useContext(GlobalContext);

   const categories = state.menuCategories.slice().map( (category) => {
      return <Button key={category._id} onClick={onCategoryClick.bind(this, category._id)} size="lg" theme="light">{category.name}</Button>
   });

   const visibleItems = state.visibleItemCards.slice().map( (item) => {
      return   <Card key={item._id} className="category-card">
                  {/* <CardImg src='/assets/burrito.png'/> */}
                  <CardImg className="card-img" src={burritoImg}/>
                  <CardBody className="card-body-div">
                     <CardTitle className="card-title-div">{item.name}</CardTitle>
                     <p>${item.price}</p>
                     <Button theme="light" className="add-to-order-btn" onClick={handleAddToOrderClick.bind(this, item._id)}>
                        Add to Order
                     </Button>
                  </CardBody>
               </Card>
   });
   
   return (
      <div>
         <div className="category"> 
            <div className="category-buttons">
               <ButtonGroup className="button-group" vertical>
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

export default Menu;