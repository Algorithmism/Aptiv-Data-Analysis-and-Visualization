import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';

class BarAverage extends React.Component {

    constructor(props) {
        
        super(props);

        this.state = {
            holder: '',
            options: {
                chart: {
                    width: "1000",
                    height: "700"
                },
                title: {
                    text: 'App Usages'
                },
                xAxis: {
                    categories: []
                },
                series: [{
                    type: 'bar',
                    name: 'max',
                    stacking: true,
                    color: 'red',
                    data: [0, 1, 1, 5, 5]
                }, {
                    type: 'bar',
                    name: 'min',
                    stacking: true,
                    color: 'blue',
                    data: [0, 1, 2, 5, 5]
                }, {
                    type: 'scatter',
                    name: 'avg',
                    color: 'black',
                    data: [0, 64, 46, 1, 5]
                }]
            }
        }
    }

    async componentDidMount() {
        let urler = '';
        if(this.props.postType != "" || this.props.postType ==  "allcars") {
            urler = 'http://localhost:8081/app_usages'+ "/'"+ this.props.postType + "'";
            this.setState({holder: this.props.postType})
        } else {
            urler = 'http://localhost:8081/app_usages';
        }
        console.log(urler);
        const response = await axios.get(urler);
        const events = response.data;
        const maxer = [];
        const miner = [];
        const names = [];
        const avrs = [];

        events.forEach(event => {
            maxer.push(event.max_time);
            miner.push(event.min_time);
            names.push(event.application_name);
            avrs.push(event.avg_time);
        });

        for (let i = 0; i < maxer.length; i++) {

            if (maxer[i].hasOwnProperty("minutes")) {
                maxer[i] = (maxer[i].minutes) * (60) + maxer[i].seconds;
            } else {
                maxer[i] = maxer[i].seconds;
            }

            if (miner[i].hasOwnProperty("minutes")) {
                miner[i] = (miner[i].minutes) * (60) + miner[i].seconds;
            } else {
                miner[i] = miner[i].seconds;
            }

            if (avrs[i].hasOwnProperty("milliseconds")) {
                avrs[i] = (avrs[i].milliseconds)/1000 + avrs[i].seconds;
            } else {
                avrs[i] = avrs[i].seconds;
            }
        }
        const options = this.state.options;
        options.series[0].data = maxer;
        options.series[1].data = miner;
        options.series[2].data = avrs;
        options.xAxis.categories = names;
        this.setState({ options });
    }

    render() {
        // const cb = function () { console.log('I was called') };
        if(this.props.postType != this.state.holder) {
            this.componentDidMount();
            this.setState({holder: this.props.postType})
        }
        return (
            <div id="biller">
                <HighchartsReact highcharts={Highcharts} options={{ ...this.state.options }} />
            </div>
        );
    }
}


export default BarAverage;