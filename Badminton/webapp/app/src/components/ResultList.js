import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

import {
  green300,
  red300,
  transparent
} from 'material-ui/styles/colors';

class ResultList extends Component {

  componentWillMount() {
   
  }

  componentWillReceiveProps(nextProps) {

  }

 
	render() {
      var avatar = <Avatar color={green300} backgroundColor={transparent} icon={<FontIcon className="material-icons" >thumb_up</FontIcon>} />;
      var avatar2 = <Avatar color={red300} backgroundColor={transparent} icon={<FontIcon className="material-icons" >thumb_down</FontIcon>} />;
      
      const {playerID, games} = this.props;
      const cardList = [];
      if (games) {
        games.forEach(g => {
          let win = true;
          let nbSet =0;
          let isSimple = true;
          let adversaire = "";
          let partenaire = "";
          const scores = [];
          if (g._player1Id._id === playerID || (g._player2Id && g._player2Id._id === playerID)) {
            // locaux
            nbSet += g.score11 > g.score12 ? 1 : 0;
            nbSet += g.score21 > g.score22 ? 1 : 0;
            nbSet += g.score31 && g.score31 > g.score32 ? 1 : 0;

            win = nbSet > 1;
            partenaire = g._player2Id ? g._player2Id._id === playerID ? g._player1Id.prenom + " " + g._player1Id.nom : g._player2Id.prenom + " " + g._player2Id.nom : "";
            adversaire = g._player3Id.prenom + " " + g._player3Id.nom;
            adversaire += g._player4Id ? " et " + g._player4Id.prenom + " " + g._player4Id.nom : "";

            scores.push(<li>{g.score11 + " - " + g.score12}</li>);
            scores.push(<li>{g.score21 + " - " + g.score22}</li>);
            if (g.score31) {
              scores.push(<li>{g.score31 + " - " + g.score32}</li>);
            }

          } else {
            //visiteur
             nbSet += g.score11 < g.score12 ? 1 : 0;
             nbSet += g.score21 < g.score22 ? 1 : 0;
             nbSet += g.score31 && g.score31 < g.score32 ? 1 : 0;

             win = nbSet > 1;

             partenaire = g._player4Id ? g._player4Id._id === playerID ? g._player3Id.prenom + " " + g._player3Id.nom : g._player4Id.prenom + " " + g._player4Id.nom : "";
             adversaire = g._player1Id.prenom + " " + g._player1Id.nom;
             adversaire += g._player2Id ? " et " + g._player2Id.prenom + " " + g._player2Id.nom : "";

             scores.push(<li>{g.score12 + " - " + g.score11}</li>);
             scores.push(<li>{g.score22 + " - " + g.score21}</li>);
             if (g.score31) {
              scores.push(<li>{g.score32 + " - " + g.score31}</li>);
             }
          }
          if (g._player2Id && g._player4Id) {
            isSimple = false;
          }

          cardList.push(
             <Card>
                <CardHeader
                  title={win ? "Victoire contre " + adversaire : "Défaite contre " + adversaire}
                  subtitle={isSimple ? "Simple" : "Double avec " + partenaire}
                  avatar={win ? avatar : avatar2}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                </CardActions>
                <CardText expandable={true}>
                  <ul>
                   { scores }
                  </ul>
                </CardText>
              </Card>
          );

        });
      }

      return (
          <div className="result-list">
           {cardList}
          </div>
      );
	}
}

export default ResultList
