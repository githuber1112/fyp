import React from 'react';
import './styles.scss';

const PaymentEnquiry = (props) => {
    const paymentEnquiry = [
        {
            text:"What payment method is available?",
            handler: props.actionProvider.handlePaymentMethod,
            id:1,
        },
        {
            text:" Why would my payment not go through?",
            handler: props.actionProvider.handlePaymentError,
            id:2,
        },
        
      
    ];

    const buttonsMarkup = paymentEnquiry.map((option) => (
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

export default PaymentEnquiry;