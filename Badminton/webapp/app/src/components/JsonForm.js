import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import {TextField, RaisedButton}from 'material-ui';

export default class JsonForm extends Component {

  createMaterialField(property, key) {
   let field;

   onChange = function(e) {

   }

   switch(property.type) {
    case "string":
      field = <TextField
                key={key}
                hintText=""
                floatingLabelText={property.title}
                type={property.secure ? "password" : ""}
                errorText={property.touched ? "ss" : ''}
                value={property.value}
                onChange={this._handleTextFieldChange}
                {...property}
            />
      break;
   }
   return field;
  }

  createMaterialActionButton(action) {
    if (action.type == "submit")
      return <RaisedButton label={action.title} primary={true}  type={action.type} />
    else if (action.type == "link")
      return <Link to={action.link} ><RaisedButton label={action.title} type={action.type} /></Link>
  }


  onSubmit(e) {
    e.preventDefault();
    console.warn(this.props.jsonForm);
    this.submitAction(this.fields);
  }


  render() {
    const jsonForm = this.props.jsonForm;
    let fields = [];
    for (let key of Object.keys(jsonForm.schema.properties)) {
      fields.push(this.createMaterialField(jsonForm.schema.properties[key], key))
    }
    let actions = [];
    jsonForm.actions.forEach(action => {
      actions.push(this.createMaterialActionButton(action))
    })

    this.submitAction = function(){}
    jsonForm.actions.forEach(action => {
       console.log(action.callback)
      if (action.type =="submit" && action.callback && this.props[action.callback]) {
        this.submitAction = this.props[action.callback].bind(this)
        console.log(this.props[action.callback])
      }
    })



    return (
      <div className="content">
        <form onSubmit={this.onSubmit.bind(this)}>
          {fields}
          <br />
          <div className="button-container">
          {actions}
          </div>
        </form>
      </div>
    );
  }
}
