import React from 'react';
import './styles.scss';

const RefundEnquiry = (props) => {
    const refundEnquiry = [
        {
            text:"How to refund?",
            handler: props.actionProvider.handleRefundMethod,
            id:1,
        },
        {
            text:"Why is refund unavailable for my order?",
            handler: props.actionProvider.handleRefundError,
            id:2,
        },
        
      
    ];

    const buttonsMarkup = refundEnquiry.map((option) => (
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

export default RefundEnquiry;