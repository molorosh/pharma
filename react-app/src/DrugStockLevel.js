import React, { Component } from 'react';

class DrugStockLevel extends Component {
    constructor(props){
        super(props);
        this.state = {
            amount: props.amount,
            asAt: props.asAt
        };
    }

    render(){
        return(
            <div><code>DrugStockTake</code></div>
        );
    }
}

export default DateTimePicker;