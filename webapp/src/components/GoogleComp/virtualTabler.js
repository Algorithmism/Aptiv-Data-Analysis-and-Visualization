import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import axios from 'axios';


const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };


  EventList(props){
    this.props = props
  }

  state = {
    events: [],
  };

  componentDidMount() {
    axios.get('http://localhost:8081/summary_timeline').then(response => {
      //console.log(response);
      
    });
  }

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                  });
              } else {
                renderer = this.cellRenderer;
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const data = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];

let id = 0;
function createData(EventName, Event, Timestamp, VehicleID, ApplicationID) {
  id += 1;
  return { id, EventName, Event, Timestamp, VehicleID, ApplicationID };
}




class ReactVirtualizedTable extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      holder : '',
      rower: []
    }

    
  }

  async componentDidMount() {
    const rows = [];
    const vals = [0,0,0,0,0,0,0];
    let urler = '';
    if(this.props.postType != "" ) {
      if(this.props.postType !=  "allcars")
      {
        urler = 'http://localhost:8081/summary_timeline'+ "/'"+ this.props.postType + "'";
        this.setState({holder: this.props.postType})
      } else {
        urler = 'http://localhost:8081/summary_timeline';
        
      }
    } else {
        urler = 'http://localhost:8081/summary_timeline';
    } 

    axios.get(urler).then(response => {
       console.log(response.data);
    response.data.map(event => {
      let namer = "";
      try {
        namer = event.application.name;
      } catch {
        
      }
      rows.push(createData(...[event.event_name,event.event,event.timestamp, event.vehicle.name, namer]));
    })

  });

  this.setState({rower: rows})
  } 
  render () {

    if(this.props.postType != this.state.holder) {
      this.componentDidMount();
      this.setState({holder: this.props.postType})
    }
  return (
    <Paper style={{ height: 550, width: '100%' }}>
      <WrappedVirtualizedTable
        rowCount={this.state.rower.length}
        rowGetter={({ index }) => this.state.rower[index]}
        onRowClick={event => console.log(event)}
        columns={[
          {
            width: 60,
            flexGrow: 0.8,
            label: 'EventName',
            dataKey: 'EventName',
          },
          {
            width: 60,
            flexGrow: 0.2,
            label: 'Event',
            dataKey: 'Event',
            numeric: true,
          },
          {
            width: 60,
            flexGrow: 0.2,
            label: 'Timestamp',
            dataKey: 'Timestamp',
            numeric: true,
          },
          {
            width: 60,
            flexGrow: 0.2,
            label: 'VehicleID',
            dataKey: 'VehicleID',
            numeric: true,
          },
          {
            width: 60,
            flexGrow: 0.2,
            label: 'ApplicationID',
            dataKey: 'ApplicationID',
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
  }
}

export default ReactVirtualizedTable;