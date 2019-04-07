import React, { Component } from 'react';
import logo from './logo.svg';
import Drug from './Drug';
import './App.css';

class App extends Component {
  constructor(props){
    console.log("constructor(App.js)");
    super(props);
    this.state = {
        units: ["pill(s)","mg","ml"],
    }
}

  render() {
    console.log("Render(App.js)");
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
            <hr></hr>
            <h3>Disclaimer</h3>
            <p>This is in no way a finished, poliched app.  It's currently a playground/testbed where I am learning about building apps and components in React.js</p>
            <p>In fact, right now I'm just fiddling around with making a Date Time picker in React.js ...</p>
            <hr></hr>
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
