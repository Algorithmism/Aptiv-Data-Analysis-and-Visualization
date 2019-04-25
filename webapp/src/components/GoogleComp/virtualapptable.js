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
function createData(ApplicationName, TotalTime, Uses, MaxTime, MinTime, AverageTime, StandardDeviation) {
  id += 1;
  return { id, ApplicationName, TotalTime, Uses, MaxTime, MinTime,AverageTime,StandardDeviation  };
}

const rows = [];

/*
for (let i = 0; i < 200; i += 1) {
  const randomSelection = data[Math.floor(Math.random() * data.length)];
  console.log(randomSelection);
  rows.push(createData(...randomSelection));
}
*/

const vals = [0,0,0,0,0,0,0];


axios.get('http://localhost:8081/app_usages').then(response => {
   
  response.data.map(event => {
    
    vals[0] = event.application_name;
    vals[2] = event.uses;

    if (event.total_time.hasOwnProperty("minutes")) {
        if (event.total_time.hasOwnProperty("seconds")) {
            vals[1] = (event.total_time.minutes) * (60) + event.total_time.seconds;
        } else {
            vals[1] = (event.total_time.minutes) * (60)
        }
      } else {
        vals[1] = event.total_time.seconds;
    }



    if (event.max_time.hasOwnProperty("minutes")) {
        if (event.max_time.hasOwnProperty("seconds")) {
            vals[3] = (event.max_time.minutes) * (60) + event.max_time.seconds;
        } else {
            vals[3] = (event.max_time.minutes) * (60)
        }
      } else {
        vals[3] = event.max_time.seconds;
    }

      if (event.min_time.hasOwnProperty("minutes")) {
        if (event.min_time.hasOwnProperty("seconds")) {
            vals[4] = (event.min_time.minutes) * (60) + event.min_time.seconds;
        } else {
            vals[4] = (event.min_time.minutes) * (60)
        }
      } else {
        vals[4] = event.min_time.seconds;
      }

      if (event.avg_time.hasOwnProperty("minutes")) {
        if (event.avg_time.hasOwnProperty("seconds")) {
            vals[5] = (event.avg_time.minutes)*60 + event.avg_time.seconds;
        } else {
            vals[5] = (event.avg_time.minutes);
        }
      } else {
        vals[5] = event.avg_time.seconds;
      }

      try {
        if (event.std_dev.hasOwnProperty("seconds")) {
          if (event.std_dev.hasOwnProperty("milliseconds")) {
            vals[6] = (event.std_dev.seconds) + event.std_dev.milliseconds/1000;
          } else {
            vals[6] = (event.std_dev.seconds);
          }
        } else {
            vals[6] = event.std_dev.milliseconds/1000;
        }
      } catch {
        
      }




    rows.push(createData(...vals));
  })

});

function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 550, width: '100%' }}>
      <WrappedVirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={event => console.log(event)}
        columns={[
          {
            width: 60,
            flexGrow: 0.8,
            label: 'ApplicationName',
            dataKey: 'ApplicationName',
          },
          {
            width: 60,
            flexGrow: 0.2,
            label: 'Total Time',
            dataKey: 'TotalTime',
            numeric: true,
          },
          {
            width: 60,
            flexGrow: 0.2,
            label: 'Uses',
            dataKey: 'Uses',
            numeric: true,
          },
          {
            width: 60,
            flexGrow: 0.2,
            label: 'Max Time',
            dataKey: 'MaxTime',
            numeric: true,
          },
          {
            width: 60,
            flexGrow: 0.2,
            label: 'Min Time',
            dataKey: 'MinTime',
            numeric: true,
          },
          {
            width: 60,
            flexGrow: 0.2,
            label: 'Average Time',
            dataKey: 'AverageTime',
            numeric: true,
          },
          {
            width: 60,
            flexGrow: 0.2,
            label: 'Standard Deviation',
            dataKey: 'StandardDeviation',
            numeric: true,
          }
        ]}
      />
    </Paper>
  );
}

export default (ReactVirtualizedTable);