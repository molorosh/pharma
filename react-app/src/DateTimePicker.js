import React, { Component } from 'react';

// note: the guidance on component updating has changed
// see https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops

// so componentWillReceiveProps(nextProps) {...} is considerd UNSAFE 
// and will be removed in React.js v 17

// 

class DateTimePicker extends Component {
    constructor(props){
        console.log("constructor(DateTimePicker.js)");
        super(props);
        let hours = undefined;
        let year = undefined;
        let minutes = undefined;
        let day = undefined;
        let month = undefined;
        let valueDate = this.dateFromFormattedString(props.value);
        if(valueDate !== null){
            hours = valueDate.getHours();
            year = valueDate.getFullYear();
            month = 1 + valueDate.getMonth();
            minutes = valueDate.getMinutes();
            day = valueDate.getDate();
        }
        this.state = {
            isEdit: props.isEdit,
            isEditable: props.isEditable,
            value: props.value,
            currentMinutes: minutes,
            currentHours: hours,
            currentDay: day,
            currentMonth: month,
            currentYear: year
        };
        // must bind functions that require 'this.' e.g. 
        // this.setState({isEdit: false}});
        this.doEdit = this.doEdit.bind(this);
        this.doCancel = this.doCancel.bind(this);
        this.doUpdate = this.doUpdate.bind(this);
        this.doChangeHours = this.doChangeHours.bind(this);
        this.doChangeMinutes = this.doChangeMinutes.bind(this);
        this.doChangeDay = this.doChangeDay.bind(this);
        this.doChangeMonth = this.doChangeMonth.bind(this);
        this.doChangeYear = this.doChangeYear.bind(this);
        this.resetCurrentValues = this.resetCurrentValues.bind(this);
        this.checkDayForValidity = this.checkDayForValidity.bind(this);
        this.stringForCurrentDate = this.stringForCurrentDate.bind(this);
    }

    /*
    // this will make the child component listen for changes to its props
    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });  
    }
    but we are deprecating this 
    */

    resetCurrentValues(){
        let hours = undefined;
        let year = undefined;
        let minutes = undefined;
        let day = undefined;
        let month = undefined;
        let valueDate = this.dateFromFormattedString(this.state.value);
        if(valueDate !== null){
            hours = valueDate.getHours();
            year = valueDate.getFullYear();
            month = 1 + valueDate.getMonth();
            minutes = valueDate.getMinutes();
            day = valueDate.getDate();
        }
        this.setState(
            {
                currentMinutes: minutes,
                currentHours: hours,
                currentDay: day,
                currentMonth: month,
                currentYear: year
            }
        );
    }

    stringForCurrentDate(){
        let parsedYear = this.state.currentYear;
        let parsedMonth = this.state.currentMonth;
        let parsedDay = this.state.currentDay;
        let parsedHour = this.state.currentHours;
        let parsedMinute = this.state.currentMinutes;
        let formattedString = parsedYear
            + "-" + this.formatTo00(parsedMonth)
            + "-" + this.formatTo00(parsedDay)
            + "T" + this.formatTo00(parsedHour)
            + ":" + this.formatTo00(parsedMinute);
        return formattedString; 
    }

    stringFromDateObject(dateObject){
        let parsedYear = dateObject.getFullYear();
        let parsedMonth = 1 + dateObject.getMonth();
        let parsedDay = dateObject.getDate();
        let parsedHour = dateObject.getHours();
        let parsedMinute = dateObject.getMinutes();
        let formattedString = parsedYear
            + "-" + (parsedMonth<10?"0"+parsedMonth:parsedMonth)
            + "-" + (parsedDay<10?"0"+parsedDay:parsedDay)
            + "T" + (parsedHour<10?"0"+parsedHour:parsedHour)
            + ":" + (parsedMinute<10?"0"+parsedMinute:parsedMinute);
        return formattedString;
    }

    dateFromFormattedString(formattedString){
        let parsedDateNumber = Date.parse(formattedString);
        let parsedDate = null;
        if(parsedDateNumber !== Number.NaN){
            parsedDate = new Date(parsedDateNumber);
        }
        return parsedDate;
    }

    formatTo00(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }

    doEdit(){
        this.setState({isEdit: true});
    }

    doCancel(){
        this.resetCurrentValues();
        this.setState({isEdit: false});
    }

    doUpdate(){
        let formatted = this.stringForCurrentDate();
        this.props.onChange(formatted);
    }

