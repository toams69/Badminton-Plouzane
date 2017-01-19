import React from 'react';
import { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form'
import {TextField, RaisedButton, MenuItem, SelectField, DatePicker}from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import SvgIconFace from 'material-ui/svg-icons/action/face';

import Grid from '_components/Grid';
import JsonForm from '_components/JsonForm';
import MultiSelectionDialog from '_components/Admin/MultiSelectionDialog';
import Game from '_components/Admin/Game';
import uuid from 'uuid';
import _ from 'lodash';

const styles = {
  container: {
    background: "white",
    padding: "0 50px 50px 50px"
  },
  chip: {
    margin: 4,
    float: "left"
  },
  chipContainer: {
    width: "100%",
    float: "left"
  },
  button: {
    margin: 12,
  }
};


export default class Contest extends Component {
  state = {
    open: false,
    showPlayerDialog: false,
    current: null
  }

  componentWillMount() {
    this.props.getAllClubs();
    this.props.getAllContests();
    this.props.getAllTeams();
  }

  onDeleteClicked(e) {
    e.preventDefault();
    this.setState({open: true});
  }

  onAddClicked(e) {
    this.setState({"showAdd": true, "showEdit": false, current: null});
    this.props.reset();
  }

  onEditClicked () {
    if (this.state.current) {
      
    }
    this.setState({"showEdit": true});
  }

  handleClose = () => {
    this.setState({open: false});
  };

  onResetClicked() {
    this.setState({"showAdd": false, "showEdit": false});
    this.props.reset();
  }


  updateContest(values) {
    this.props.updateContest(values).then(() => {
      this.props.reset();
      this.setState({open: false, "showAdd": false, "showEdit": false});
    });
  }


  updateCurrentGame() {
    // this.props.updateTeam(this.state.current).then(() => {
    //  this.props.reset();
    //  this.props.getAllTeams();
    //  this.setState({open: false, "showAdd": false, "showEdit": false});
    // });
  }

  deleteContest() {
    if (this.state.current && !this.state.current.isNew) {
      this.props.deleteContest(this.state.current["_id"]).then(() => {
        this.props.getAllContests();
        this.setState({open: false});
      }, (error) => {
        this.setState({open: false, "showAdd": false, "showEdit": false});
      });
    }
  }

  onContestSelected(contests) {
    if (contests && contests.length) {
      this.setState({"current": contests[0]});
    }
  }

  renderSelectField ({ input, label, meta: { touched, error }, children, ...custom }) {
    return (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    );
  }

  renderDateField ({ input, label, meta: { touched, error }, ...custom }){
    return (
        <DatePicker
          floatingLabelText={label}
          onChange={(e, val) => {return input.onChange(val)}}
          {...custom}
          value={input.value}
        />
    )
  }

  renderGames ({ fields, meta: { touched, error } })  { 
   const {locaux, teams, visiteurs} = this.props;
   if (!locaux || !visiteurs) {
    return <ul></ul>;
   }
    return (
      <ul className="game-list">
        <li>
          <IconButton tooltip="Ajouter un match" touch={true} key={"add"} onClick={() => fields.push({})}>
            <FontIcon className="material-icons" style={{fontSize: '48px'}}>add_circle</FontIcon>
          </IconButton>
          {touched && error && <span>{error}</span>}
        </li>
        {fields.map((game, index) => {
          
          let team1 = _.find(teams, function(f) {
            return f._id === locaux;
          });
          let team2 = _.find(teams, function(f) {
            return f._id === visiteurs;
          })

          return (
          <li key={index} className="game-container">
            <IconButton className="btn-supp" tooltip="Supprimer" touch={true} onClick={() => fields.remove(index)} >
              <FontIcon className="material-icons" style={{fontSize: '48px'}}>delete</FontIcon>
            </IconButton>
            
            <h4>Match #{index + 1}</h4>
            <Game game={game} values={this.props} team1={team1} team2={team2}/>
          </li>);
        }
        )}
      </ul>
    )
  }

  getAddGameForm() {
    const { handleSubmit, pristine, submitting, teams, current, typeSelected, visiteurs, locaux, games} = this.props

    const teamList = [];
    const teamList2 = [];
    teams.forEach(team => {
      if ((!typeSelected || typeSelected === team.type) && team._id != visiteurs) {
        teamList.push(<MenuItem value={team._id} primaryText={team.nom} key={team._id}/>);
      }
    });
    teams.forEach(team => {
      if ((!typeSelected || typeSelected === team.type) && team._id != locaux) {
        teamList2.push(<MenuItem value={team._id} primaryText={team.nom} key={team._id}/>);
      }
    });
    return (
      <form onSubmit={handleSubmit(this.updateContest.bind(this))}>

        <div>
          <Field name="date" component={this.renderDateField} label="Date de la rencontre"/>
        </div>
        <div>
          <Field name="type" component={this.renderSelectField} label="Type de rencontre">
            <MenuItem value="Mixte" primaryText="Mixte" />
            <MenuItem value="Homme" primaryText="Homme" />
          </Field>
        </div>

        <div>
          <Field name="team1Id" component={this.renderSelectField} label="Locaux">
            {teamList}
          </Field>
        </div>
        <div>
          <Field name="team2Id" component={this.renderSelectField} label="Visiteurs">
            {teamList2}
          </Field>
        </div>
        <FieldArray name="games" component={this.renderGames.bind(this)}/>
        <div>
          <RaisedButton label="Annuler" type="reset" style={styles.button} onClick={this.onResetClicked.bind(this)} disabled={submitting}/>
          <RaisedButton label="Valider" primary={true}  type="submit" style={styles.button} disabled={pristine || submitting}/>
        </div>
      </form>
    );
  }

  handleTouchTap(event) {
    if (event) {
      event.preventDefault();
    }
  }


  render() {
    const {clubs, error, teams, contests} = this.props;
    const {current} = this.state;
    let actions = [];

    const dialog_actions = [
      <RaisedButton
        label="Annuler"
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Confirmer"
        primary={true}
        onTouchTap={this.deleteContest.bind(this)}
      />,
    ];

    actions.push(
        <IconButton tooltip="Ajouter une rencontre" touch={true} key={"add"} onClick={this.onAddClicked.bind(this)}>
          <FontIcon className="material-icons" style={{fontSize: '48px'}}>add_circle</FontIcon>
        </IconButton>
      );

    if (current) {
      actions.push(
        <IconButton tooltip="Plus d'info" touch={true} key={current["_id"]+ "view"}  >
          <FontIcon className="material-icons" style={{fontSize: '48px'}}>visibility</FontIcon>
        </IconButton>
      );
      actions.push(
        <IconButton tooltip="Editer" touch={true} key={current["_id"] + "edit"} onClick={this.onEditClicked.bind(this)}>
          <FontIcon className="material-icons" style={{fontSize: '48px'}}>create</FontIcon>
        </IconButton>
      );
      actions.push(
        <IconButton tooltip="Supprimer" touch={true} key={current["_id"]+ "delete"} onClick={this.onDeleteClicked.bind(this)} >
          <FontIcon className="material-icons" style={{fontSize: '48px'}}>delete</FontIcon>
        </IconButton>
      );
    }

    let gridHeight = teams && teams.length >= 4 ? "200px" : null;

    const _games = [];
    const _players = [];



    return (
      <div style={styles.container}>
        <Grid jsonData={contests} onRowSelection={this.onContestSelected.bind(this)} height={gridHeight} selected={current}/>
        <br/>
        <div>{
          !this.state.showAdd ? actions : null
        }</div>
        <br/>
        <div>
        {
          this.state.showAdd ?
          <div>
          Ajout de rencontre
          </div>: null
        }
        {
          this.state.showEdit ?
          <div>
          Edition de la rencontre
          </div>: null
        }
        {
          this.state.showAdd || this.state.showEdit ?
          <div>
          {this.getAddGameForm()}
          </div>: null
        }
        </div>


        {
          this.state.current && !this.state.showAdd && !this.state.showEdit ?
            <div>
              Detail de la rencontre
              
            </div>
          : null
        }




        <Dialog
          title="Suppression de rencontre"
          actions={dialog_actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Etes vous sur de vouloir supprimer cette rencontre ?
        </Dialog>
      </div>
    );
  }
}