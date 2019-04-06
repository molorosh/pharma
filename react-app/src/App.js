import React, { Component } from 'react';
import logo from './logo.svg';
import Drug from './Drug';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        units: ["pill(s)","mg","ml"],
    }
}

  render() {
    const units = this.state.units.slice();
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-div">
            <div className="App-header-div-logo"><img src={logo} className="App-logo" alt="logo" /></div>
            <div className="App-header-div-title"><h1>Pharma</h1></div>
          </div>
        </header>
        <section>
            <h2>Medicine</h2>
            <ul>
              <li>[TODO] medicine details, dose and start date and time</li>
            </ul>
            <Drug units={units}></Drug>
          </section>  
      </div>
    );
  }

}

export default App;
