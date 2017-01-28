import React from 'react';
import ReactDOM from 'react-dom'
import { Router, hashHistory } from 'react-router'

import routes from './Routes'
import OfferStore from './stores/OfferStore'
import ClientStore from './stores/ClientStore'
import AuthStore from './stores/AuthStore'
import BuisnessStore from './stores/BusinessStore'

import * as firebase from 'firebase';

var configFirebase = {
	apiKey: "AIzaSyDieUaSUVR8dTDTsWb-UVkCXzkAn04G9KE",
	authDomain: "adfriend-73789.firebaseapp.com",
	databaseURL: "https://adfriend-73789.firebaseio.com",
	storageBucket: "adfriend-73789.appspot.com",
	messagingSenderId: "640171697438"
};
firebase.initializeApp(configFirebase);




const initialState = window.initialState || {
      offers:[],
		clients:[]
}

var authStore = new AuthStore();
var businessStore = new BuisnessStore();

var stores = {};
stores.authStore = authStore;
stores.businessStore = businessStore;





ReactDOM.render((
  <Router history={hashHistory} routes={routes(stores)}>
  </Router>
), document.querySelector("#root"))