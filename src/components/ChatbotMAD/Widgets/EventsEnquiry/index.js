import React from 'react';
import './styles.scss';

const EventsEnquiry = (props) => {
    const eventsEnquiry = [
        {
            text:"How do I join an event?",
            handler: props.actionProvider.handleJoinEventQuestion,
            id:1,
        },
        {
            text:"Are the events free to join?",
            handler: props.actionProvider.handleEventFreeQuestion,
            id:2,
        }
        
      
    ];

    const buttonsMarkup = eventsEnquiry.map((option) => (
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

export default EventsEnquiry;