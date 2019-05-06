import React, { Component } from 'react';
import db from './db';
import dal from './AppDal';

class EditMedecine extends Component {

    constructor(props){
        super(props);
        this.state = {
            unitList: ["tablets(s)","ml"],
            dayList: ["0","1","2","3","4","5","6","7"],
            personId: props.personId,
            medicineId: props.medicineId,
            name: '',
            strength: '',
            stockDate: '',
            units: '',
            stockAmount: '',
            scheduleAmount: '',
            everyNdays: '',
            err_name: '',
            err_strength: '',
            err_stockDate: '',
            err_units: '',
            err_stockAmount: '',
            err_scheduleAmount: '',
            err_everyNdays: '',
        };
    }

    isEmptyOrSpaces(str){
        return str === null || str === undefined || str.match(/^ *$/) !== null;
    }
    
    isSomething(str){
        return !this.isEmptyOrSpaces(str);
    }

    componentDidMount(){
        if(this.state.medicineId && this.state.medicineId > 0){
            let that = this;
            db.table("meds").get(this.state.medicineId)
            .then(function(med){
                that.setState({
                    name: med.name,
                    strength: med.strength,
                    units: med.units,
                    stockDate: med.stockDate,
                    stockAmount: (that.props.mode === "restock") ? '' : med.stockAmount,
                    scheduleAmount: med.scheduleAmount,
                    everyNdays: med.everyNdays
                });
            });
        }else{
            this.setState({
                units: this.state.unitList[0],
                everyNdays: this.state.dayList[0]
            });
        }
    }

    doChange_stockAmount = (event) => {
        this.setState(
            {stockAmount: event.target.value}
        );
    }

    doChange_name = (event) => {
        this.setState(
            {name: event.target.value}
        );
    }
    
    doChange_units = (event) => {
        this.setState(
            {units: event.target.value}
        );
    }
    
    doChange_strength = (event) => {
        this.setState(
            {strength: event.target.value}
        );
    }

    doChange_stockDate = (event) => {
        this.setState(
            {stockDate: event.target.value}
        );
    }

    doChange_scheduleAmount = (event) => {
        this.setState(
            {scheduleAmount: event.target.value}
        );
    }

    doChange_everyNdays = (event) => {
        this.setState(
            {everyNdays: event.target.value}
        );
    }

    clearErrors = () => {
        this.setState({
            err_stockAmount: '',
            err_everyNdays: '',
            err_name: '',
            err_scheduleAmount: '',
            err_stockDate: '',
            err_strength: '',
            err_units: ''
        });
    }

    showErrors = (errors) => {
        if(errors && errors.length){
            let changes = {};
            for(let x = 0, xMax = errors.length; x < xMax; x++){
                changes[errors[x].name] = errors[x].msg;
            }
            this.setState(changes);
        }
    }

    processRestock = () => {
        this.clearErrors();
        let errors = dal.restockMedication(this.state.medicineId, this.state.stockAmount);
        if(errors.length === 0){
            this.props.onRestock();
        }else{
            this.showErrors(errors);
        }
    }

    processPrn = (amnt) => {
        console.log("processPrn(" + amnt + ")");
        this.clearErrors();
        let errors = dal.givePrn(this.state.medicineId, amnt, this.state.stockAmount);
        if(errors.length === 0){
            this.props.onPrn();
        }else{
            this.showErrors(errors);
        }
    }

    processDelete = () => {
        this.clearErrors();
        let errors = dal.deleteMedication(this.state.medicineId);
        if(errors.length === 0){
            this.props.onDelete();
        }else{
            this.showErrors(errors);
        }
    }

    processAdd = () => {
        this.clearErrors();
        let errors = dal.addMedication(
                this.state.personId,
                this.state.name,
                this.state.stockAmount,
                this.state.scheduleAmount,
                this.state.strength,
                this.state.everyNdays,
                this.state.units
            );
        console.log(errors);
        if(errors.length === 0){
            this.props.onAdd();
        }else{
            this.showErrors(errors);
        }
    }

