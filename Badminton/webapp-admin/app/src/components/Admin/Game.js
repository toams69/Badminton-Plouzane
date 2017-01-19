import React from 'react';
import { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import {TextField, RaisedButton, MenuItem, SelectField, Checkbox}from 'material-ui';
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
	"score-input": {
		width: "50px",
		"text-align": "center"
	},
	button: {
		margin: 12,
	},
	form: {
		width: 300
	}
};

export default class Game extends Component {
	state = {
		
	}

	componentWillMount() {
		
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

	renderNumberField ({ input, label, meta: { touched, error }, ...custom }) {
		return (
			<TextField 
				type="number"
				style={styles["score-input"]}
				className="score-input"
				errorText={touched && error}
				{...input}
				{...custom}
			/>
		);
	}

	renderCheckbox ({ input, label }) {

		return (
			<Checkbox label={label}
			checked={input.value ? true : false}
			onCheck={(event, value) => {
				input.onChange(value);
				this.setState({"isDouble": value});
			}} />
		);
	}

	handleTouchTap(event) {
		if (event) {
			event.preventDefault();
		}
	}

	render() {
		const { player1, player2, player3, player4, game, team1, team2} = this.props
		// to do filter list depend on selected
		const teamList = [];
		const teamList2 = [];
		team1._players.forEach(player => {
			teamList.push(<MenuItem value={player._id} primaryText={player.nom + " "+ player.prenom} key={player._id}/>);
		});
		team2._players.forEach(player => {
			teamList2.push(<MenuItem value={player._id} primaryText={player.nom + " "+ player.prenom} key={player._id}/>);
		});
		return (
			<div>
				<Field name={`${game}.isDouble`} component={this.renderCheckbox.bind(this)} label="Double ?"/>
				<table>
					<tr>
						<td>
							<table>
								<tr>
									<td><Field
										name={`${game}.player1`}
										component={this.renderSelectField}
										label="Joueur 1">
										{teamList}
									</Field></td>
								</tr>
								{ this.state.isDouble ? 
								<tr>
									<td><Field
										name={`${game}.player2`}
										component={this.renderSelectField}
										label="Joueur 2">
										{teamList}
									</Field></td>
								</tr>
								 : null}
							</table>
						</td>
						<td>
							<table>
								<tr>
									<td><Field name={`${game}.score11`} component={this.renderNumberField} label="Set 1"/></td>
									<td><Field name={`${game}.score12`} component={this.renderNumberField} label="Set 1"/></td>
								</tr>
								<tr>
									<td><Field name={`${game}.score21`} component={this.renderNumberField} label="Set 2"/></td>
									<td><Field name={`${game}.score22`} component={this.renderNumberField} label="Set 2"/></td>
								</tr>
								<tr>
									<td><Field name={`${game}.score31`} component={this.renderNumberField} label="Set 3"/></td>
									<td><Field name={`${game}.score32`} component={this.renderNumberField} label="Set 3"/></td>
								</tr>
							</table>
						</td>
						<td>
							<table>
								<tr>
									<td><Field
										name={`${game}.player3`}
										component={this.renderSelectField}
										label={ this.state.isDouble ? "Joueur 3": "Joueur 2"}>
										{teamList2}
									</Field></td>
								</tr>
								{ this.state.isDouble ? 
								<tr>
									<td><Field
										name={`${game}.player4`}
										component={this.renderSelectField}
										label="Joueur 4">
										{teamList2}
									</Field></td>
								</tr>
								: null}
							</table>
						</td>
					</tr>
				</table>
				
			</div>
		);
	}
}