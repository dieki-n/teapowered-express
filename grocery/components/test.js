import React from 'react'

class TestCounter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        };
    }
  
    render() {
        return (
            <div>
                <h1>{ this.state.count }</h1>
            </div>
        );
    }
}

export default TestCounter;