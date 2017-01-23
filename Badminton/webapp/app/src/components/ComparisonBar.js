import React, { Component } from 'react';
import _ from 'lodash';

import {
  green300,
  red300,
  transparent
} from 'material-ui/styles/colors';

class ComparisonBar extends Component {

  componentWillMount() {
   
  }

  componentWillReceiveProps(nextProps) {

  }
 
	render() {
      const {val1, val2} = this.props;
      if (val1 || val2) {
        const prct = parseInt((val1 / (val1 + val2)) * 10000) / 100;
        return (
            <div className="comparison-bar">
             <p>{val1}</p>
             <div className="bar">
              <div className="prct" width={""+prct + "%"}>{prct} %</div>
             </div>
             <p>{val2}</p>
            </div>
        );
      } else {
         return (
            <div className="comparison-bar">
            </div>
        );
      }
	}
}

export default ComparisonBar
