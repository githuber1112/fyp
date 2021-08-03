import React from 'react';
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";
import Options from './Widgets/Options';



//widgets
import ProductEnquiry from './Widgets/ProductEnquiry';
import GeneralEnquiry from './Widgets/GeneralEnquiry';
import PaymentEnquiry from './Widgets/PaymentEnquiry';
import RefundEnquiry from './Widgets/RefundEnquiry';
import UserAccountEnquiry from './Widgets/UserAccountEnquiry';
import LinkShop from './Widgets/Link/LinkShop';
import LinkDashboard from './Widgets/Link/LinkDashboard';
import LinkRegistration from './Widgets/Link/LinkRegistration';
import YesNo from './Widgets/YesNo';


const config = {
  initialMessages: [createChatBotMessage(`Hi, how can I help you?`,{
    widget:"options",
  })],
    botName:"elonMask ChatBot",
    customComponents: {
        botAvatar: (props) => <BotAvatar {...props}/>
    },
    customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "black",
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
      widgetName: "productEnquiry",
      widgetFunc: (props) => <ProductEnquiry {...props} />,
    },
    {
      widgetName: "generalEnquiry",
      widgetFunc: (props) => <GeneralEnquiry {...props} />,
    },
    {
      widgetName: "paymentEnquiry",
      widgetFunc: (props) => <PaymentEnquiry {...props} />,
    },
    {
      widgetName: "refundEnquiry",
      widgetFunc: (props) => <RefundEnquiry {...props} />,
    },
    {
      widgetName: "userAccountEnquiry",
      widgetFunc: (props) => <UserAccountEnquiry {...props} />,
    },
    {
      widgetName: "linkShop",
      widgetFunc: (props) => <LinkShop {...props} />,
    },
    {
      widgetName: "linkDashboard",
      widgetFunc: (props) => <LinkDashboard {...props} />,
    },
    {
      widgetName: "linkRegistration",
      widgetFunc: (props) => <LinkRegistration {...props} />,
    },
    {
      widgetName: "yesNo",
      widgetFunc: (props) => <YesNo {...props} />,
    },
    

  ],
}

export default config;