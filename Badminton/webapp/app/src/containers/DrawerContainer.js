import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from '../components/Drawer.js';

function mapStateToProps(state, ownProps) {
  return { 
     onItemClick: ownProps.onItemClick
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 onRouteChange: () => {
      
  	 },
     resetMe: () =>{
        
     },

     logout: () => {
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
