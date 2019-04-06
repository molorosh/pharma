import React, { Component } from 'react';
import DrugSchedule from './DrugSchedule';

class Drug extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            unit: "",
            amount: 28,
            timestamp: undefined, 
            schedules: [],  
            nextId: 1,
        }
        // drug events
        this.handleChangeUnit = this.handleChangeUnit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        // schedule events
        this.addNewSchedule = this.addNewSchedule.bind(this);
        this.handleDrugScheduleDelete = this.handleDrugScheduleDelete.bind(this);
        this.handleDrugScheduleUpdate = this.handleDrugScheduleUpdate.bind(this);
    }

    handleChangeUnit(event){
        this.setState({unit: event.target.value});
    }

    handleChangeName(event){
        this.setState({name: event.target.value});
    }

    handleChangeAmount(event){
        this.setState({amount: event.target.value});
    }

    handleFormSubmit(event){
        event.preventDefault();
    }

    addNewSchedule(){
        let nextId = this.state.nextId + 1;
        let newSchedule = {hour:12, minute:20, amount: 3, everyNdays: 3, id: nextId};
        this.setState(
            { 
                schedules: this.state.schedules.concat(newSchedule),
                nextId: nextId,
            }
        );
    }

    handleDrugScheduleDelete(id){
        alert("delete " + id);
    }

    handleDrugScheduleUpdate(id, newHour, newMinute, newAmount, newEveryNDays){
        alert("upd8 " + id + " " + newHour + " " + newMinute + " " + newAmount + " " + newEveryNDays);
    }

    render(){
        const units = this.props.units.slice();
        const schedules = this.state.schedules.slice();
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <p>
                        name: 
                        <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                    </p>
                    <p>
                        amount: 
                        <input type="number" value={this.state.amount} onChange={this.handleChangeAmount} />
                        <select value={this.state.unit} onChange={this.handleChangeUnit}>
                            {units.map((e, key) => {
                                return <option key={key} value={e}>{e} ({key})</option>;
                            })}
                        </select>
                    </p>
                    <p>as at: {this.state.timestamp}</p>
                    <p><input type="datetime" /></p>
                    <h2>Schedules</h2>
                    <p><button onClick={this.addNewSchedule}>Add Schedule</button></p>
                    {
                        schedules.map(
                            (e, key) => {
                                return <DrugSchedule 
                                    key={e.id} 
                                    id={e.id} 
                                    hour={e.hour} 
                                    minute={e.minute} 
                                    amount={e.amount} 
                                    unit={this.state.unit} 
                                ></DrugSchedule>;
                            }
                        )
                    }
                </form>
            </div>
        );
    }
}

export default Drug;