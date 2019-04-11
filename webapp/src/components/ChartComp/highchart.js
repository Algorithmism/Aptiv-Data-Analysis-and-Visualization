import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
    chart: {
        renderTo: 'container',
        type: 'bar',
        width: "1000"
    },
    title: {
        text: 'Height Versus Weight of 507 Individuals by Gender'
    },
    subtitle: {
        text: 'Source: Heinz  2003'
    },
    xAxis: {
        categories: ['f1', 'f2', 'f3']
    },
    series: [ {
        name: 'max',
        stacking: true,
        color: 'red',
        data: [
            [100],
            [120],
            [50]
        ]
    }, {
        name: 'min',
        stacking: true,
        color: 'blue',
        data: [
            [13],
            [50],
            [1]
        ]
    }, {
        type: 'scatter',
        name: 'avg',
        color: 'black',
        data: [
            [44],
            [55],
            [12]
        ]
    }]
};


class Bill extends React.Component {



    render() {
        return (
            <div id="biller">
                <HighchartsReact highcharts={Highcharts} options={options} width="1200" />
            </div>
        );
    }
}


export default Bill;