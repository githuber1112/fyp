import React from 'react';
import './styles.scss';

const GeneralEnquiry = (props) => {
    const generalEnquiry = [
        {
            text:"Can I make donations to Agmo?",
            handler: props.actionProvider.handleDonationQuestion,
            id:1,
        },
        {
            text:"How can I change my profile picture?",
            handler: props.actionProvider.handleWebsiteQuestion,
            id:2,
        },
        {
            text:"How do I contact the support team?",
            handler: props.actionProvider.handleContactQuestion,
            id:3,
        }
        
      
    ];

    const buttonsMarkup = generalEnquiry.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
            {option.text}
        </button>
    ));

    return (
        <div className="options-container">
            {buttonsMarkup}
        </div>
    );
}   

export default GeneralEnquiry;