import React from 'react';
import { Component } from 'react';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
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

export default class Club extends Component {
	state = {
		clubSelected: []
	}

	componentWillMount() {
		this.setState({clubSelected: []});
		this.props.getAllClubs();
	}


	onClubSelected(clubs) {
		setTimeout(function() {
			console.log(clubs)
			this.setState({clubSelected: clubs}); 
		}.bind(this), 100);
	}

	onDeleteClicked(e) {
		e.preventDefault();
		if (this.state.clubSelected && this.state.clubSelected.length) {
			this.props.deleteClub(this.state.clubSelected[0]["_id"]).then(() => {
        		this.props.getAllClubs();
      		}, (error) => {
      
      		});
		}
	}

	onAddClicked(e) {
		this.setState({"showAdd": true});
	}

	onResetClicked() {
		this.props.resetClub();
		this.setState({"showAdd": false});
	}

	render() {
		const {clubs, error, newClub} = this.props;
		let actions = [];
		actions.push(
				<IconButton tooltip="Ajouter un club" touch={true} key={"add"} onClick={this.onAddClicked.bind(this)}>
					<FontIcon className="material-icons" style={{fontSize: '48px'}}>add_circle</FontIcon>
				</IconButton>
			);
		if (this.state && this.state.clubSelected && this.state.clubSelected.length) {
			actions.push(
				<IconButton tooltip="Plus d'info" touch={true} key={this.state.clubSelected["_id"]}  >
					<FontIcon className="material-icons" style={{fontSize: '48px'}}>visibility</FontIcon>
				</IconButton>
			);
			actions.push(
				<IconButton tooltip="Editer" touch={true} key={this.state.clubSelected["_id"]} >
					<FontIcon className="material-icons" style={{fontSize: '48px'}}>create</FontIcon>
				</IconButton>
			);
			actions.push(
				<IconButton tooltip="Supprimer" touch={true} key={this.state.clubSelected["_id"]} onClick={this.onDeleteClicked.bind(this)} >
					<FontIcon className="material-icons" style={{fontSize: '48px'}}>delete</FontIcon>
				</IconButton>
			);
		}

		return (
			<div style={styles.container}>
				<Grid jsonData={clubs} onRowSelection={this.onClubSelected.bind(this)} selected={this.state.clubSelected}/>
				<br/>
				<div>{
					!this.state.showAdd ? actions : null
				}</div>
				<br/>
				<div>
				{
					this.state.showAdd ?
					<JsonForm jsonForm={newClub} style={styles.form} 
						submitAction={this.props.addClub}
						resetAction={this.onResetClicked.bind(this)}
						errors={error ? error.errors : null}
						updateField={this.props.updateClub}
						key= {newClub.uuid}
					/> : null
				}
				</div>
			</div>
		);
	}
}