import React, { Component } from 'react';
import logo from './logo.svg';
import db from './db';
import Drug from './Drug';
import './App.css';

class App extends Component {
  constructor(props){
    console.log("constructor(App.js)");
    super(props);
    this.state = {
        units: ["pill(s)","mg","ml"],
        colors: ["Pink","Orchid","Salmon","Orange","Khaki","Gainsboro"],
        icons: ["۝","۞","⊜","⊞","⊙","⊗"],
        newUserName: undefined,
        newUserColor: "Pink",
        newUserIcon: "۝"
    }
    // must bind functions that require 'this.' e.g. 
    // this.setState({isEdit: false}});
    this.handleChangeName = this.handleChangeName.bind(this);
    this.doChangeNewUserName = this.doChangeNewUserName.bind(this);
    this.doChangeNewUserColor = this.doChangeNewUserColor.bind(this);
    this.doChangeNewUserIcon = this.doChangeNewUserIcon.bind(this);
    this.doAddNewUser = this.doAddNewUser.bind(this);
  }

  // this is called before the "render() method
  componentDidMount() {
    db.table('persons')
      .toArray()
      .then((persons) => {
        this.setState({ persons });
      });
  }

  doAddNewUser(){
    let n = this.state.newUserName;
    let c = this.state.newUserColor;
    let i = this.state.newUserIcon;
    alert(n + " " + i + " " + c);
    const person = {
      name: n,
      icon: i,
      color: c
    };
    db.table('persons')
      .add(person);
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
    console.log("Render(App.js)");
    const units = this.state.units.slice();
    const cc = this.state.colors.slice();
    const colors = cc.map(
        (n) => {
          let inlineStyles={backgroundColor: n};
          return (<option style={inlineStyles} key={n} value={n}>{n}</option>);
        });
    let selectColors = <select onChange={this.doChangeNewUserColor} value={this.state.newUserColor}>
        {colors}
    </select>
    const ii = this.state.icons.slice();
    const icons = ii.map((n) => <option key={n} value={n}>{n}</option>);
    let selectIcons = <select onChange={this.doChangeNewUserIcon} value={this.state.newUserIcon}>
        {icons}
    </select>
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-div">
            <div className="App-header-div-logo"><img src={logo} className="App-logo" alt="logo" /></div>
            <div className="App-header-div-title"><h1>Pharma</h1></div>
          </div>
        </header>
        <section>
            <h2>Disclaimer</h2>
            <p>This is currently an un-finished app.  It should not be considered stable.  It's where I am learning about building apps and components in React.js</p>
            <h2>App UX</h2>
            <h3>Persons</h3>
            <div>
              <p>
                  nickname:<input type="text" value={this.state.newUserName} onChange={this.doChangeNewUserName} />
                  color:{selectColors}
                  icon:{selectIcons}
                  <button onClick={this.doAddNewUser}>Add</button>
              </p>
            </div>
            <h3>Drug</h3>
            <p><code>This is a simple drug component...</code></p>
            <Drug units={units}></Drug>
          </section>  
      </div>
    );
  }

}

export default App;
