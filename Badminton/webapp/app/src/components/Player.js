import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import SwipeableViews from 'react-swipeable-views';
import ResultList from '_components/ResultList.js';
import VersusList from '_components/VSList.js';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};


class Player extends Component {

  state = {
    slideIndex: 0
  };

  componentWillMount() {
    this.props.getPlayer(this.props.PlayerId);
  }

  componentWillReceiveProps(nextProps) {

  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

	render() {
      let games = [];
      if (!this.props.player) {
        return (<div></div>);
      }

      if (this.props.player && this.props.player.games) {
        games = this.props.player.games;
      }

      let avatar = null, backgroundColor = "rgb(166, 174, 249)";
      if (this.props.player.sexe == "M") {
        avatar = "/assets/male.png";
        backgroundColor = "rgb(166, 174, 249)";
      } else {
        avatar = "/assets/female.png";
        backgroundColor = "rgb(245, 129, 255)";
      }
      return (
          <div className="player-container">
            <div className="player-info">
            </div>
            <div className="player-tab">
             <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
              <Tab
                //icon={<FontIcon className="material-icons">accessibility</FontIcon>}
                label="Joueur"
                value={0}
              />

              <Tab
                //icon={<FontIcon className="material-icons">accessibility</FontIcon>}
                label="Résultats"
                value={1}
              />

              <Tab
                //icon={<FontIcon className="material-icons">supervisor_account</FontIcon>}
                label="VS"
                value={2}
              />
              <Tab
                //icon={<FontIcon className="material-icons">timeline</FontIcon>}
                label="Stats"
                value={3}
              />
              
             </Tabs>
             <div className="tab-content">
                 <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                  >
                  <div className="profil">
                    <div>
                      <Avatar className="avatar" size="100" src={avatar} backgroundColor={backgroundColor} />
                    </div>
                    <h1>{this.props.player.prenom + " " + this.props.player.nom}</h1>
                  </div>
                  <div>
                    <ResultList playerID={this.props.PlayerId} games={games}/> 
                  </div>
                  <div style={styles.slide}>
                    <VersusList playerID={this.props.PlayerId} games={games} />
                  </div>
                  <div style={styles.slide}>
                    slide n°3
                  </div>
                </SwipeableViews>
              </div>
            </div>
          </div>
      );
	}
}

export default Player
