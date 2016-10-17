import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ReactMapboxGl, {GeoJSONLayer, ScaleControl, ZoomControl, Marker } from "react-mapbox-gl";
import { SchemaForm } from 'react-schema-form';
import _geojson from "_common/data/spots.json";


const containerStyle = {
  height: "100vh",
  width: "100vw"
};

const styles = {
  button: {
    cursor: "pointer"
  },

  stationDescription: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "16px 0px",
    textAlign: "center",
    backgroundColor: "white"
  },

  popup: {
    background: "#fff",
    padding: "5px",
    borderRadius: "2px"
  }
}


class MapComponent extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    popup: null,
    center: [ -4.48705, 48.38927 ]
  };

  componentWillMount() {
     let userStatus = this.props.user.status;
     if(!userStatus || userStatus !== 'authenticated') {
      this.context.router.push('/');
    }

    
  }

  _markerClick = (station, { feature }) => {
    this.setState({
      center: feature.geometry.coordinates,
      zoom: [14],
      station
    });
  };

  _onDrag = () => {
    if (this.state.station) {
      this.setState({
        station: null
      });
    }
  };

  _setMove = (end) => {
    if(end !== this.state.end)
      this.setState({ end });
  };

  _onToggleHover(cursor, { map }) {
    map.getCanvas().style.cursor = cursor;
  }

  _onControlClick = (map, zoomDiff) => {
    const zoom = map.getZoom() + zoomDiff;
    this.setState({ zoom: [zoom] });
  };

  _popupChange(popupShowLabel) {
    this.setState({ popupShowLabel });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.status !== 'authenticated') {
      this.context.router.push('/');
    }
  }


  parseGeoJson() {
    const geojson = {"type": "FeatureCollection", "features": []};


    geojson.features.push({
        "type": "Feature", 
        "geometry": {
          "type": "Point", 
          "coordinates": [-3.9805358999999965, 48.72274919999477]
        }, 
        
        "properties": {
          "ville": "ROSCOFF", 
          "cpost": "29680", 
          "name": "COMPTOIR DE LA MER"
        }
      }
    );

    return geojson;
  }


  render() {
    const { stations, station, skip, end, popupShowLabel } = this.state;
    
    return (
      <ReactMapboxGl
        style="mapbox://styles/crhys/ciu21tokx00kt2irq7x593c1v"
        accessToken="pk.eyJ1IjoiY3JoeXMiLCJhIjoiY2l0eWVrd2FqMDdzeTJ6cWVpbHVsdDIzYiJ9.ZP4H9eMHeB9t1iFmBOQCKQ"
        center={this.state.center}
        zoom={[11]}
        movingMethod="jumpTo"
        containerStyle={{ height: "100vh", width: "100%" }}>
        <ScaleControl/>
        <ZoomControl/>
        <GeoJSONLayer
          data={_geojson}
          symbolLayout={{
            "text-field": "{name}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
          }}/>
       
      </ReactMapboxGl>
    );
  }
}

export default MapComponent;