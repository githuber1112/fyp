import React from 'react';
import './styles.scss';

const ProductEnquiry = (props) => {
    const productEnquiry1 = [
        {
            text:"Product Navigation",
            handler: props.actionProvider.handleProductNavigation,
            id:1,
        },
        {
            text:"Quotation",
            handler: props.actionProvider.handleQuotation,
            id:2,
        },
        {
            text:"What products does this website sell?",
            handler: props.actionProvider.handleProductQuestion,
            id:3,
        },
      
    ];

    const buttonsMarkup = productEnquiry1.map((option) => (
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

export default ProductEnquiry;