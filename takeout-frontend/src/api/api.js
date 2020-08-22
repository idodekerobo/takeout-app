/*
T0-DO:
 - revise the post item func api call as you change the server side api 

*/


// can make this an .env variable
const API_URL = 'http://localhost:5000/api/';

// The fetch API calls will be built using async functions, instead of promises

/*
=================================================================================================================================
                                                        ERROR HANDLING
=================================================================================================================================
*/
function errorHandling(resp) {
   if (!resp.ok) { // resp is not okay on network failure or something preventing the request from completeing
      if (resp.status >= 400 && resp.status < 500) { // status is from 400-500 on client errors
         return resp.json().then(data => {
            let err = { errMessage: data.message };
            throw err;
         });
      } else { // there's a network failure or something stopping the req from completing
         let err = { errMessage: 'Please try again  later. There\'s something wrong in the cloud' };
         throw err;
      }
   }
};

function catchBlock(err) {
   // throw error
   console.log("There was an error, please see below.");
   console.log(err);
}

/*
=================================================================================================================================
                                                        Restaurant Info
=================================================================================================================================
*/
export async function getRestuarantInfo() {
   return fetch(API_URL, {method: 'GET'})
   .then(resp => {
      errorHandling(resp);
      return resp.json();
   })
   .then(jsonData => {
      // console.log(jsonData);
      return jsonData;
   })
   .catch(err => catchBlock(err));
}

/*
=================================================================================================================================
                                                        MENU
=================================================================================================================================
*/
// get all menus
export async function getAllMenus() {
   const URL = API_URL + 'menu/';

   return fetch(URL, {method: 'GET'})
   .then(resp => {
      errorHandling(resp);
      return resp.json(); // if response is okay then convert to json and return
   })
   .then(jsonData => {
      // console.log(jsonData);
      return jsonData; // take that jsondata and return it 
   })
   .catch(err => catchBlock(err));
}

// get one specific menu
export async function getMenu(menuId) { 
   const URL = API_URL + 'menu/' + menuId;

   return fetch(URL, {method: 'GET'})
   .then(resp => {
      errorHandling(resp);
      return resp.json();
   })
   .then(jsonData => {
      // console.log(jsonData);
      return jsonData;
   })
   .catch(err => catchBlock(err));
}

// get all categories of a menu
export async function getCategoriesOfMenu(menuId) {
   const URL = API_URL + 'menu/' + menuId + '/category/';

}

// get a specific category of a specific menu
export async function getOneCategoryOfMenu(menuId, categoryId) {
   const URL = API_URL + 'menu/' + menuId + '/category/' + categoryId;
}

// get items of a menu
export async function getItemsOfMenu(menuId) {

}

// post a menu
export async function postMenu(menuName, categoryArr, itemArr) {
   const URL = API_URL + 'menu/';

   return fetch(URL, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      }, 
      body: JSON.stringify
   })
   .then( (resp) => {
      // do stuff
   })
   .then (jsonData => {
      // do stuff
   })
   .catch( (err) => {
      // do stuff
   });
}

/*
=================================================================================================================================
                                                        ITEMS
=================================================================================================================================
*/
// getting all items
export async function getAllItems() {
   const URL = API_URL + 'items/';

   return fetch(URL, { method: 'GET' })
   .then(resp => {
      errorHandling(resp);
      return resp.json(); // if response is okay then return the response in json
   })
   .then(jsonData => {
      // console.log(jsonData);
      return jsonData; // actually returning the jsonData from the resolved proimse func
   })
   .catch(err => catchBlock(err));
}

// get an item
export async function getItem(itemId) {
   const URL = API_URL + 'items/' + itemId;

   return fetch(URL, { method: 'GET' })
   .then(resp => {
      errorHandling(resp);
      return resp.json();
   })
   .then(jsonData => {
      // console.log(jsonData);
      return jsonData;
   })
   .catch(err => catchBlock(err));
}

// update an item
export async function updateItem(itemId) {
   const URL = API_URL + 'items/' + itemId;

   return fetch(URL, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify
   })
   .then(resp => {
      errorHandling(resp);
      return resp.json();
   })
   .then(jsonData => {
      // console.log(jsonData);
      return jsonData;
   })
   .catch(err => catchBlock(err));
}

// post a new item
export async function postItem(itemName, itemPrice) {
   const URL = API_URL + 'items/';

   return fetch(URL, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         name: itemName,
         price: itemPrice
      })
   })
   .then(resp => {
      errorHandling(resp);
      return resp.json();
   })
   .then(jsonData => {
      // console.log(jsonData);
      return jsonData;
   })
   .catch(err => catchBlock(err));
}

/*
=================================================================================================================================
                                                        CATEGORIES
=================================================================================================================================
*/
export async function getAllCategories() {
   const URL = API_URL + 'category/';

   return fetch(URL, {method: 'GET'})
   .then(resp => {
      errorHandling(resp);
      return resp.json();
   })
   .then(jsonData => {
      // console.log(jsonData);
      return jsonData;
   })
   .catch(err => catchBlock(err));
}

export async function getCategory(categoryId) {
   const URL = API_URL + 'category/' + categoryId;
   return fetch(URL, { method: 'GET' })
   .then(resp => {
      errorHandling(resp);
      return resp.json();
   })
   .then(jsonData => {
      // console.log(jsonData);
      return jsonData;
   })
   .catch(err => catchBlock(err));
}