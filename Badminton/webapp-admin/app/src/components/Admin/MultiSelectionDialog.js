import React from 'react';
import { Component } from 'react';
import {Dialog, Checkbox, RaisedButton} from 'material-ui';
import _ from 'lodash'

const styles = {
  checkbox: {
    marginTop: 16,
  },
  button: {
    margin: 12,
  }
};
class MuliSelection extends Component {
  state = {
   selected: []
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps() {
  }

  handleClose() {
    const {onClose} = this.props;
    onClose();
  }

  onSubmit() {
    const {onSubmit} = this.props;
    onSubmit(this.state.selected);
    this.state.selected = [];
  }

  onChecked(element, event, isInputChecked) {
    if (isInputChecked) {
      this.state.selected.push(element);
    } else {
      this.state.selected.splice(this.state.selected.indexOf(element), 1);
    }
  }

	render() {
    const {array, open, title} = this.props;
    const checkbox = [];
    if (array) {
      array.forEach(elem => {
        checkbox.push(
          <Checkbox
            label={elem.key}
            key={elem.value}
            onCheck={this.onChecked.bind(this, elem.value)}
            style={styles.checkbox}
          />
        );
      });
    }

    const actions = [
      <RaisedButton
        label="Annuler"
        onTouchTap={this.handleClose.bind(this)}
        style={styles.button}
      />,
      <RaisedButton
        label="Ajouter"
        primary={true}
        onTouchTap={this.onSubmit.bind(this)}
        style={styles.button}
      />,
    ];

    return (
        <Dialog
          title={title}
          modal={false}
          actions={actions}
          open={open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          {checkbox}
        </Dialog>
    );
	}
}

export default MuliSelection;
