import React from 'react'
import SearchBar from './searchbar'

import indexStyles from './index.module.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            graph_data: []
        };
        
    }
    handleClick = (e) => {
        e.preventDefault();
        console.log('The link was clicked.');
        this.setState((state, props) => ({value: state.value + 1}));
    }
    handleSearchBar = (value) => {
        console.log(value);
        fetch("/grocery/data/" + encodeURIComponent(value))
            .then((res) => res.json())
            .then(json => {
                console.log(json);
                this.setState({graph_data: json});
            })
    }
    render = () => {
        var testData = {test: "test"};
        return (
            <div id={indexStyles.container}>
                <div id={indexStyles.header}>Grocery Sales Over Time</div>
                <div id={indexStyles.searchContainer}>
                    <SearchBar callback={this.handleSearchBar}/>
                </div>
                <div id={indexStyles.graphContainer}>
                    <LineChart width={600} height={300} data={this.state.graph_data}>
                        <Line type="monotone" dataKey='price'/>
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="start" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
            </div>
        );
    }
}

export default Index;