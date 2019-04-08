import React, { Component } from 'react';
//import { parentPort } from 'worker_threads';

class DrugSchedule extends Component {
    
    /*
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            hour: props.hour,
            minute: props.minute,
            amount: props.amount,
            everyNdays: props.everyNdays,
            isChanged: false,
        };
    }
    */

    formatTo00(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }

    render(){
        const hh = Array.from(Array(24).keys());
        const hours = hh.map((n) => <option key={n} value={n}>{this.formatTo00(n)}</option>);
        const mm = Array.from(Array(60).keys());
        const minutes = mm.map((n) => <option key={n} value={n}>{this.formatTo00(n)}</option>);
        const dd = Array.from(Array(14).keys());
        const days = dd.map((n) => <option key={n+1} value={n+1}>{n+1}</option>);
        return (
            <div>
                <p>
                    key:{this.props.id} 
                    |
                    Hour:{this.props.hour} 
                    <select >{hours}</select>
                    |
                    Minute:{this.props.minute} 
                    <select>{minutes}</select>
                    | 
                    Every <select>{days}</select> Days
                    | 
                    Amount:{this.props.amount} 
                    | 
                    ({this.props.unit}) 
                    |
                    <button>Update</button>
                    |
                    <button>Delete</button>
                </p>
            </div>
        );
    }
}

export default DrugSchedule;