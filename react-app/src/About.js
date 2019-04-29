import React, { Component } from 'react';
import './App.css';

class About extends Component {
    
    render(){
        return (
            <>
                <h3><span role="img" aria-label="About">📜</span> About</h3>
                <p>
                    <button 
                        onClick={this.props.doClose} 
                        className="pharma-btn pharma-btn-cancel"
                        >
                        Close
                    </button>
                </p>
            </>
        );
    }

}

export default About;