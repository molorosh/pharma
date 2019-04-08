import React, { Component } from 'react';
import DrugSchedule from './DrugSchedule';
import DateTimePicker from './DateTimePicker';

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
            dummyDateString: "2008-08-28T23:30"
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
        // DatePicker events
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    }

    handleDatePickerChange(dateString){
        console.log("handleDatePickerChange(...)");
        console.log("dateString:");
        console.log(dateString);
        this.setState(
            {dummyDateString: dateString}
            , ()=> {
                console.log("finished update");
            }
        );
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
                    <hr></hr>
                    <h4>DateTimePicker</h4>
                    <p>date time data: {this.state.dummyDateString}</p>
                    <DateTimePicker 
                        title="as at"
                        isEdit={false}
                        isEditable={true}
                        value={this.state.dummyDateString}
                        onChange={this.handleDatePickerChange}
                        // updating with a key is a great and simple
                        // way to ensure the child component is redrawn
                        // from scratch if the principal data is changed
                        key={this.state.dummyDateString}
                        >
                    </DateTimePicker>
                    <hr></hr>
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