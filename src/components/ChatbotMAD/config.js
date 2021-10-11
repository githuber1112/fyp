import React from 'react';
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";
import Options from './Widgets/Options';



//widgets
import EventsEnquiry from './Widgets/EventsEnquiry';
import GeneralEnquiry from './Widgets/GeneralEnquiry';
import VolunteersEnquiry from './Widgets/VolunteersEnquiry';
import YesNo from './Widgets/YesNo';


const config = {
  initialMessages: [createChatBotMessage(`Hi, how can I help you?`,{
    widget:"options",
  })],
    botName:"agmoOKU ChatBot",
    customComponents: {
        botAvatar: (props) => <BotAvatar {...props}/>
    },
    customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#597FFF",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "black",
    },
  },
  widgets:[
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "generalEnquiry",
      widgetFunc: (props) => <GeneralEnquiry {...props} />,
    },
    {
      widgetName: "eventsEnquiry",
      widgetFunc: (props) => <EventsEnquiry {...props} />,
    },
    {
      widgetName: "volunteersEnquiry",
      widgetFunc: (props) => <VolunteersEnquiry {...props} />,
    },
    {
      widgetName: "yesNo",
      widgetFunc: (props) => <YesNo {...props} />,
    },
    

  ],
}

export default config;