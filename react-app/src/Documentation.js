import React, { Component } from 'react';

class Documentation extends Component {

    render(){
        return (
            <>
                <p>Documentation</p>
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