import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomeScreen from './screens/HomeScreen';
import * as serviceWorker from './serviceWorker';

import { GlobalProvider } from './context/GlobalState';

ReactDOM.render(
  <React.StrictMode>
     <GlobalProvider>
      <HomeScreen/>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
