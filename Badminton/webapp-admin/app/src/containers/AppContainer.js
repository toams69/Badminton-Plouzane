import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '_components/App.js';

const mapDispatchToProps = (dispatch) => {
  return {
  	 loadUserFromToken: () => {
  	 },
     resetMe: () =>{
     }
  }
}


export default connect(null, mapDispatchToProps)(App);
