import React from 'react';
import { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import StarRatingComponent from 'react-star-rating-component';
import Chip from 'material-ui/Chip';
import { Link } from 'react-router';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  chip: {
    margin: 4,
  },

};


const items = [
  <MenuItem key={1} value={"Surf / Body"} primaryText="Surf / Body" />,
  <MenuItem key={2} value={"Plongée"} primaryText="Plongée" />,
  <MenuItem key={3} value={"Bronzette"} primaryText="Bronzette" />,
  <MenuItem key={4} value={"Kite"} primaryText="Kite" />,
  <MenuItem key={11} value={"Planche à voile"} primaryText="Planche à voile" />,
  <MenuItem key={5} value={"Paddle"} primaryText="Paddle" />,
  <MenuItem key={6} value={"Kayak"} primaryText="Kayak" />,
  <MenuItem key={7} value={"Rando"} primaryText="Rando" />,
  <MenuItem key={8} value={"Marche côtière"} primaryText="Marche côtière" />,
  <MenuItem key={9} value={"Pêche à pied"} primaryText="Pêche à pied" />,
  <MenuItem key={10} value={"Saut de falaises"} primaryText="Saut de falaises" />,
];

export default class ProfileCard extends Component {

  state = {
    open: false,
    rating: 1,
    activities: [],
    value: null
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event, index, value) => {
    this.setState({value});
  };

  handleValidate = () => {
    const activity = {
      name: this.state.value,
      level: this.state.rating
    }

    let activities = this.state.activities
    activities.push(activity);
    this.setState({activities: activities, open: false});
  };

  handleRequestDelete(activity) {
    if (this.state.activities.indexOf(activity) != -1) {
      this.state.activities.splice(this.state.activities.indexOf(activity), 1)
      this.setState({activities: this.state.activities});
    } else {
      
    }
  }

  onStarClick(nextValue, prevValue, name) {
    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    this.setState({rating: nextValue});
  }


  createChip(activity) {
    console.warn(activity)
    return (
      <Chip
        onRequestDelete={this.handleRequestDelete.bind(this, activity)}
        key={activity.name}
        style={styles.chip}
      >
        {activity.name}
      </Chip>
    )
  }

  render() {

    const actions = [
      <FlatButton
        label="Annuler"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Ajouter"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleValidate}
      />,
    ];

    let user = this.props.user.user;
    let open = this.props.open;

    let activities = [];
  
    this.state.activities.forEach(activity => {
      activities.push(this.createChip(activity))
    })

    return (
      <div>
        <center>
          <FontIcon className="material-icons" style={{fontSize: '48px'}}>face</FontIcon>
          <div>{user && user.name}</div>
        </center>
        <h4>Vos Activités:</h4>
        <div className="activity-list">
          {activities}
        </div>

        <RaisedButton 
          label="Ajouter une activité"
          onTouchTap={this.handleOpen}
          style={styles.button}
          icon={<FontIcon className="material-icons" style={{fontSize: '24px'}}>loupe</FontIcon>}
        />
        <br/><br/>
        <Dialog
          title="Ajout d'activité"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          
        <SelectField
          floatingLabelText="Choisir une activité"
          value={this.state.value}
          onChange={this.handleChange}
        >
          {items}
        </SelectField>
        <br/><br/>
        Selectionnez votre niveau <br/>
        <StarRatingComponent value={this.state.rating} onStarClick={this.onStarClick.bind(this)}/>

        </Dialog>
        <RaisedButton 
          label="Valider mes préferences"  
          primary={true} 
          style={styles.button}
          onClick={this.props.handleSubmit(this.state.activities)}
        />       
      </div>
    );
  }
}
