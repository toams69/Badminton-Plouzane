import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import MapContainer from '../containers/MapContainer.js';
import ProfileCardContainer from '../containers/ProfileCardContainer.js';
import LocationCardContainer from '../containers/LocationCardContainer.js';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MapComponent from '../components/MapTest.js';
import Spots from "_common/data/spots.json";
import LocationCardComponent from '../components/LocationCard.js';



class Map extends Component {

  componentDidMount() {
    this.setState({open: false, searchCriteria: []});
  }

  handleOpen = () => {	
    this.setState({open: true, searchCriteria: []});
  }

  handleClose = (criteria) => {
    if (criteria && criteria.length) {
      this.createSpots(criteria)
    }
  }

  handleCloseSpot = () => {
    this.setState({open: false});
  }

  createSpots =(criteria) => {
    const _stations = [];
    const _parkings = [];
    const _magasins = [];
    Spots.features.forEach(feature => {

        var properties = feature.properties;
       _stations.push({
         position : [feature.geometry.coordinates[0],feature.geometry.coordinates[1]], 
         name: feature.properties.name,
         id: feature.properties.name + feature.geometry.coordinates[1]
        });
       
       properties.stationnements.features.forEach(parking => {
          _parkings.push({
            position : [parking.geometry.coordinates[0],parking.geometry.coordinates[1]], 
            name: parking.properties['lieu-dit'],
            id: parking.properties['lieu-dit']+parking.geometry.coordinates[1],
          });
        });
     });

    this.setState({open: false, "stations": _stations, "parkings": _parkings});
  }


  handleMarkerClick = (station) => {
    this.setState({station: station, open: true, page: "station"});
  }

  render() {
    return (
      <div>
        <HeaderContainer handleProfile={this.handleOpen}/>
        <MapComponent stations={this.state.stations} parkings={this.state.parkings}  handleMarkerClick={this.handleMarkerClick}/>
        <Drawer width={400} openSecondary={true} open={this.state.open} >
          {
            this.state.page != "station" ? (
               <div>
               <AppBar title="Mes Préférences" iconElementLeft={<div/>} />
               <ProfileCardContainer handleSubmit={this.handleClose}/></div>)
               : (<div>
               <AppBar title="Informations sur le spot" iconElementLeft={<div/>} />
               <LocationCardComponent handleSubmit={this.handleCloseSpot} station={this.state.station}/></div>)
          }
	    </Drawer>
      </div>
    );
  }
}


export default Map;
