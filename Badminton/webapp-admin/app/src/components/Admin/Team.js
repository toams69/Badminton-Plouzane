import React from 'react';
import { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import {TextField, RaisedButton, MenuItem, SelectField, Avatar, Chip}from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Grid from '_components/Grid';
import JsonForm from '_components/JsonForm';
import MultiSelectionDialog from '_components/Admin/MultiSelectionDialog';
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


export default class Team extends Component {
	state = {
		open: false,
		showPlayerDialog: false,
		current: null
	}

	componentWillMount() {
		this.props.getAllClubs();
		this.props.getAllTeams();
		this.props.getAllPlayers();
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
			this.props.change("nom", this.state.current.nom);
			this.props.change("_clubId", this.state.current._clubId);
			this.props.change("_id", this.state.current._id);
			this.props.change("saison", this.state.current.saison);
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


	updateTeam(values) {
		this.props.updateTeam(values).then(() => {
			this.props.reset();
			this.setState({open: false, "showAdd": false, "showEdit": false});
		});
	}


	updateCurrentTeam() {
		this.props.updateTeam(this.state.current).then(() => {
			this.props.reset();
			this.props.getAllTeams();
			this.setState({open: false, "showAdd": false, "showEdit": false});
		});
	}

	onTeamSelected(teams) {
		if (teams && teams.length) {
			this.setState({"current": teams[0]});
		}
	}

	deleteTeam() {
		if (this.props.current && !this.props.current.isNew) {
			this.props.deleteTeam(this.props.current["_id"]).then(() => {
				this.props.getAllClubs();
				this.setState({open: false});
			}, (error) => {
				this.setState({open: false, "showAdd": false, "showEdit": false});
			});
		}
	}


	renderTextField ({ input, label, meta: { touched, error }, ...custom }) {
		return (
			<TextField hintText={label}
				floatingLabelText={label}
				errorText={touched && error}
				{...input}
				{...custom}
			/>
		);
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

	getAddTeamForm() {
		const { handleSubmit, pristine, submitting, clubs, current } = this.props

		const clubList = [];
		clubs.forEach(club => {
			clubList.push(<MenuItem value={club._id} primaryText={club.nom} key={club._id}/>);
		});
		return (
			<form onSubmit={handleSubmit(this.updateTeam.bind(this))}>
				<div>
					<Field name="_clubId" component={this.renderSelectField} label="Club de l'équipe">
						{clubList}
					</Field>
				</div>
				<div>
					<Field name="type" component={this.renderSelectField} label="Type">
						<MenuItem value="Mixte" primaryText="Mixte" />
						<MenuItem value="Homme" primaryText="Homme" />
					</Field>
				</div>
				<div>
					<Field name="nom" component={this.renderTextField} label="Nom de l'équipe"/>
				</div>
				<div>
					<Field name="saison" component={this.renderTextField} label="Saison"/>
				</div>
				<div>
					<RaisedButton label="Annuler" type="reset" style={styles.button} onClick={this.onResetClicked.bind(this)} disabled={submitting}/>
					<RaisedButton label="Valider" primary={true}  type="submit" style={styles.button} disabled={pristine || submitting}/>
				</div>
			</form>
		);
	}

	handlePlayerDelete(player, event) {
		if (this.state.current) {
			this.state.current._players.splice(this.state.current._players.indexOf(player), 1);
			this.forceUpdate();
		}
		if (event) {
			event.preventDefault();
		}
	}

	handleTouchTap(event) {
		if (event) {
			event.preventDefault();
		}
	}


	getPlayersNotInTeam() {
		const array = [];
		const {current} = this.state;
		const {players} = this.props;

		players.forEach(p => {
			if (!current || !current._players || !_.find(current._players, function(_p){ return _p._id === p._id; })) {
				array.push({value: p._id, key: p.nom + " " + p.prenom});
			}
		});
		return array;
	}

	onAddPlayersClicked(delegateEvents) {
		this.setState({"showPlayerDialog": true});
	}

	onCloseAddPlayerDialog(event) {
		this.setState({"showPlayerDialog": false});
	}

	onAddPlayersFinished(playerIds) {
		const {current} = this.state;
		const {players} = this.props;
		if (current && playerIds && current._players) {
			const toAdd = _.filter(players, function(p) {
				return playerIds.indexOf(p._id) != -1;
			});
			_.each(toAdd, function(p) {
				current._players.push(p);
			});
		}


		this.setState({"showPlayerDialog": false});
	}



	render() {
		const {clubs, error, teams} = this.props;
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
				onTouchTap={this.deleteTeam.bind(this)}
			/>,
		];

		actions.push(
				<IconButton tooltip="Ajouter une équipe" touch={true} key={"add"} onClick={this.onAddClicked.bind(this)}>
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

		const _teams = [];
		teams.forEach(t => {
			_teams.push({
				_id: t._id,
				nom: t.nom,
				type: t.type,
				saison: t.saison,
				_clubId: t._clubId._id,
				club: t._clubId.nom,
				_players: t._players
			});
		});

		const _players = [];
		if (current) {
			current._players.forEach(p => {
				_players.push(
					<Chip
						onRequestDelete={this.handlePlayerDelete.bind(this, p)}
						onTouchTap={this.handleTouchTap}
						style={styles.chip}
						key={p._id}	
						>
						<Avatar color="#444" icon={<SvgIconFace />} />
						{p.nom + " " + p.prenom}
					</Chip>
				);
			});
		}



		return (
			<div style={styles.container}>
				<Grid jsonData={_teams} onRowSelection={this.onTeamSelected.bind(this)} height={gridHeight} selected={current}/>
				<br/>
				<div>{
					!this.state.showAdd ? actions : null
				}</div>
				<br/>
				<div>
				{
					this.state.showAdd ?
					<div>
					Ajout de club
					</div>: null
				}
				{
					this.state.showEdit ?
					<div>
					Edition de club
					</div>: null
				}
				{
					this.state.showAdd || this.state.showEdit ?
					<div>
					{this.getAddTeamForm()}
					</div>: null
				}
				</div>


				{
					this.state.current && !this.state.showAdd && !this.state.showEdit ?
						<div>
							Composition Equipe
							<div style={styles.chipContainer}>
							{_players}
							</div>




							<MultiSelectionDialog open={this.state.showPlayerDialog} 
								title="Sélectionez un ou plusieurs joueurs"
								array={this.getPlayersNotInTeam()}
								onSubmit={this.onAddPlayersFinished.bind(this)}
								onClose={this.onCloseAddPlayerDialog.bind(this)}
							/>


							<div>
								<RaisedButton label="Ajouter Joueur" secondary={true}  style={styles.button} onTouchTap={this.onAddPlayersClicked.bind(this)}/>
								<RaisedButton label="Valider Composition" primary={true}  style={styles.button} onTouchTap={this.updateCurrentTeam.bind(this)} />
							</div>
						</div>
					: null
				}




				<Dialog
					title="Suppression d'équipe"
					actions={dialog_actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					Etes vous sur de vouloir supprimer cette équipe ?
				</Dialog>
			</div>
		);
	}
}