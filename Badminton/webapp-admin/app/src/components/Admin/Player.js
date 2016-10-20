import React from 'react';
import { Component } from 'react';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Grid from '_components/Grid';
import JsonForm from '_components/JsonForm';

const styles = {
	container: {
		background: "white",
		padding: "0 50px 50px 50px"
	},
	button: {
		margin: 12,
	},
	form: {
		width: 300
	}
};

export default class Player extends Component {
	state = {
		open: false
	}

	componentWillMount() {
		this.props.getAllPlayers();
	}


	onPlayerSelected(players) {
		setTimeout(function() {
			if (!this.state.open && players && players.length) {
				this.props.getPlayer(players[0]);
			}
		}.bind(this), 100);
	}

	onDeleteClicked(e) {
		e.preventDefault();
		this.setState({open: true});
	}

	onAddClicked(e) {
		this.props.resetPlayer();
		this.setState({"showAdd": true});
	}

	onEditClicked () {
		this.setState({"showEdit": true});

	}

	handleClose = () => {
		this.setState({open: false});
	};

	onResetClicked() {
		this.props.resetPlayer();
		this.setState({"showAdd": false, "showEdit": false});
	}

	deletePlayer() {
		if (this.props.current && !this.props.current.isNew) {
			this.props.deletePlayer(this.props.current["_id"]).then(() => {
				this.props.getAllPlayers();
				this.setState({open: false});
			}, (error) => {
				this.setState({open: false, "showAdd": false, "showEdit": false});
			});
		}
	}

	updatePlayer() {
		this.props.updatePlayer(this.props.current).then(() => {
			this.setState({open: false, "showAdd": false, "showEdit": false});
		});
	}

	render() {
		const {players, error, current, jsonForm} = this.props;
		let actions = [];

		const dialog_actions = [
			<RaisedButton
				label="Annuler"
				onTouchTap={this.handleClose}
			/>,
			<RaisedButton
				label="Confirmer"
				primary={true}
				onTouchTap={this.deletePlayer.bind(this)}
			/>,
		];

		actions.push(
				<IconButton tooltip="Ajouter un joueur" touch={true} key={"add"} onClick={this.onAddClicked.bind(this)}>
					<FontIcon className="material-icons" style={{fontSize: '48px'}}>add_circle</FontIcon>
				</IconButton>
			);
		if (current && !current.isNew) {
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

		return (
			<div style={styles.container}>
				<Grid jsonData={players} onRowSelection={this.onPlayerSelected.bind(this)} selected={current}/>
				<br/>
				<div>{
					!this.state.showAdd ? actions : null
				}</div>
				<br/>
				<div>
				{
					this.state.showAdd || this.state.showEdit ?
					<JsonForm jsonForm={jsonForm} current={current} style={styles.form} 
						submitAction={this.updatePlayer.bind(this)}
						title= {this.state.showAdd ? "Ajouter un joueur" : "Edition d'un joueur"}
						resetAction={this.onResetClicked.bind(this)}
						errors={error ? error.errors : null}
						updateField={this.props.updateField}
					/> : null
				}
				</div>
				<Dialog
					title="Suppression de joueur"
					actions={dialog_actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					Etes vous sur de vouloir supprimer ce joueur ?
				</Dialog>
			</div>
		);
	}
}