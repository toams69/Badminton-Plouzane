import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../components/MapTest.js';

function mapStateToProps(state) {
  return { 
    user: state.user
  };
}

export default connect(mapStateToProps)(Map);
