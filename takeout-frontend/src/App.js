import React, { Component } from 'react';
import './App.css';

// Router
import { Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import CheckoutScreen from './screens/CheckoutScreen';

class App extends Component {
   constructor(props) {
      super(props);
   }
   componentDidMount() {

   }
   render() {
      return (
         <div>
            <Switch>
               <Route component={CheckoutScreen} path="/checkout"/>
               <Route component={HomeScreen} path="/"/>
            </Switch>
         </div>
      );
   }
}
export default App;