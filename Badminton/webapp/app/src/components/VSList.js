import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import ComparisonBar from '_components/ComparisonBar.js';
import _ from 'lodash';

import {
  green300,
  red300,
  transparent
} from 'material-ui/styles/colors';

class VSList extends Component {

  componentWillMount() {
   
  }

  componentWillReceiveProps(nextProps) {

  }


  getVersus() {
    const {playerID, games} = this.props;
    const obj = {simples:[], doubles:[]};

    if (games) {
        const _doubles = _.filter(games, function(g) {
          return g._player2Id || g._player4Id;
        });
        const _simples = _.filter(games, function(g) {
          return !g._player2Id && !g._player4Id;
        });

        _.each(_simples, function(g) {
          let nbSetL =0, nbSetV = 0;
          nbSetL += g.score11 > g.score12 ? 1 : 0;
          nbSetV += g.score11 < g.score12 ? 1 : 0;
          nbSetL += g.score21 > g.score22 ? 1 : 0;
          nbSetV += g.score21 < g.score22 ? 1 : 0;
          nbSetL += (g.score31 || g.score32) && g.score31 > g.score32 ? 1 : 0;
          nbSetV += (g.score31 || g.score32) && g.score31 < g.score32 ? 1 : 0;
          const adversaire = g._player1Id._id === playerID ? g._player3Id : g._player1Id;
          
          let find = _.find(obj.simples, function(g) {
            return g.adversaire._id === adversaire._id;
          });
          if (!find) {
            find = {
              adversaire: adversaire,
              victoires: 0,
              nbSetPour: 0,
              nbSetContre: 0,
              ptsPour: 0,
              ptsContre: 0,
              defaites: 0
            };
            obj.simples.push(find);
          }
          if (g._player1Id._id === playerID) {
            find.victoires += nbSetL > nbSetV ? 1 : 0;
            find.defaites += nbSetL < nbSetV ? 1 : 0;
            find.nbSetPour += nbSetL;
            find.nbSetContre += nbSetV;
            find.ptsPour += g.score11;
            find.ptsPour += g.score21;
            find.ptsPour += g.score31 ? g.score31 : 0;
            find.ptsContre += g.score12;
            find.ptsContre += g.score22;
            find.ptsContre += g.score32 ? g.score32 : 0;
          } else {
            find.victoires += nbSetL < nbSetV ? 1 : 0;
            find.defaites += nbSetL > nbSetV ? 1 : 0;
            find.nbSetPour += nbSetV;
            find.nbSetContre += nbSetL;
            find.ptsContre += g.score11;
            find.ptsContre += g.score21;
            find.ptsContre += g.score31 ? g.score31 : 0;
            find.ptsPour += g.score12;
            find.ptsPour += g.score22;
            find.ptsPour += g.score32 ? g.score32 : 0;
          }
        }, this);
      }
  
    return obj;
  }

 
	render() {
      var avatar = <Avatar color={green300} backgroundColor={transparent} icon={<FontIcon className="material-icons" >thumb_up</FontIcon>} />;
      var avatar2 = <Avatar color={red300} backgroundColor={transparent} icon={<FontIcon className="material-icons" >thumb_down</FontIcon>} />;
      
      const versus = this.getVersus();
      const cardList = [];

      _.each(versus.simples, function(v) {
         cardList.push(
             <Card className="result-card">
                <CardHeader
                  title={v.adversaire.prenom + " " +v.adversaire.nom}
                  subtitle= {v.victoires +" victoire(s) "+ v.defaites +" défaite(s)"}
                  avatar={v.victoires > v.defaites ? avatar : avatar2}
                  actAsExpander={true}
                  showExpandableButton={false}
                />
                <CardActions>
                </CardActions>
                <CardText expandable={true}>
                  <div>Victoires : {v.victoires}</div>
                  <div>Défaites : {v.defaites}</div>
                  <ComparisonBar val1={v.victoires} val2={v.defaites} />
                  <div>Sets remportés : {v.nbSetPour}</div>
                  <div>Sets perdus : {v.nbSetContre}</div>
                  <div>Point marqués: {v.ptsPour}</div>
                  <div>Point pris: {v.ptsContre}</div>
                </CardText>
              </Card>
          );
      }, this);

      return (
          <div className="versus-list">
           {cardList}
          </div>
      );
	}
}

export default VSList
