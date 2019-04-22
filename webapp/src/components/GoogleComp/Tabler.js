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

  EventList(props){
    this.props = props
  }

  state = {
    events: [],
  };

  componentDidMount() {
    axios.get('http://localhost:8081/summary_timeline').then(response => {
      //console.log(response);
      this.setState({events: response.data})
    });

    this.state.events.map(event => {
      //uses.push(event.uses);
      //idd.push(event.vehicle_name +  " -- " + event.application_name);
    })
  }

  render() {
    //const { classes } = this.props;
    //console.log(this.state.events);
    //return this.state.vehicles;
    return (
      <Paper >
        <Table >
          <TableHead>
            <TableRow>
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
              {event.event_name}
            </TableCell>
            <TableCell align="right">{event.event}</TableCell>
            <TableCell align="right">{event.timestamp}</TableCell>
            <TableCell align="right">{event.vehicle.name}</TableCell>
            <TableCell align="right">{
              event.application != undefined ? (
                    event.application.name
                  ) : (
                    "None"
                  )
            }</TableCell>
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
    //marginTop: theme.spacing.unit * 3,
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

function SimpleTable(props) {

  return (
    <EventList/>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(SimpleTable);
