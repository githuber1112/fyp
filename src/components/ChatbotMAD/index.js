import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./config";
import ActionProvider from "./ActionProvider.js";
import MessageParser from "./MessageParser.js";
import ToggleIcon from './../../assets/chat.svg';
import './styles.scss'


const ChatBot = () => {


    return (
      
          <div className="chatbotContainer">
              <Chatbot
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
              />

          </div>
           
       
      );
};

export default ChatBot;