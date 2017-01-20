import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {pinkA200, transparent} from 'material-ui/styles/colors'; 

import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const recentsIcon = <FontIcon className="material-icons">accessibility</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">group</FontIcon>;
const nearbyIcon = <FontIcon className="material-icons">search</FontIcon>;

class Players extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    selectedIndex: 0,
    currentSearch: ""
  };

  select = (index) => {
    if (index !== 2) {
      this.setState({selectedIndex: index, currentSearch: ""});
    } else {
      this.setState({selectedIndex: index});
    }
  };

  handleOk = () => {
    this.setState({selectedIndex: 2});
  };

  handleChange(e, value) {
    this.setState({currentSearch: value});
  }

  componentWillUnmount() {
  }

  componentWillMount() {
    this.props.getAllPlayers();
    this.props.getAllClubs();
  }

  componentWillReceiveProps(nextProps) {
  }

  handleListItem(playerID) {
    this.context.router.push("/joueur/"+playerID);
  }

	render() {
      const listContainer = [], favoriteListItems = [];
      const {players, clubs} = this.props;
      const {selectedIndex} = this.state;
      let currentLetter = "";
      
      if (players && selectedIndex !== 1) {
        const listItems = [];
        players.forEach(p => {
          // favorite
          // favoriteListItems.push(
          //   <ListItem
          //     primaryText="Chelsea Otakan"
          //     leftIcon={<ActionGrade color={pinkA200} />}
          //     rightAvatar={<Avatar src="assets/male.png" />}
          //   />
          // );
          let avatar = null, backgroundColor = "rgb(166, 174, 249)";
          if (p.sexe == "M") {
            avatar = "assets/male.png";
            backgroundColor = "rgb(166, 174, 249)";
          } else {
            avatar = "assets/female.png";
            backgroundColor = "rgb(245, 129, 255)";
          }
          if (this.state.currentSearch && p.nom.toLowerCase().indexOf(this.state.currentSearch.toLowerCase()) === -1 && p.prenom.toLowerCase().indexOf(this.state.currentSearch.toLowerCase()) === -1) {

          } else {
            if (currentLetter !== p.prenom[0]) {
              currentLetter = p.prenom[0];
              listItems.push(
                <ListItem
                  key={this.state.selectedIndex + p._id}
                  primaryText={p.prenom + " " +p.nom}
                  onTouchTap={this.handleListItem.bind(this, p._id)}
                  leftAvatar={
                    <Avatar
                      color={pinkA200} backgroundColor={transparent}
                      style={{left: 8}}
                    >
                      {currentLetter}
                    </Avatar>
                  }
                  rightAvatar={<Avatar src={avatar} backgroundColor={backgroundColor} />}
                />
              );
            } else {
              listItems.push(
                <ListItem
                  key={p._id}
                  primaryText={p.prenom + " " +p.nom}
                  insetChildren={true}
                  onTouchTap={this.handleListItem.bind(this, p._id)}
                  rightAvatar={<Avatar src={avatar} backgroundColor={backgroundColor}/>}
                />
              );
            }    
           }
      });
        listContainer.push(<List key="OtherList">{listItems}</List>);
      } else if (clubs && selectedIndex == 1) {
        clubs.forEach(c => {
          const listItems = [];
          listItems.push(<Subheader key={c._id + " Subheader"}>{c.nom}</Subheader>);
          c.players.forEach(p => {
            let avatar = null, backgroundColor = "rgb(166, 174, 249)";
            if (p.sexe == "M") {
              avatar = "assets/male.png";
              backgroundColor = "rgb(166, 174, 249)";
            } else {
              avatar = "assets/female.png";
              backgroundColor = "rgb(245, 129, 255)";
            }
            listItems.push(
              <ListItem
                key={c._id + "-" +p._id}
                onTouchTap={this.handleListItem.bind(this, p._id)}
                primaryText={p.prenom + " " +p.nom}
                insetChildren={true}
                rightAvatar={<Avatar src={avatar} backgroundColor={backgroundColor}/>}
              />
            );
          });
          listContainer.push(<List key={c._id}>{listItems}</List>);
          listContainer.push(<Divider key={c._id + " Divider"}/>);
        });
      }

      let search = this.state.selectedIndex != 2 ? '' : 'search';
      let cssClasses = `${search} player-component`;
      return (
        <div className={cssClasses}>
          <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Tous"
                icon={recentsIcon}
                onTouchTap={() => this.select(0)}
              />
              <BottomNavigationItem
                label="Par Club"
                icon={favoritesIcon}
                onTouchTap={() => this.select(1)}
              />
              <BottomNavigationItem
                label="Chercher"
                icon={nearbyIcon}
                onTouchTap={() => this.select(2) }
              />
            </BottomNavigation>
          </Paper>
          <div className="search-container">
            <Toolbar>
              <ToolbarGroup>
                <TextField fullWidth={true} onChange={this.handleChange.bind(this)} name="searchInput" value={this.state.currentSearch}/>
                <FontIcon className="muidocs-icon-custom-sort" />
              </ToolbarGroup>
            </Toolbar>
          </div>


          <div className="players-container">
           {listContainer}
          </div>
        </div>
      );
	}
}

export default Players