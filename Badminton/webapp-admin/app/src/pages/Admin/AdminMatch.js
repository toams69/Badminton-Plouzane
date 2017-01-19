import React, { Component } from 'react';
import ContestContainer from '_containers/Admin/ContestContainer.js';

const styles = {
  drawer: {
    top: 76
  },
};

class AdminMatch extends Component {

  render() {
    return (
      <ContestContainer />
    );
  }
}

export default AdminMatch;
