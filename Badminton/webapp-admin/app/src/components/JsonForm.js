import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import {TextField, RaisedButton}from 'material-ui';

const styles = {
  button: {
    margin: 12,
  }
};
export default class JsonForm extends Component {
  componentWillMount() {
  }

  getErrorforField(key) {
    const {errors} = this.props;
    if (errors && errors[key]) {
        switch (errors[key].kind) {
          case "required":
            return "Ce Champ est requis";
          default:
            return "Merci de renseigner une valeur correcte";
        }
      }
  }

  _handleTextFieldChange(property, key,  e, value) {
    this.props.updateField(property, key, value);
  }

  createField(property, key) {
      let error = "";
      if (property.error) {
        switch (property.error.kind) {
          case "required":
            error= "Ce Champ est requis";
          default:
            error= "Merci de renseigner une valeur correcte";
        }
     }
     switch(property.type) {
      case "string":
        return (<TextField
                  key={this.props.key + key}
                  hintText=""
                  floatingLabelText={property.title}
                  defaultValue={property.defaultValue}
                  errorText={error}
                  onChange={this._handleTextFieldChange.bind(this, property, key)}
              />);
     }
     return null;
  }

  resetFields() {
    if (this.props.resetAction) {
      this.props.resetAction();
    }
  }

  createActionButton(action, index) {
    if (action.type == "submit")
      return <RaisedButton label={action.title} key={index} primary={true}  type={action.type} style={styles.button} disabled={this.props.loading}/>
    else if (action.type == "reset")
      return <RaisedButton label={action.title} key={index} type={action.type} style={styles.button} onClick={this.resetFields.bind(this)} disabled={this.props.loading}/>
  }

  onSubmit(e) {
    e.preventDefault();
    const {jsonForm} = this.props;
    // TO DO CHECK BEFORE SEND BASED ON VALIDATION SCHEMA
    var values = {};
    for (let key of Object.keys(jsonForm.schema.properties)) {
      if (jsonForm.schema.properties[key].value)
        values[key] = jsonForm.schema.properties[key].value;
    }
    if (this.props.submitAction) {
      this.props.submitAction(values).then(() => {
          //this.props.resetAction();
      })
      
    }
  }


  render() {
    const {jsonForm} = this.props;
    const fields = []

    for (let key of Object.keys(this.props.jsonForm.schema.properties)) {
      fields.push(this.createField(this.props.jsonForm.schema.properties[key], key))
    }

    const actions = [];
    jsonForm.actions.forEach((action, index) => {
      actions.push(this.createActionButton(action, index))
    })

    return (
      <div style={this.props.style}>
        <h3>{jsonForm.schema.title}</h3>
        <hr/>
        <form onSubmit={this.onSubmit.bind(this)}>
          {fields}
          <br />
          <div>
            {actions}
          </div>
        </form>
      </div>
    );
  }
}
