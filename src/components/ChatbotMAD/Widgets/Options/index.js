import React from 'react';
import './styles.scss';

const Options = (props) => {
    const options = [
        {
            text:"General Enquiry",
            handler: props.actionProvider.handleGeneralEnquiry,
            id:1,
        },
        {
            text:"Events Enquiry",
            handler: props.actionProvider.handleEventsEnquiry,
            id:2,
        },
        {
            text:"Volunteers enquiry",
            handler: props.actionProvider.handleVolunteersEnquiry,
            id:3,
        }
    ];

    const buttonsMarkup = options.map((option) => (
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

export default Options;