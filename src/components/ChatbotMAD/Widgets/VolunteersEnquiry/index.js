import React from 'react';
import './styles.scss';

const VolunteersEnquiry = (props) => {
    const volunteersEnquiry = [
        {
            text:"How do I apply as a volunteer?",
            handler: props.actionProvider.handleApplyVolunteerQuestion,
            id:1,
        },
        {
            text:"Is interview required for volunteer?",
            handler: props.actionProvider.handleInterviewVolunteerQuestion,
            id:2,
        }
        
      
    ];

    const buttonsMarkup = volunteersEnquiry.map((option) => (
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

export default VolunteersEnquiry;