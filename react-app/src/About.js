import React, { Component } from 'react';
import './App.css';

class About extends Component {
    
    render(){
        return (
            <div className="theAboutDiv">
                <h3><span role="img" aria-label="About">📜</span> About</h3>
                <p>This web app was written by <a href="http://www.molorosh.com">molorosh</a>.</p>
                <p>If you're a geeky kinda person the source code for the web app is viewable on <a href="https://github.com/molorosh/pharma">github</a></p>
                <p>&copy; 2019 molorosh</p>
                <p>
                    <button 
                        onClick={this.props.doClose} 
                        className="pharma-btn pharma-btn-cancel"
                        >
                        Close
                    </button>
                </p>
            </div>
        );
    }

}

export default About;