    render(){
        let classFullname = "pharma-medicine-control";
        let title = "";
        let actionButtons = <></>;
        let actionListButtons = <></>;
        let mainContent = <></>;
        let strengthText = (<></>);
        if(this.isSomething(this.state.med_strength)){
          strengthText = (<em>({this.state.med_strength})</em>);
        }
        let medDescription = <p><strong>{this.state.name}</strong> {strengthText}</p>;
        if(this.props.medicineId === undefined){
            classFullname += " pharma-medicine-add"
            title = "Add New Medicine";
            actionButtons = (<>
                <button 
                    onClick={this.processAdd} 
                    className="pharma-btn pharma-btn-add"
                >
                    Add
                </button>
            </>);
            const units = this.state.unitList.slice();
            const unitOptions = units.map(
            (a) => {
                return (<option key={a} value={a}>{a}</option>)
            }
            );
            const days = this.state.dayList.slice();
            const daysOptions = days.map(
                (a) => {
                    let txt = "";
                    if(a === "0"){
                        txt = "PRN (take as required)";
                    }else if(a === "1"){
                        txt = "Every Day";
                    }else{
                        txt = "Every " + a + " Days";
                    }
                    return (<option key={a} value={a}>{txt}</option>)
                }
            );
            const doseText =  this.state.everyNdays === "0"? "minimum dose" : "dose";
            mainContent = (<>
                <table className="pharma-edit-layout">
                    <tbody>
                        <tr>                        
                            <td colSpan="2" className="pharma-edit-layout-error">
                                {this.state.err_name}
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                name:
                            </td>
                            <td className="pharma-edit-layout-control">
                                <input type="text" value={this.state.name} onChange={this.doChange_name} />
                            </td>
                        </tr> 
                        <tr>                   
                            <td colSpan="2" className="pharma-edit-layout-error">
                                {this.state.err_units}
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                units:
                            </td>
                            <td className="pharma-edit-layout-control">
                                <select onChange={this.doChange_units} value={this.state.units}>
                                    {unitOptions}
                                </select>
                            </td>
                        </tr>
                        <tr>                        
                           <td colSpan="2" className="pharma-edit-layout-error">
                                {this.state.err_strength}
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                strength:
                            </td>
                            <td className="pharma-edit-layout-control">
                                <input type="text" value={this.state.strength} onChange={this.doChange_strength} />
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                schedule:
                            </td>
                            <td className="pharma-edit-layout-control">
                                <select onChange={this.doChange_everyNdays} value={this.state.everyNdays} >
                                    {daysOptions}
                                </select>
                            </td>
                            <td className="pharma-edit-layout-error">
                                {this.state.err_everyNdays}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="pharma-edit-layout-error">
                                {this.state.err_scheduleAmount}
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                {doseText}:
                            </td>
                            <td className="pharma-edit-layout-control">
                                <input type="text" value={this.state.scheduleAmount} onChange={this.doChange_scheduleAmount} />
                                &nbsp;
                                {this.state.units}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="pharma-edit-layout-error">
                                {this.state.err_stockAmount}
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                stock level:
                            </td>
                            <td className="pharma-edit-layout-control">
                                <input type="text" size="5" maxLength="5" value={this.state.stockAmount} onChange={this.doChange_stockAmount} />
                            </td>
                        </tr>
                    </tbody>
                </table>  
            </>);
        }else if(this.props.mode === "delete"){
            classFullname += " pharma-medicine-delete";
            title = "Delete Medicine";
            mainContent = (<>
                <p>You have chosen to delete the following medication:</p>
                {medDescription}
                <p>{this.state.scheduleAmount} {this.state.units} every {this.state.scheduleAmount} days</p>
            </>);
            actionButtons = (<>
                <button key={"d"}
                    onClick={this.processDelete} 
                    className="pharma-btn pharma-btn-delete"
                >
                    Delete
                </button>
            </>);
        }else if(this.props.mode === "prn"){
            classFullname += " pharma-medicine-prn"
            title = "Give PRN";
            mainContent = (<>
                <p>You have chosen to give the following medication as PRN:</p>
                {medDescription}
                <p className="pharma-edit-layout-error">{this.state.err_prn}</p>
                </>
            );
            let prn_stock = parseFloat(this.state.stockAmount);
            let prn_dose = parseFloat(this.state.scheduleAmount);
            let buttons = [];
            for(let x = 1; x < 5; x++){
                if(x * prn_dose <= prn_stock){
                    buttons.push( { id: x, val: x * prn_dose, key: x } );
                }
            }
            let that = this;
            const buttonObjects = buttons.map(
                (a) => {
                    return (
                        <li key={a.id.toString()}>
                            <button 
                                onClick={
                                    function(){ 
                                        that.processPrn(a.val); 
                                    } 
                                } 
                                className="pharma-btn pharma-btn-prn"
                            >
                                Give {a.val} {this.state.units}
                            </button>
                        </li>
                    )
                }
                );
            actionListButtons = (<ul className="plain-list">{buttonObjects}</ul>);
        }else if(this.props.mode === "restock"){
            classFullname += " pharma-medicine-restock"
            title = "Restock Medicine"
            mainContent = (<>
                <p>You have chosen to restock the following medication:</p>
                {medDescription}
                <p>{this.state.scheduleAmount} {this.state.units} every {this.state.scheduleAmount} days</p>
                <p>Please enter the stock level at the <u>start</u> of <u>today</u></p>
                <table className="pharma-edit-layout">
                    <tbody>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                Stock amount:
                            </td>
                            <td className="pharma-edit-layout-control">
                                <input type="text" size="5" maxLength="5" value={this.state.stockAmount} onChange={this.doChange_stockAmount} />
                            </td>
                            <td className="pharma-edit-layout-error">
                                {this.state.err_stockAmount}
                            </td>
                        </tr>
                    </tbody>
                </table>          
            </>);
            actionButtons = (<>
                <button key="rstck"
                    onClick={this.processRestock} 
                    className="pharma-btn pharma-btn-restock"
                >
                    Restock
                </button>
            </>);
        }else{
            title = "Edit Medicine";
            classFullname += " pharma-medicine-edit"
        }
        return (
            <div className={classFullname}>
                <h3><code>{title}</code></h3>
                {mainContent}
                <p>
                    <button 
                        onClick={this.props.onCancel} 
                        className="pharma-btn pharma-btn-cancel"
                        >
                        Cancel
                    </button>
                    {actionButtons}
                </p>
                <ul>{actionListButtons}</ul>
            </div>
        );
    }
}

export default EditMedecine;