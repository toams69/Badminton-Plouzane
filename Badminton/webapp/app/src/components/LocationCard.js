import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },

  content: {
    margin: 5
  },

  image: {
    width: "100%"
  }
};

class LocationCard extends Component {
  
  state = {
    open: false,
    rating: 1,
    activities: [],
    value: null
  };

	render() {
      const {station, handleSubmit} = this.props;
      return (
        <div>
          <center>
            <FontIcon className="material-icons" style={{fontSize: '48px', color: 'green'}}>face</FontIcon>
            <img src={'/img/blc.png'} alt="boohoo" style={styles.image}/>
            <h3>{station.name} (Surf spot)</h3>
          </center>
          

          <Tabs>
            <Tab label="Actuellement" >
              <div style={styles.content}>
                <h2 style={styles.headline}>Aujoud'hui</h2>
                <img src={'/img/prevision.png'} alt="boohoo" style={styles.image}/>
                <p>
                  Les conditions sont idéales pour vous
                </p>
                <p>
                  Preparez votre matos, ce spot est tout proche de vous!
                </p>
              </div>
            </Tab>
            <Tab label="Demain" >
              <div style={styles.content}>
                <h2 style={styles.headline}>Demain</h2>
                <img src={'/img/prevision2.png'} alt="boohoo" style={styles.image}/>
                <p>
                </p>
              </div>
            </Tab>
          </Tabs>
          <br/><br/>
          <center>
          <RaisedButton 
            label="Ok"  
            primary={true} 
            onClick={handleSubmit}
          />
          </center>
          </div>
      );
	}
}

export default LocationCard