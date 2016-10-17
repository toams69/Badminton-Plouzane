import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from "react-mapbox-gl";
import Spots from "_common/data/spots.json";

const { accessToken, style } = {
  "accessToken": "pk.eyJ1IjoiY3JoeXMiLCJhIjoiY2l0eWVrd2FqMDdzeTJ6cWVpbHVsdDIzYiJ9.ZP4H9eMHeB9t1iFmBOQCKQ",
  "style": "mapbox://styles/crhys/ciu21tokx00kt2irq7x593c1v"
};

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

export default class Map extends Component {

  state = {
    center: [ -4.48705, 48.38927 ],
    zoom: [8],
    skip: 0,
    station: null,
    parking: null,
    popupShowLabel: true
  };

  componentWillMount() {
    //if (this.props && this.props.searchCriteria && this.props.searchCriteria.length) {
     // this.searchSpot();
    //}
  };

  _markerClick = (station, { feature }) => {
    this.setState({
      center: feature.geometry.coordinates,
      zoom: [14],
      station
    });
    this.props.handleMarkerClick(station)

  };

  _onDrag = () => {
    if (this.state.station) {
      this.setState({
        station: null, parking: null
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

  _parkingClick = (parking, { feature }) => {
    this.setState({
      center: feature.geometry.coordinates,
      zoom: [14],
      parking
    });
  };

  render() {
    console.warn(parkings);
    const { station, skip, end, popupShowLabel, parking } = this.state;
    const { stations, parkings } = this.props
    let features = [];
    if (stations)
      stations.forEach(station => {
        features.push(
          <Feature
            key={station.id}
            onHover={this._onToggleHover.bind(this, "pointer")}
            onEndHover={this._onToggleHover.bind(this, "")}
            onClick={this._markerClick.bind(this, station)}
            coordinates={station.position}/>)
      })


    let features2 = [];
    if (parkings)
      parkings.forEach(parking => {
        features2.push(
          <Feature
            key={parking.id}
            onHover={this._onToggleHover.bind(this, "pointer")}
            onEndHover={this._onToggleHover.bind(this, "")}
            onClick={this._parkingClick.bind(this, parking)}
            coordinates={parking.position}/>)
      })

    return (
      <div>
        <ReactMapboxGl
          style={style}
          center={this.state.center}
          zoom={this.state.zoom}
          minZoom={8}
          maxZoom={15}
          accessToken={accessToken}
          onDrag={this._onDrag}
          onMoveEnd={this._setMove.bind(this, true)}
          onMove={this._setMove.bind(this, false)}
          containerStyle={containerStyle}>

          <ZoomControl
            zoomDiff={1}
            onControlClick={this._onControlClick}/>

          <Layer
            type="symbol"
            id="station"
            layout={{ "icon-image": "good", "icon-size" : 1 }}>
            {features}
          </Layer>

          <Layer
            type="symbol"
            id="parking"
            layout={{ "icon-image": "bus-11", "icon-size" : 1 }}>
            {features2}
          </Layer>

          {
            station && end && (
              <Popup key={station.id} coordinates={station.position} closeButton={true}>
                <div>
                  <span style={{
                    ...styles.popup,
                    display: popupShowLabel ? "block" : "none"
                  }}>
                    {station.name}
                  </span>
                </div>
              </Popup>
            )
          }

          {
            parking && end && (
              <Popup key={parking.id} coordinates={parking.position} closeButton={true}>
                <div>
                  <span style={{
                    ...styles.popup,
                    display: popupShowLabel ? "block" : "none"
                  }}>
                    Parking : {parking.name}
                  </span>
                </div>
              </Popup>
            )
          }
        </ReactMapboxGl>
      </div>
    )
  }
}