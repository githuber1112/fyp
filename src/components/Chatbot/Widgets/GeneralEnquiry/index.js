import React from 'react';
import './styles.scss';

const GeneralEnquiry = (props) => {
    const generalEnquiry = [
        {
            text:"How long does the shipping process take?",
            handler: props.actionProvider.handleShippingQuestion,
            id:1,
        },
        {
            text:"What is this website about?",
            handler: props.actionProvider.handleWebsiteQuestion,
            id:2,
        },
        
      
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