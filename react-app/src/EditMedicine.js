import React, { Component } from 'react';

class EditMedecine extends Component {

    constructor(props){
        super(props);
        this.state = {
            personId: props.personId,
            medicineId: props.medicineId,
        };
    }

    render(){
        let classFullname = "pharma-medicine-control";
        let title = "";
        if(this.props.medicineId === undefined){
            classFullname += " pharma-medicine-add"
            title = "Add New Medicine";
        }else if(this.props.mode === "delete"){
            classFullname += " pharma-medicine-delete"
            title = "Delete Medicine"
        }else if(this.props.mode === "restock"){
            classFullname += " pharma-medicine-restock"
            title = "Restock Medicine"
        }else{
            title = "Edit Medicine";
            classFullname += " pharma-medicine-edit"
        }
        return (
            <div className={classFullname}>
                <h3><code>{title}</code></h3>
                <p><code>personId: {this.state.personId}</code></p>
                <p><code>medicineId: {this.state.medicineId}</code></p> 
                <table>
                    <tbody>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                name:
                            </td>
                            <td className="pharma-edit-layout-control">
                                <input type="text" />
                            </td>
                            <td className="pharma-edit-layout-error">
                                {this.state.errName}
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                units:
                            </td>
                            <td className="pharma-edit-layout-control">
                                
                            </td>
                            <td className="pharma-edit-layout-error">
                                
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                strength:
                            </td>
                            <td className="pharma-edit-layout-control">
                                
                            </td>
                            <td className="pharma-edit-layout-error">
                                
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                dose:
                            </td>
                            <td className="pharma-edit-layout-control">
                                
                            </td>
                            <td className="pharma-edit-layout-error">
                                
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                strength:
                            </td>
                            <td className="pharma-edit-layout-control">
                                
                            </td>
                            <td className="pharma-edit-layout-error">
                                
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                strength:
                            </td>
                            <td className="pharma-edit-layout-control">
                                
                            </td>
                            <td className="pharma-edit-layout-error">
                                
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                every:
                            </td>
                            <td className="pharma-edit-layout-control">
                                XX days
                            </td>
                            <td className="pharma-edit-layout-error">
                                
                            </td>
                        </tr>
                        <tr>
                            <td className="pharma-edit-layout-label">
                                stock level:
                            </td>
                            <td className="pharma-edit-layout-control">
                                
                            </td>
                            <td className="pharma-edit-layout-error">
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <button 
                        onClick={this.props.onCancel} 
                        className="pharma-btn pharma-btn-cancel"
                        >
                        Cancel
                    </button>
                </p>
            </div>
        );
    }
}

export default EditMedecine;