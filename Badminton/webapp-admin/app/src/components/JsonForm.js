import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import {TextField, RaisedButton}from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
}


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

  _handleTextFieldChange(key,  e, value) {
    this.props.updateField(key, value);
  }

  createField(property, key) {
      let error = "";
      error = this.getErrorforField(key);
     switch(property.type) {
      case "string":
        if (property.format === "date") {
          return (
            <DatePicker
              key={this.props.current._id + key}
              floatingLabelText={property.title}
              DateTimeFormat={DateTimeFormat}
              okLabel="OK"
              cancelLabel="Annuler"
              locale="fr"
              onChange={this._handleTextFieldChange.bind(this, key)}
            />
          )
        } else
        return (<TextField
                  key={this.props.current._id + key}
                  hintText=""
                  floatingLabelText={property.title}
                  defaultValue={this.props.current ? this.props.current[key] : property.defaultValue}
                  errorText={error}
                  onChange={this._handleTextFieldChange.bind(this, key)}
              />);
     }
     return null;
  }

  resetFields() {
    if (this.props.resetAction) {
      this.props.resetAction();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.submitAction();
  }


  render() {
    const {jsonForm, title} = this.props;
    const fields = []

    for (let key of Object.keys(this.props.jsonForm.schema.properties)) {
      fields.push(this.createField(this.props.jsonForm.schema.properties[key], key))
    }

    return (
      <div style={this.props.style}>

        <h3>{title}</h3>
        {title ? <hr/> : null}
        <form onSubmit={this.onSubmit.bind(this)}>
          {fields}
          <br />
          <div>
            <RaisedButton label="Annuler" type="reset" style={styles.button} onClick={this.resetFields.bind(this)} disabled={this.props.loading}/>
            <RaisedButton label="Valider" primary={true}  type="submit" style={styles.button} disabled={this.props.loading}/>
          </div>
        </form>
      </div>
    );
  }
}