    doChangeHours(event){
        this.setState({currentHours: event.target.value});
    }
    
    doChangeMinutes(event){
        this.setState({currentMinutes: event.target.value});
    }

    doChangeYear(event){
        this.setState(
            {currentYear: event.target.value},
            () => this.checkDayForValidity() 
            );
    }

    doChangeMonth(event){
        this.setState(
            {currentMonth: event.target.value},
            () => this.checkDayForValidity()
            );
    }

    doChangeDay(event){
        this.setState({currentDay: event.target.value});
    }

    checkDayForValidity(){
        let maxDays = 31;
        if(this.state.currentDay !== undefined){
            maxDays = this.daysInMonth(
                this.state.currentYear,
                this.state.currentMonth - 1
                );
            let days = parseInt(this.state.currentDay);
            if(days > maxDays){
                this.setState({currentDay: maxDays});
            }
        }
    }

    daysInMonth(iYear, iMonth)
    {
        let max = 31;
        let month = parseInt(iMonth);
        if(month === 8 /* September */
            || month === 4 /* April */
            || month === 6 /* June */
            || month === 10 /* November */){
            max = 30;
        }else if(month === 1){
            let year = parseInt(iYear);
            if(year % 100 === 0 ? year % 400 === 0 : year % 4 === 0){
                max = 29;
            }else{
                max = 28;
            }
        }
        return max;
    }

    render(){
        console.log("Render(DateTimePicker.js)");
        let parsedDate = this.dateFromFormattedString(this.state.value);
        let parsedDateString = null;
        if(parsedDate !== null){
            parsedDateString = this.stringFromDateObject(parsedDate);
        }
        let editControl = (<span className="editControl"></span>);
        let readControl = (<span className="readControl"></span>);
        if(this.state.isEdit && this.state.isEditable){
            // just implement the editable hours for now...
            const hh = Array.from(Array(24).keys());
            const hours = hh.map((n) => <option key={n} value={n}>{this.formatTo00(n)}</option>);
            let selectHours = <select onChange={this.doChangeHours} value={this.state.currentHours}>
                {hours}
            </select>
            const mmmm = Array.from(Array(60).keys());
            const minutes = mmmm.map((n) => <option key={n} value={n}>{this.formatTo00(n)}</option>);
            let selectMinutes = <select onChange={this.doChangeMinutes} value={this.state.currentMinutes}>
                {minutes}
            </select>
            // we need to ensure the number of days is valid for the 
            // year and month
            let maxDays = 31;
            if(this.state.currentDay !== undefined){
                maxDays = this.daysInMonth(
                    this.state.currentYear,
                    this.state.currentMonth - 1
                    );
            }
            const dd = Array.from(Array(maxDays).keys());
            const days = dd.map((n) => <option key={n} value={n+1}>{this.formatTo00(n+1)}</option>);
            let selectDay = <select onChange={this.doChangeDay} value={this.state.currentDay}>
                {days}
            </select>
            const mm = Array.from(Array(12).keys());
            const months = mm.map((n) => <option key={n} value={n+1}>{this.formatTo00(n+1)}</option>);
            let selectMonth = <select onChange={this.doChangeMonth} value={this.state.currentMonth}>
                {months}
            </select>
            let yy = [2018,2019,2020];
            if(this.state.currentYear !== undefined && this.state.currentYear < 2018){
                yy.unshift(this.state.currentYear);
            }
            const years = yy.map((n) => <option key={n} value={n}>{this.formatTo00(n)}</option>);
            let selectYear = <select onChange={this.doChangeYear} value={this.state.currentYear}>
                {years}
            </select>
            editControl = <span>
            <p>
                {this.props.title}:     
                Year: {selectYear}
                Month: {selectMonth}
                Day: {selectDay}
                Hours: {selectHours}
                Minutes: {selectMinutes}
                <button onClick={this.doUpdate}>Update</button>
                <button onClick={this.doCancel}>Cancel</button>
            </p>
            </span>
        }else{
            if(this.state.isEditable){
                readControl = <span>
                <p>
                {this.props.title}: {parsedDateString}
                     <button onClick={this.doEdit}>Edit</button>
                </p>
            </span>    
            }else{
                readControl = <span>
                <p>{this.props.title}: {parsedDateString}</p>
            </span>
            }
            
        }
        return(
            <div>
                {editControl}
                {readControl}
            </div>
        );
    }
}

export default DateTimePicker;