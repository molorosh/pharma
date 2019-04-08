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
        version: "0.1.0.0"
    }
    // must bind functions that require 'this.' e.g. 
    // this.setState({isEdit: false}});
    this.handleChangeName = this.handleChangeName.bind(this);
    this.doChangeNewUserName = this.doChangeNewUserName.bind(this);
    this.doChangeNewUserColor = this.doChangeNewUserColor.bind(this);
    this.doChangeNewUserIcon = this.doChangeNewUserIcon.bind(this);
    this.doAddNewUser = this.doAddNewUser.bind(this);
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
  }

  // this is called before the "render() method
  componentDidMount() {
    this.fetchAllUsers();
  }

  isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }

  fetchAllUsers(){
    db.table('persons')
      .toArray()
      .then((persons) => {
        this.setState({ persons });
      });
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
        .then(this.fetchAllUsers());
    }
      //.then((id) => {
      //  const newList = [...this.persons.todos, Object.assign({}, todo, { id })];
      //  this.setState({ todos: newList });
      //});
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
      if(this.state.persons){
        const pp = this.state.persons.slice();
        personsHtml = pp.map((p) =>{
            let style = { backgroundColor: p.color };
            return (
              <div key={p.id} className="pharma-person" style={style}>
                <h1>{p.icon}{p.name}</h1>
                <p><i>id={p.id}</i></p>
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
            <h3>👥People</h3>
            <div>
              <p>
                  initials:<input type="text" size="5" maxLength="5" value={this.state.newUserName} onChange={this.doChangeNewUserName} />
                  color:{selectColors}
                  icon:{selectIcons}
                  <button className="pharma-btn pharma-btn-add" onClick={this.doAddNewUser}>Add</button>
              </p>
              {personsHtml}
            </div>
            <hr></hr>
            <h3>💊Drug</h3>
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
