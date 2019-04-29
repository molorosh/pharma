import React, { Component } from 'react';
import './App.css';

class Documentation extends Component {

    render(){
        return (
            <>
                <h3><span role="img" aria-label="Help">📖</span> Help</h3>
                <p></p>

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

export default Documentation;