import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./config";
import ActionProvider from "./ActionProvider.js";
import MessageParser from "./MessageParser.js";
import ToggleIcon from './../../assets/chat.svg';


const ChatBot = () => {
    const [showBot, toggleBot] = useState(false);


    return (
        <div className="app-chatbot-container">
            {showBot && (
              <Chatbot
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
              />

            )}
            <div className="toggleChatbotButton" >
            <img src={ToggleIcon} className="iconCSS"   onClick={() => toggleBot((prev) => !prev)}/>
            </div>
        </div>
      );
};

export default ChatBot;