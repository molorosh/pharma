import React, { Component } from 'react';
import './App.css';

class Documentation extends Component {

    render(){
        return (
            <div className="theHelpDiv">
                <h3><span role="img" aria-label="Help">❓</span> Help</h3>
                <h4><span role="img" aria-label="Purpose">🐬</span>Purpose</h4>
                <p>
                    This is a small web app to track multiple medication prescriptions for one or more people, 
                    and to show when medicines are predicted to run out.
                </p>
                <h4><span role="img" aria-label="Instructions">📖</span>Instructions</h4>
                <p>
                    The <b>New Person</b> button lets you create a new person.  No need to give the full name, 
                    just initials or a nickname will do.</p>
                    <p>
                    The <b>Add Medicine</b> button lets you add a medication for a person.  Just fill out the 
                    details and it will work how many full days of days are left before you must get another 
                    prescription.  If the person has several pills throughout the day, just give the daily total.
                </p>
                <p>
                    The <b>Give PRN</b> button lets you give multiples of the minimum PRN dose.  As PRN does not
                    follow a definate schedule, we don't show predictions for the end of PRN stock,  
                    but do indicate the number of minimum doses available.
                </p>
                <p>
                    The <b>Restock Medicine</b> button lets you correct the amount of a medicine.  Please enter the "new" 
                    stock leval at the start of the day (i.e. include, as stock, any meds you have already given <u>today</u>).
                </p>
                <p>
                    The <b>Delete Medicine</b> button will allow you to remove a medication from a user.
                </p>
                <p>
                    The <b>Delete Person</b> button will allow you to remove a person and all their medication
                     from the web app.
                </p>
                <h4><span role="img" aria-label="Warning">⚠️</span>Oops!</h4>
                <p>
                    Deletions (and Additions and Restocks) always go to a confirmation screen, so don't worry 
                    about accididentally hitting a button - just click the <b>Cancel</b> button.
                </p>
                <h4><span role="img" aria-label="Data">💾</span>Data</h4>
                <p>
                    Because medication details are highly personal medical data, 
                    this app does not store any data remotely.  
                    All prescription and stock level data is stored locally 
                    on the phone or tablet or computer you are currently looking at.
                </p>
                <p>
                    This does however mean that if you set up all the information on your phone, 
                    it will not appear in your tablet, so please take a moment to choose if it's 
                    best for you to keep the information on your personal smartphone,
                     or on a shared tablet or computer.
                </p>
                <h4><span role="img" aria-label="Email">📧</span>Feedback</h4>
                <p>
                    The app email address is: <a href="mailto:pharma@molorosh.com">pharma@molorosh.com</a>.
                    Please feel free to send an email with any feedback, comments, problems, 
                    questions or new feature suggestions.
                </p>
                <h4><span role="img" aria-label="Crystal Ball">🔮</span>Future Features</h4>
                <p>
                    We are looking to introduce an import / export / backup process to allow you 
                    to transfer per-person medication records from one device to another.
                </p>
                <h4><span role="img" aria-label="Free of Charge">🈚</span>Free of Charge</h4>
                <p>
                    This web app is free to use and always will be :-)
                </p>
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

export default Documentation;