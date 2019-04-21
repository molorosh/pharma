import React, { Component } from 'react';
import logo from './logo.svg';
import db from './db';
import Drug from './Drug';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        units: ["pill(s)","mg","ml"],
        colors: ["Pink","Orchid","Salmon","Orange","Khaki","Gainsboro"],
        icons: ["۝","۞","⊜","⊞","⊙","⊗"],
        newUserName: '',
        newUserColor: "Pink",
        newUserIcon: "۝",
        version: "0.1.0.0",
        meds: [],
    }
    // must bind functions that require 'this.' e.g. 
    // this.setState({isEdit: false}});
    this.handleChangeName = this.handleChangeName.bind(this);
    this.doChangeNewUserName = this.doChangeNewUserName.bind(this);
    this.doChangeNewUserColor = this.doChangeNewUserColor.bind(this);
    this.doChangeNewUserIcon = this.doChangeNewUserIcon.bind(this);
    this.doAddNewUser = this.doAddNewUser.bind(this);
    this.fetchAllData = this.fetchAllData.bind(this);
    this.fetchOnlyUsers = this.fetchOnlyUsers.bind(this);
    this.fetchOnlyMeds = this.fetchOnlyMeds.bind(this);
    this.doAddNewMed = this.doAddNewMed.bind(this);
    this.doMedsCalculations = this.doMedsCalculations.bind(this);
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

  fetchOnlyUsers(){
    db.table('persons')
      .toArray()
      .then((persons) => {
        this.setState( { persons } )
      });
  }

  fetchOnlyMeds(){
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

  fetchAllData(){
    // although this works, it should be 
    // re-written to use Dexie "all" promise API
    // so we only update the React state once at the end
    db.table('persons')
      .toArray()
      .then((persons) => {
        this.setState( { persons }, this.fetchOnlyMeds() )
      });
  }

  doMedsCalculations(med){
    //console.log("doMedsCalculations(...)");
    //console.log("med.scheduleAmount: " + med.scheduleAmount);
    //console.log("med.everyNdays: " + med.everyNdays);
    //console.log("med.stockDate: " + med.stockDate);
    //console.log("med.stockAmount: " + med.stockAmount);
    let doses = med.stockAmount / med.scheduleAmount; 
    let days = doses * med.everyNdays;
    //console.log("doses: " + doses);
    //console.log("days: " + days);
    let dayFrom = new Date(Date.parse(med.stockDate + "T00:00:00Z"));
    //console.log("dayFrom: " + dayFrom.toLocaleDateString());
    let now = new Date();
    let today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ));
    let until = new Date(dayFrom.valueOf());
    until.setDate(until.getDate() + days);
    //console.log("today: " + today.toLocaleDateString());
    //console.log("until: " + until.toLocaleDateString());
    let timeDiff = (until.getTime() - today.getTime());
    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //console.log("dayDiff: " + dayDiff);
    med.daysLeft = dayDiff;
    med.until = this.fromDateToDateString(until);
  }

  doAddNewMed(personId){
    let medName = document.getElementById('newMedName_' + personId).value;
    let medDose = document.getElementById('newMedDose_' + personId).value;
    let medStrength = document.getElementById('newMedStrength_' + personId).value;
    let medStock = document.getElementById('newMedStock_' + personId).value;
    let medEveryNDays = document.getElementById('newMedEveryNDays_' + personId).value;
    let newMedUnits = document.getElementById('newMedUnits_' + personId).value;

    //console.log("medName: " + medName);
    //console.log("medDose: " + medDose);
    //console.log("medStrength: " + medStrength);
    //console.log("medStock: " + medStock);
    //console.log("medEveryNDays: " + medEveryNDays);
    //console.log("newMedUnits: " + newMedUnits);

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

  doAddNewUser(){
    const n = this.state.newUserName;
    const c = this.state.newUserColor;
    const i = this.state.newUserIcon;
    if(!this.isEmptyOrSpaces(n)){
      const person = {
        name: n,
        icon: i,
        color: c
      };
      db.table('persons')
        .add(person)
        .then(this.fetchAllData());
    }
  }

  handleChangeName(event){
    this.setState(
      {newUserName: event.target.value}
    );
  }

  doChangeNewUserName(event){
    this.setState(
      {newUserName: event.target.value}
    );
  }

  doChangeNewUserIcon(event){
    this.setState(
      {newUserIcon: event.target.value}
    );
  }
  
  doChangeNewUserColor(event){
    this.setState(
      {newUserColor: event.target.value}
    );
  }

  fromDateToDateString(date){
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

  today(){
    return(this.fromDateToDateString(new Date()));
  }

  render() {
    const units = this.state.units.slice();
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
                  return (<div key={m.id}>
                    <p>mid: {m.id}</p>
                    <p>name: {m.name}</p>
                    <p>days left: {m.daysLeft}</p>
                    <p>until: {m.until}</p>
                  </div>);
                }else{
                  return (undefined);
                }
              });
            return (
              <div key={p.id} className="pharma-person" style={style}>
                <h1>{p.icon}{p.name}</h1>
                <p><i>id={p.id}</i></p>
                <h4><span role="img" aria-label="Medicine">💊</span>Drug</h4>
                <p>
                  name: <input id={'newMedName_' + p.id} type="text"></input>
                  units: <select defaultValue={"tablet(s)"} id={'newMedUnits_' + p.id}>
                      <option value="tablet(s)">tablet(s)</option>
                      <option value="ml">ml</option>
                      <option value="floz">fl oz</option>
                    </select> 
                  strength: <input id={'newMedStrength_' + p.id} type="text"></input>
                  dose: <input id={'newMedDose_' + p.id} type="text"></input>
                  every 
                    <select defaultValue={"1"} id={'newMedEveryNDays_' + p.id}>
                      <option value="1">1</option>
                      <option value="1">2</option>
                      <option value="1">3</option>
                      <option value="1">4</option>
                      <option value="1">5</option>
                      <option value="1">6</option>
                      <option value="1">7</option>
                    </select> days 
                  stock level: <input id={'newMedStock_' + p.id} type="text"></input>
                  <button className="pharma-btn pharma-btn-add" 
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
                <p>{this.today()}</p>
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
            <h3><span role="img" aria-label="People">👥</span>People</h3>
            <div>
              <p>
                  initials: <input type="text" size="5" maxLength="5" value={this.state.newUserName} onChange={this.doChangeNewUserName} />
                  color: {selectColors}
                  icon: {selectIcons}
                  <button className="pharma-btn pharma-btn-add" onClick={this.doAddNewUser}>Add</button>
              </p>
              {personsHtml}
            </div>
            <hr></hr>
            <h3><span role="img" aria-label="Medicine">💊</span>Drug</h3>
            <Drug units={units}></Drug>
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
