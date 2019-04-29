import React, { Component } from 'react';

class About extends Component {
    
    render(){
        return (
            <>
                <p>About</p>
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