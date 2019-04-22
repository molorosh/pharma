import React, { Component } from 'react';
import db from './db';

class EditPerson extends Component {
    constructor(props){
        super(props);
        this.state = {
            personId: props.personId,
            newUserName: '',
            newUserColor: "Pink",
            newUserIcon: "۝",
            colors: ["Pink","Orchid","Salmon","Orange","Khaki","Gainsboro"],
            icons: ["۝","۞","⊜","⊞","⊙","⊗"],
        };
    }

    // this is called before the "render() method
    componentDidMount() {
        if(this.state.personId){
            db.table('persons')
                .get(this.state.personId)
                .then((person) => {
                    this.setState( { newUserName: person.name } )
                });
        }
    }

    isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

    isSomething(str){
        return !(str === null || str.match(/^ *$/) !== null);
    }

    handleChangeName = (event) => {
        this.setState(
            {newUserName: event.target.value}
        );
    }
    
    doChangeNewUserName = (event) => {
        this.setState(
            {newUserName: event.target.value}
        );
    }
    
    doChangeNewUserIcon = (event) => {
        this.setState(
            {newUserIcon: event.target.value}
        );
    }
      
    doChangeNewUserColor = (event) => {
        this.setState(
            {newUserColor: event.target.value}
        );
    }

    doAttemptAddNewUser = () => {
        const n = this.state.newUserName;
        const c = this.state.newUserColor;
        const i = this.state.newUserIcon;
        if(this.isSomething(n)){
            this.props.callbackPersonAdd(n, i, c);
        }
    }

    render(){
        let classFullname = "pharma-person-control";
        let title = "";
        let content = undefined;
        let otherButtons = undefined;
        if(this.props.personId === undefined){
            classFullname += " pharma-person-add"
            title = "Add New Person";
            const cc = this.state.colors.slice();
            const colors = cc.map(
                (n) => {
                let inlineStyles={backgroundColor: n};
                return (<option style={inlineStyles} key={n} value={n}>{n}</option>);
                });
            let selectColorsStyle={
            backgroundColor: this.state.newUserColor
            };
            let selectColors = <select style={selectColorsStyle} onChange={this.doChangeNewUserColor} value={this.state.newUserColor}>
                {colors}
            </select>
            const ii = this.state.icons.slice();
            const icons = ii.map((n) => <option key={n} value={n}>{n}</option>);
            let selectIcons = <select onChange={this.doChangeNewUserIcon} value={this.state.newUserIcon}>
                {icons}
            </select>
            content = (
                <>
                    <p>initials: <input type="text" size="5" maxLength="5" value={this.state.newUserName} onChange={this.doChangeNewUserName} /></p>
                    <p>color: {selectColors}</p>
                    <p>icon: {selectIcons}</p>
                </>
            );
            otherButtons = (<button 
                onClick={this.doAttemptAddNewUser} 
                className="pharma-btn pharma-btn-add"
                >
                Add New Person
            </button>);
        }else if(this.props.mode === "delete"){
            classFullname += " pharma-person-delete"
            title = "Delete Person and Medicines"
            content = (
                <>
                    <p>person to delete: <strong>{this.state.newUserName}</strong></p>
                </>
            );
            otherButtons = (<button 
                onClick={
                    () => {
                        this.props.callbackPersonDelete(this.state.personId);
                    }
                }
                className="pharma-btn pharma-btn-delete"
                >
                Delete [{this.state.newUserName}]
            </button>);
        }else{
            classFullname += " pharma-person-edit"
            title = "Edit Person";
        }
        return (
            <div className={classFullname}>
                <h3><code>{title}</code></h3>
                {content}
                <p>
                    <button 
                        onClick={this.props.onCancel} 
                        className="pharma-btn pharma-btn-cancel"
                        >
                        Cancel
                    </button>
                    {otherButtons}
                </p>
            </div>
        );
    }
}

export default EditPerson;