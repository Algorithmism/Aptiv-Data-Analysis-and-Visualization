import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


class EventList extends React.Component{


  state = {
    events: [],
  };

  componentDidMount() {
    axios.get('http://localhost:8081/summary_timeline').then(response => {
      console.log(response);
      this.setState({events: response.data})
    });
  }
  render(props) {
    const { classes } = this.props;
    console.log(this.state.events);
    //return this.state.vehicles;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell align="right">Event</TableCell>
              <TableCell align="right">Timestamp</TableCell>
              <TableCell align="right">Vehicle ID</TableCell>
              <TableCell align="right">Application ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.events.map(event =>
            <TableRow key = {event.id}>
            <TableCell component="th" scope="row">
              {event.id}
            </TableCell>
            <TableCell align="right">{event.event_name}</TableCell>
            <TableCell align="right">{event.event}</TableCell>
            <TableCell align="right">{event.timestamp}</TableCell>
            <TableCell align="right">{event.vehicle_id}</TableCell>
            <TableCell align="right">{event.application_id}</TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </Paper>




    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}
/*
const rows = VehicleList;
console.log(rows);
*/
/*
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
*/
function SimpleTable() {


  return (
    <EventList/>
    /*
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat (g)</TableCell>
            <TableCell align="right">Carbs (g)</TableCell>
            <TableCell align="right">Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    */
  );
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(EventList);
