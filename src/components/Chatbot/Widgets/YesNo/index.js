import React from 'react';
import './styles.scss';

const YesNo = (props) => {
    const yesNo = [
        {
            text:"Yes",
            handler: props.actionProvider.handleHelpEnquiry,
            id:1,
        },
        {
            text:"No",
            handler: props.actionProvider.handleLeaving,
            id:2,
        },
        
      
    ];

    const buttonsMarkup = yesNo.map((option) => (
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

export default YesNo;