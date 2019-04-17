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

var holder = 0;
class EventList extends React.Component{

  EventList(props){
    this.props = props
  }

  state = {
    events: [],
  };

  componentDidMount() {
    axios.get('http://localhost:8081/app_usages').then(response => {
      //console.log(response);
      this.setState({events: response.data})
    });

    /*
    this.state.events.map(event => {
      uses.push(event.uses);
      idd.push(event.vehicle_name +  " -- " + event.application_name);
    })
    */
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
              <TableCell>Application Name</TableCell>
              <TableCell align="right">Total Time</TableCell>
              <TableCell align="right">Uses</TableCell>
              <TableCell align="right">Max Time</TableCell>
              <TableCell align="right">Min Time</TableCell>
              <TableCell align="right">Average Time</TableCell>
              <TableCell align="right">Standard Deviation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.events.map(event =>
            <TableRow key = {holder++}>

              <TableCell>{event.application_name}</TableCell>
              <TableCell>
              {event.total_time.hasOwnProperty("minutes") ? (
                event.total_time.hasOwnProperty("seconds") ? (
                  event.total_time.minutes*60 + event.total_time.seconds
                ) : (
                  event.total_time.minutes*60
                )
              ) : (
                event.total_time.seconds
              )}
              </TableCell>
              <TableCell>{event.uses}</TableCell>
              <TableCell>
              {event.max_time.hasOwnProperty("minutes") ? (
                event.max_time.hasOwnProperty("seconds") ? (
                  event.max_time.minutes*60 + event.max_time.seconds
                ) : (
                  event.max_time.minutes*60
                )
              ) : (
                event.max_time.seconds
              )}
              </TableCell>

              <TableCell>
              {event.min_time.hasOwnProperty("minutes") ? (
                event.min_time.hasOwnProperty("seconds") ? (
                  event.min_time.minutes*60 + event.min_time.seconds
                ) : (
                  event.min_time.minutes*60
                )
              ) : (
                event.min_time.seconds
              )}
              </TableCell>

              <TableCell>
              {
                event.avg_time.hasOwnProperty("minutes") ? (
                event.avg_time.hasOwnProperty("seconds") ? (
                  event.avg_time.minutes*60 + event.avg_time.seconds
                ) : (
                  event.avg_time.minutes*60
                )
              ) : (
                event.avg_time.seconds
              )}
              </TableCell>

              <TableCell>
              {
              event.std_dev ? (
                event.std_dev.hasOwnProperty("seconds") ? (
                  event.std_dev.hasOwnProperty("milliseconds") ? (
                    event.std_dev.seconds*60 + event.std_dev.milliseconds
                  ) : (
                    event.std_dev.seconds*60
                  )
                ) : (
                  event.std_dev.milliseconds
                )
                ) : (
                  "Not Collected"
                )
              }
              </TableCell>
             
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
