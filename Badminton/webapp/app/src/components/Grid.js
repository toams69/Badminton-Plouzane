import React from 'react';
import { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import _ from 'lodash'

const styles = {
  rows: {
    cursor: "pointer",
  },
  rowsSelected: {
    background: "rgb(224, 224, 224)"
  }
};
class Grid extends Component {
  state = {
    filter: ""
  };

  componentWillMount() {
    this.setState({
      filter: ""
    });
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps() {
  }

  getColumnFromJson(jsonData) {
    const columns = [];
    jsonData.forEach(data => {
      for (let key of Object.keys(data)) {
        if (columns.indexOf(key) === -1 && key[0] != "_") {
          columns.push(key);
        }
      }
    });
    return columns;
  }

  onFilterChange(e, value) {
    this.setState({filter: value});
  }

  getListBasedOnFilter() {
    const {jsonData} = this.props;
    const list = [];
    let columns = [];
    if (this.props && this.props.columns) {
      columns = this.props.columns;
    } else {
      columns = this.getColumnFromJson(jsonData);
    }
    
    jsonData.forEach(data => {
      let check = this.state.filter ? false : true;
      columns.forEach(c => {
        if (!check && data[c] && typeof data[c].toLowerCase === "function" && data[c].toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1) {
          check = true;
        }
      });
      if (check) {
        list.push(data)
      }
    });
    return list;
  }


  onRowSelection (indexes) {
    const rows = [];
    let list = this.getListBasedOnFilter();
    indexes.forEach(i => {
      rows.push(list[i]);
    });
    this.props.onRowSelection(rows);
  }

	render() {
    const {jsonData} = this.props;

    let columns = [];
    if (this.props && this.props.columns) {
      columns = this.props.columns;
    } else {
      columns = this.getColumnFromJson(jsonData);
    }
    let headerColums = columns.map(function(col) {
      return (<TableHeaderColumn key={col}>{col}</TableHeaderColumn>);
    });

   const bodyRows = [];
   const filter = this.state.filter;
   const {selected} = this.props;

   jsonData.forEach(data => {
      const _columns = [];
      let check = filter ? false : true;
      let isSelected = selected && selected["_id"] === data["_id"]
      columns.forEach(c => {
        _columns.push(<TableRowColumn key={data["_id"] + " " + c}>{data[c]}</TableRowColumn>);
        if (!check && data[c] && typeof data[c].toLowerCase === "function" && data[c].toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
          check = true;
        }
      });
      if (check) {
        bodyRows.push(<TableRow selected={isSelected ? true: false} style={isSelected ? styles.rowsSelected: styles.rows} key={data["_id"]}>{_columns}</TableRow>);
      }
    });

    return (
      <div>
        <TextField onChange={this.onFilterChange.bind(this)}
          hintText="Rechercher"
          floatingLabelText="Rechercher"
        />
        <br />
        <Table
          onRowSelection={this.onRowSelection.bind(this)}
          fixedHeader={true}
          height={this.props.height}
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
            { headerColums}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            { bodyRows }
          </TableBody>
        </Table>

      </div>
    );
	}
}

export default Grid;
