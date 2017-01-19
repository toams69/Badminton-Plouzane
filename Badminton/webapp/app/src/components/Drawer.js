import React, { Component } from 'react';
import { Link } from 'react-router';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';


class Header extends Component {
  componentWillUnmount() {
  }

  _onListItemSelected(e) {
    this.props.onItemClick(e);
  }

  componentWillReceiveProps(nextProps) {

  }

	render() {
      return (
          <div>
            <List>
              <ListItem primaryText="Joueurs" leftIcon={<ContentInbox />} onTouchTap={this._onListItemSelected.bind(this, "/joueurs")} />
              <ListItem primaryText="Clubs" leftIcon={<ActionGrade />} onTouchTap={this._onListItemSelected.bind(this, "/clubs")}/>
              <ListItem primaryText="Hommes" leftIcon={<ContentSend />} onTouchTap={this._onListItemSelected.bind(this, "/hommes")}/>
              <ListItem primaryText="Mixtes" leftIcon={<ContentDrafts />} onTouchTap={this._onListItemSelected.bind(this, "/mixtes")}/>
              <ListItem primaryText="Tournoi" leftIcon={<ContentInbox />} onTouchTap={this._onListItemSelected.bind(this, "/tournois")}/>
            </List>
          </div>
      );
	}
}

export default Header
