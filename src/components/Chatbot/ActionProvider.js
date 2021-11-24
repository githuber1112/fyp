import React from "react";
import { Rate } from "antd";
import { firestore } from "../../firebase/utils";

// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  helloWorldHandler = () => {
    const message = this.createChatBotMessage(
      "Hello. I am not self aware. Luckily!"
    );
    this.setChatbotMessage(message);
  };

  handleLeaving = () => {
    const message = this.createChatBotMessage(
      "Happy to help ! Hope you enjoy purchasing on this website!"
    );
    const message1 = this.createChatBotMessage(
      "Please rate this chatbot (1-5).Your feedback is highly appreciated and will help us to improve our ability to serve you and other users of our web sites."
    );
    const message2 = this.createChatBotMessage(
      <Rate
        onChange={(value) => {
          const rating = { rating: value };
          firestore.collection("chatbot").doc().set(rating);
        }}
      />
    );
    this.setChatbotMessage(message);
    this.setChatbotMessage(message1);
    this.setChatbotMessage(message2);
  };

  handleUnderstand = () => {
    const message = this.createChatBotMessage(
      "I am so happy that I could help you. Do you still have any enquiry?",
      {
        widget: "yesNo",
      }
    );

    this.setChatbotMessage(message);
  };

  handleHelpEnquiry = () => {
    const message = this.createChatBotMessage("Hi, how can I help you?", {
      widget: "options",
    });

    this.setChatbotMessage(message);
  };

  handleProductEnquiry = () => {
    const clientMessage = this.createClientMessage("Product Enquiry");
    const message = this.createChatBotMessage(
      "You have selected Product Enquiry. May I know what problem are u facing?",
      {
        widget: "productEnquiry",
      }
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleGeneralEnquiry = () => {
    const clientMessage = this.createClientMessage("General Enquiry");
    const message = this.createChatBotMessage(
      "You have selected General Enquiry. May I know what problem are u facing?",
      {
        widget: "generalEnquiry",
      }
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handlePaymentEnquiry = () => {
    const clientMessage = this.createClientMessage("Payment Enquiry");
    const message = this.createChatBotMessage(
      "You have selected Payment Enquiry. May I know what problem are u facing?",
      {
        widget: "paymentEnquiry",
      }
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleRefundEnquiry = () => {
    const clientMessage = this.createClientMessage("Refund Enquiry");
    const message = this.createChatBotMessage(
      "You have selected Refund Enquiry. May I know what problem are u facing?",
      {
        widget: "refundEnquiry",
      }
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleUserAccountEnquiry = () => {
    const clientMessage = this.createClientMessage("User Account Enquiry");
    const message = this.createChatBotMessage(
      "You have selected User Account Enquiry. May I know what problem are u facing?",
      {
        widget: "userAccountEnquiry",
      }
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleQuotation = () => {
    const clientMessage = this.createClientMessage("Quotation");
    const message = this.createChatBotMessage(
      "For customized quotations, please contact Mr. Teoh at 012-3456789 or email to customersvc@elonmask.com !"
    );
    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleErrorMessage = () => {
    const message = this.createChatBotMessage(
      "Sorry but I dont understand what you mean."
    );

    this.setChatbotMessage(message);
  };

  handleProductNavigation = () => {
    const clientMessage = this.createClientMessage("Product Navigation");
    const message = this.createChatBotMessage(
      "Please click on the link to navigate.",
      {
        widget: "linkShop",
      }
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleProductQuestion = () => {
    const clientMessage = this.createClientMessage(
      "What products does this website sell?"
    );
    const message = this.createChatBotMessage(
      "Our website sells a list of products such as 3-ply masks, N95 masks, hand sanitizers, alcohol wipes and more. Please check out our products here :",
      {
        widget: "linkShop",
      }
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleShippingQuestion = () => {
    const clientMessage = this.createClientMessage(
      "How long does the shipping process take?"
    );
    const message = this.createChatBotMessage(
      "The shipping process takes approximately 7 - 14 days."
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleWebsiteQuestion = () => {
    const clientMessage = this.createClientMessage(
      "What is this website about?"
    );
    const message = this.createChatBotMessage(
      "This website is an e-commerce website that sells face masks and sanitizer."
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handlePaymentMethod = () => {
    const clientMessage = this.createClientMessage(
      "What payment method is available?"
    );
    const message = this.createChatBotMessage(
      "Unfortunately, currently we only accept card payments, but we are working hard to accept more payment methods."
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handlePaymentError = () => {
    const clientMessage = this.createClientMessage(
      "Why would my payment not go through?"
    );
    const message = this.createChatBotMessage(
      "There are many reasons for this case, you could try to check your payment method and try again. If the problem still persists, please log a ticket to customersvc@elonmask.com!"
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleRefundMethod = () => {
    const clientMessage = this.createClientMessage("How to refund?");
    const message = this.createChatBotMessage(
      "Go to Account Dashboard -> Order History, click on the Refund button to make your refund. Make sure that it is within 48 hours upon purchase.",
      {
        widget: "linkDashboard",
      }
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleRefundError = () => {
    const clientMessage = this.createClientMessage(
      "Why is refund unavailable for my order?"
    );
    const message = this.createChatBotMessage(
      "Refunds will not be available after 48 hours upon purchase."
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleRegisterMethod = () => {
    const clientMessage = this.createClientMessage("How to register?");
    const message = this.createChatBotMessage(
      "Go to Register page and fill in your details to register for an account.",
      {
        widget: "linkRegistration",
      }
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleChangePasswordMethod = () => {
    const clientMessage = this.createClientMessage("How to change password?");
    const message = this.createChatBotMessage(
      "Go to Account Dashboard -> Change password in order to change your password.",
      {
        widget: "linkDashboard",
      }
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  handleLoginError = () => {
    const clientMessage = this.createClientMessage(
      "Why can't I login to my account?"
    );
    const message = this.createChatBotMessage(
      "Kindly check your login credentials before login. If the problem still persists, please log a ticket to customersvc@elonmask.com"
    );

    this.setChatbotMessage(clientMessage);
    this.setChatbotMessage(message);
  };

  setChatbotMessage = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}

export default ActionProvider;
