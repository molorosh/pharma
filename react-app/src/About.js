import React, { Component } from 'react';
import './App.css';

class About extends Component {
    
    render(){
        return (
            <div className="theAboutDiv">
                <h3><span className="emoji-prefix" role="img" aria-label="About">📜</span> About</h3>
                <p>This web app was written by <a rel="noopener noreferrer" target="_blank" href="http://www.molorosh.com">molorosh</a>.</p>
                <p>If you're a geeky kinda person the source code for the web app is viewable on <a rel="noopener noreferrer" target="_blank" href="https://github.com/molorosh/pharma">github</a></p>
                <h3><span className="emoji-prefix" role="img" aria-label="About">⏳</span> Release History</h3>
                <h4>V 1.0.0.0 @ 6 May 2019</h4>
                <ul>
                    <li>The initial version of the app was published.</li>
                </ul>
                <h4>V 1.1.0.0 @ 15 August 2021</h4>
                <ul>
                    <li>Some UX updates were made to the application.</li>
                </ul>
                <h4>V 1.1.0.1 @ 15 August 2021</h4>
                <ul>
                    <li>Fixed a navigtion error witht the 'about' and 'help' buttons.</li>
                    <li>Fixed a rogue '2019' date to '2021'.</li>
                </ul>
                <p>&copy; 2021 molorosh</p>
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