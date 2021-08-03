import React from 'react';
import './styles.scss';

const UserAccountEnquiry = (props) => {
    const userAccountEnquiry = [
        {
            text:"How to register?",
            handler: props.actionProvider.handleRegisterMethod,
            id:1,
        },
        {
            text:"How to change password?",
            handler: props.actionProvider.handleChangePasswordMethod,
            id:2,
        },
        {
            text:"Why can't I login to my account?",
            handler: props.actionProvider.handleLoginError,
            id:3,
        },
      
    ];

    const buttonsMarkup = userAccountEnquiry.map((option) => (
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

export default UserAccountEnquiry;