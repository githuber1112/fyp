import React from 'react';
import './styles.scss';

const Options = (props) => {
    const options = [
        {
            text:"Product Enquiry",
            handler: props.actionProvider.handleProductEnquiry,
            id:1,
        },
        {
            text:"General Enquiry",
            handler: props.actionProvider.handleGeneralEnquiry,
            id:2,
        },
        {
            text:"Payment enquiry",
            handler: props.actionProvider.handlePaymentEnquiry,
            id:3,
        },
        {
            text:"Refund enquiry",
            handler: props.actionProvider.handleRefundEnquiry,
            id:4,
        },
        {
            text:"User Account enquiry",
            handler: props.actionProvider.handleUserAccountEnquiry,
            id:5,
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