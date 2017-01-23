import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '_components/header.js';

function mapStateToProps(state) {
  return { 
    
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 onDeleteClick: () => {
      
  	 },
     resetMe: () =>{
        
     },

     logout: () => {
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
