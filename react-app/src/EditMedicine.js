import React, { Component } from 'react';
import db from './db';
import dal from './AppDal';

class EditMedecine extends Component {

    constructor(props){
        super(props);
        this.state = {
            personId: props.personId,
            medicineId: props.medicineId,
            med_name: undefined,
            med_strength: undefined,
            med_units: undefined,
            med_stockDate: undefined,
            med_stockAmount: undefined,
            med_scheduleAmount: undefined,
            med_everyNdays: undefined,
            restockLevel: '',
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
                    med_name: med.name,
                    med_strength: med.strength,
                    med_units: med.units,
                    med_stockDate: med.stockDate,
                    med_stockAmount: med.stockAmount,
                    med_scheduleAmount: med.scheduleAmount,
                    med_everyNdays: med.everyNdays
                });
            });
        }
    }

    doChangeRestockLevel = (event) => {
        this.setState(
            {restockLevel: event.target.value}
        );
    }

    clearErrors = () => {
        this.setState({
            errRestock: undefined
        });
    }

    showErrors = (errors) => {
        console.log("errors");
        console.log(errors);
    }

    processRestock = () => {
        this.clearErrors();
        let errors = dal.restockMedication(this.state.medicineId, this.state.restockLevel);
        if(errors.length === 0){
            this.props.onRestock();
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

    render(){
        let classFullname = "pharma-medicine-control";
        let title = "";
        let actionButtons = <></>;
        let mainContent = <></>;
        let strengthText = (<></>);
        if(this.isSomething(this.state.med_strength)){
          strengthText = (<em>({this.state.med_strength})</em>);
        }
        let medDescription = <p><strong>{this.state.med_name}</strong> {strengthText}</p>;
        if(this.props.medicineId === undefined){
            classFullname += " pharma-medicine-add"
            title = "Add New Medicine";
        }else if(this.props.mode === "delete"){
            classFullname += " pharma-medicine-delete";
            title = "Delete Medicine";
            mainContent = (<>
                <p>You have chosen to delete the following medication:</p>
                {medDescription}
                <p>{this.state.med_scheduleAmount} {this.state.med_units} every {this.state.med_scheduleAmount} days</p>
            </>);
            actionButtons = (<>
                <button 
                    onClick={this.processDelete} 
                    className="pharma-btn pharma-btn-delete"
                >
                    Delete
                </button>
            </>);
        }else if(this.props.mode === "restock"){
            classFullname += " pharma-medicine-restock"
            title = "Restock Medicine"
            mainContent = (<>
                <p>You have chosen to restock the following medication:</p>
                {medDescription}
                <p>{this.state.med_scheduleAmount} {this.state.med_units} every {this.state.med_scheduleAmount} days</p>
                <p>Please enter the stock level at the <u>start</u> of <u>today</u></p>
                <table className="pharma-edit-layout">
                    <tbody>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                Stock amount:
                            </td>
                            <td className="pharma-edit-layout-control">
                                <input type="text" size="5" maxLength="5" value={this.state.restockLevel} onChange={this.doChangeRestockLevel} />
                            </td>
                            <td className="pharma-edit-layout-error">
                                {this.state.errRestock}
                            </td>
                        </tr>
                    </tbody>
                </table>          
            </>);
            actionButtons = (<>
                <button 
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
            </div>
        );
    }
}

export default EditMedecine;