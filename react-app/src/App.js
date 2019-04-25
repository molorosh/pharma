import React, { Component } from 'react';
import logo from './logo.svg';
import db from './db';
import './App.css';
import EditPerson from './EditPerson';
import EditMedicine from './EditMedicine';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        units: ["tablets(s)","ml"],
        // mode: 'list','edit','delete','add','restock'
        mode: 'list',
        // control: 'undefined', 'person', 'medicine'
        control: undefined,
        // personId: the primary key of the person to be added, edited or deleted
        personId: undefined,
        // medicineId: the primary key of the medicine to be added, edited or deleted
        medicineId: undefined,
        version: "0.5.0.0",
        meds: [],
    }
  }

  // this is called before the "render() method
  componentDidMount() {
    this.fetchAllData();
  }

  isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }

  isSomething(str){
    return !(str === null || str.match(/^ *$/) !== null);
  }

  doEditMedicine = (personId, medicineId) => {
    console.log("doEditMedicine(" + personId + "," + medicineId + ")");
    this.setState(
      {
        mode: 'edit',
        personId: personId,
        medicineId: medicineId,
        control: 'medicine'
      }
    );
  }

  doDeleteMedicine = (personId, medicineId) => {
    console.log("doDeleteMedicine(" + personId + "," + medicineId + ")");
    this.setState(
      {
        mode: 'delete',
        personId: personId,
        medicineId: medicineId,
        control: 'medicine'
      }
    );
  }

  doRestockMedicine = (personId, medicineId) => {
    console.log("doRestockMedicine(" + personId + "," + medicineId + ")");
    this.setState(
      {
        mode: 'restock',
        personId: personId,
        medicineId: medicineId,
        control: 'medicine'
      }
    );
  }

  doCancelEdit = () => {
    this.setState(
      {
        mode: 'list',
        personId: undefined,
        medicineId: undefined,
        control: undefined
      }
    );
  }

  doEditUser = (personId) => {
    this.setState(
      {
        mode: 'edit',
        personId: personId,
        medicineId: undefined,
        control: 'person'
      }
    );
  }

  doDeleteUser = (personId) => {
    this.setState(
      {
        mode: 'delete',
        personId: personId,
        medicineId: undefined,
        control: 'person'
      }
    );
  }

  fetchOnlyUsers = () => {
    db.table('persons')
      .toArray()
      .then((persons) => {
        this.setState( { persons } )
      });
  }

  fetchOnlyMeds = () => {
    db.table('meds')
      .toArray()
      .then((meds) => {
        if(meds && meds.length){
          for(let x = 0, xMax = meds.length; x < xMax; x++){
            this.doMedsCalculations(meds[x]);
          }
        }
        this.setState( { meds } )
      });
  }

  fetchAllData = () => {
    // although this works, it should be 
    // re-written to use Dexie "all" promise API
    // so we only update the React state once at the end
    db.table('persons')
      .toArray()
      .then((persons) => {
        this.setState( { persons, mode: 'list' }, this.fetchOnlyMeds() )
      });
  }

  doMedsCalculations = (med) => {
    let doses = med.stockAmount / med.scheduleAmount; 
    let days = doses * med.everyNdays;
    let dayFrom = new Date(Date.parse(med.stockDate + "T00:00:00Z"));
    let now = new Date();
    let today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ));
    let until = new Date(dayFrom.valueOf());
    until.setDate(until.getDate() + days);
    let timeDiff = (until.getTime() - today.getTime());
    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    med.daysLeft = dayDiff;
    med.until = this.fromDateToDateString(until);
  }

  doAddNewMed = (personId) => {
    let medName = document.getElementById('newMedName_' + personId).value;
    let medDose = document.getElementById('newMedDose_' + personId).value;
    let medStrength = document.getElementById('newMedStrength_' + personId).value;
    let medStock = document.getElementById('newMedStock_' + personId).value;
    let medEveryNDays = document.getElementById('newMedEveryNDays_' + personId).value;
    let newMedUnits = document.getElementById('newMedUnits_' + personId).value;

    if(this.isSomething(medName)){
      const med = {
        personId: personId,
        name: medName,
        strength: medStrength,
        units: newMedUnits,
        stockDate: this.today(),
        stockAmount: medStock,
        scheduleAmount: medDose,
        everyNdays: medEveryNDays
      };
      db.table('meds')
      .add(med)
      .then(this.fetchAllData());
    }
  }

  callbackMedicineDelete = () => {
    this.fetchAllData();
    /*
    this.setState(
      {
        mode: 'list',
        personId: undefined,
        medicineId: undefined,
        control: undefined
      }
      , () => { this.fetchAllData(); }
    );
    */
  }

  callbackPersonDelete = (id) => {
    // delete the medicines, then the person
    let that = this;
    db.table('meds')
      .where('personId')
      .equals(id)
      .delete()
      .then(function(){
        db.table('persons').where('id')
        .equals(id)
        .delete()
        .then(function(){
          that.setState(
            {
              mode: 'list',
              personId: undefined,
              medicineId: undefined,
              control: undefined
            }, 
            () => { that.fetchAllData(); });
        })
      })
  }

  callbackPersonAdd = (name,icon,color) => {
    const person = {
      name: name,
      icon: icon,
      color: color
    };
    db.table('persons')
      .add(person)
      .then(this.fetchAllData());
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

  fromDateToDateString = (date) => {
    let output = date.getFullYear() + '-';
    let m = date.getMonth();
    if(m < 9){
      output += '0'
    }
    output += (m + 1) + '-';
    let d = date.getDate();
    if(d < 10){
      output += '0'
    }
    output += d;
    return output;
  }

  today = () => {
    return(this.fromDateToDateString(new Date()));
  }

  render() {
    if(this.state.mode !== "list" && this.state.control){
      let editControl = undefined;
      if(this.state.control === "person"){
        editControl = (
          <EditPerson
           onCancel={this.doCancelEdit} 
            mode={this.state.mode} 
            personId={this.state.personId}
            callbackPersonAdd={this.callbackPersonAdd}
            callbackPersonDelete={this.callbackPersonDelete}
            >
          </EditPerson>
        );
      }else if(this.state.control === "medicine"){
        editControl = (
          <EditMedicine
            onCancel={this.doCancelEdit} 
            onDelete={this.callbackMedicineDelete}
            mode={this.state.mode} 
            personId={this.state.personId}
            medicineId={this.state.medicineId}
            >
          </EditMedicine>
        );
      }
      return (
        <div className="App">
        <header className="App-header">
          <div className="App-header-div">
            <div className="App-header-div-logo"><img src={logo} className="App-logo" alt="logo" /></div>
            <div className="App-header-div-title"><h1>Pharma</h1></div>
          </div>
        </header>
        <section className="AppSection">
          {editControl}
        </section>
        <footer className="App-footer">
            <div className="App-footer-div">
              <div className="App-footer-version"><p className="App-footer-version">Version: <span className="App-footer-version">{this.state.version}</span></p></div>
              <div className="App-footer-copyright"><p className="App-footer-copyright">&copy; 2019 molorosh</p></div>
            </div>
          </footer>
      </div>    
      );
    }

    const units = this.state.units.slice();
    const unitOptions = units.map(
      (a) => {
        return (<option key={a} value={a}>{a}</option>)
      }
    );
      // persons
      let personsHtml = null;
      let medsHtml = null;
      if(this.state.persons){
        const pp = this.state.persons.slice();
        personsHtml = pp.map((p) =>{
            let style = { backgroundColor: p.color };
            // person drug list
            let meds = this.state.meds.slice();
            medsHtml = meds.map(
              (m) => {
                if(m.personId === p.id){
                  let strengthText = (<></>);
                  if(this.isSomething(m.strength)){
                    strengthText = (<em>({m.strength})</em>);
                  }
                  return (
                    <div className="pharma-person-medicine" key={m.id}>
                      <p className="pharma-person-medicine-edit">
                        {
                          /*
                          <button 
                          onClick={() => {
                            this.doEditMedicine(p.id, m.id);
                          }} 
                          className="pharma-btn pharma-btn-edit"
                          >
                            Edit Medicine
                          </button>
                          <br/>
                          */
                        }
                        <button 
                          onClick={() => {
                            this.doRestockMedicine(p.id, m.id);
                          }} 
                          className="pharma-btn pharma-btn-restock"
                          >
                            Restock Medicine
                        </button>
                        <br/>
                        <button 
                          onClick={() => {
                            this.doDeleteMedicine(p.id, m.id);
                          }} 
                          className="pharma-btn pharma-btn-delete"
                          >
                            Delete Medicine
                        </button>
                      </p>
                      <p><strong>{m.name}</strong> {strengthText}</p>
                      <p>{m.scheduleAmount} {m.units} every {m.everyNdays} day(s)</p>
                      <p>days left: <strong>{m.daysLeft}</strong> <em>({m.until})</em></p>
                    </div>
                    );
                }else{
                  return (undefined);
                }
              });
            return (
              <div key={p.id} className="pharma-person" style={style}>
                <p className="pharma-delete-person-para">
                  <button
                    onClick={
                      () => {
                        this.doDeleteUser(p.id);
                      }
                    } 
                    className="pharma-btn pharma-btn-delete" >delete person</button>
                </p>
                <h1>{p.icon} {p.name}</h1>
                <h4><span role="img" aria-label="Medicine">💊</span> Medicines</h4>
                <p>
                  <button 
                    onClick={() => {this.doEditMedicine(p.id, undefined);}} 
                    className="pharma-btn pharma-btn-add">
                      Add Medicine
                    </button>
                  </p>
                <div className="pharma-add-new-medecine">
                <p>
                  name: <input id={'newMedName_' + p.id} type="text"></input>
                </p>
                <p>units: <select defaultValue={"tablet(s)"} id={'newMedUnits_' + p.id}>
                     {unitOptions}
                    </select> 
                    </p>
                <p>strength: <input size="7" maxLength="7" id={'newMedStrength_' + p.id} type="text"></input>
                </p>
                <p>dose: <input size="7" maxLength="7" id={'newMedDose_' + p.id} type="text"></input>
                </p>
                <p>every 
                    <select defaultValue={"1"} id={'newMedEveryNDays_' + p.id}>
                      <option value="1">1</option>
                      <option value="1">2</option>
                      <option value="1">3</option>
                      <option value="1">4</option>
                      <option value="1">5</option>
                      <option value="1">6</option>
                      <option value="1">7</option>
                    </select> days 
                    </p>
                <p>stock level: <input size="7" maxLength="7" id={'newMedStock_' + p.id} type="text"></input>
                </p>
                <p><button className="pharma-btn pharma-btn-add" 
                    onClick={
                      () => {
                        let newDrugName = '??';
                        let elem = document.getElementById('newMedName_' + p.id);
                        if(elem){
                          newDrugName = elem.value;
                          this.doAddNewMed(p.id, newDrugName);
                        }
                      }
                    }
                      >Add</button>
                </p>
                </div>
                {medsHtml}
              </div>
            );
        });
      }
      
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-div">
            <div className="App-header-div-logo"><img src={logo} className="App-logo" alt="logo" /></div>
            <div className="App-header-div-title"><h1>Pharma</h1></div>
          </div>
        </header>
        <section className="AppSection">
            <h3><span role="img" aria-label="People">👥</span> People</h3>
            <p>
              <button className="pharma-btn pharma-btn-add" onClick={() => { this.doEditUser(undefined) }}>New Person</button>
            </p>
            <div>
              {personsHtml}
            </div>
          </section>
          <footer className="App-footer">
            <div className="App-footer-div">
              <div className="App-footer-version"><p className="App-footer-version">Version: <span className="App-footer-version">{this.state.version}</span></p></div>
              <div className="App-footer-copyright"><p className="App-footer-copyright">&copy; 2019 molorosh</p></div>
            </div>
          </footer>
      </div>
    );
  }

}

export default App;
