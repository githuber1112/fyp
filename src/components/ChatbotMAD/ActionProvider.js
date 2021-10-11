import React from 'react';
import { Rate } from 'antd';



// ActionProvider starter code
class ActionProvider {


    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    helloWorldHandler = () => {
        const message = this.createChatBotMessage("Hello. I am not self aware. Luckily!");
        this.setChatbotMessage(message);
    }

    handleLeaving = () => {
      const message = this.createChatBotMessage("Happy to help ! Hope you enjoy purchasing on this website!")
      const message1 = this.createChatBotMessage("Please rate this chatbot (1-5).Your feedback is highly appreciated and will help us to improve our ability to serve you and other users of our web sites.")
      const message2= this.createChatBotMessage(<Rate />)
      this.setChatbotMessage(message);
      this.setChatbotMessage(message1);
      this.setChatbotMessage(message2);

    }
    
    handleUnderstand = () => {
      const message = this.createChatBotMessage("I am so happy that I could help you. Do you still have any enquiry?",{
        widget:"yesNo"
      })

      this.setChatbotMessage(message);
    }

    handleHelpEnquiry = () => {
      const message = this.createChatBotMessage("Hi, how can I help you?",{
        widget:"options"});
        


      this.setChatbotMessage(message);

  }


    handleGeneralEnquiry = () => {
      const clientMessage= this.createClientMessage("General Enquiry");
      const message = this.createChatBotMessage("You have selected General Enquiry. May I know what problem are u facing?",{
        widget:"generalEnquiry"});
        

      this.setChatbotMessage(clientMessage);
      this.setChatbotMessage(message);

    }

    handleDonationQuestion = () => {
      const clientMessage= this.createClientMessage("Can I make donations to Agmo?");
      const message = this.createChatBotMessage("For all donations, please bank in to us at :");
      const message1 = this.createChatBotMessage("Account Number : 4242424242424242 ")
      const message2 = this.createChatBotMessage("Bank : Hong Leong Bank")
      const message3 = this.createChatBotMessage("Recipient Name : Teoh Kaijet")
      const message4 = this.createChatBotMessage("After that, please attach the screenshot of your receipt and email it to us at contact@agmo.com ")
        

      this.setChatbotMessage(clientMessage);
      this.setChatbotMessage(message);
      this.setChatbotMessage(message1);
      this.setChatbotMessage(message2);
      this.setChatbotMessage(message3);
      this.setChatbotMessage(message4);

    }

    handleWebsiteQuestion = () => {
      const clientMessage= this.createClientMessage("How can I change my profile picture?");
      const message = this.createChatBotMessage("To change your profile picture, go to the User Profile Page > Settings Button > Edit Profile Picture");
        

      this.setChatbotMessage(clientMessage);
      this.setChatbotMessage(message);

    }

    handleContactQuestion = () => {
      const clientMessage= this.createClientMessage("How do I contact the support team?");
      const message = this.createChatBotMessage("To contact our support team, go to User Profile Page > Settings Button > About Us > email to our support team.");
        

      this.setChatbotMessage(clientMessage);
      this.setChatbotMessage(message);

    }

    handleEventsEnquiry = () => {
      const clientMessage= this.createClientMessage("Events Enquiry");
      const message = this.createChatBotMessage("You have selected Events Enquiry. May I know what problem are u facing?",{
        widget:"eventsEnquiry"});
        

      this.setChatbotMessage(clientMessage);
      this.setChatbotMessage(message);

    }

    handleJoinEventQuestion = () => {
      const clientMessage= this.createClientMessage("How do I join an event?");
      const message = this.createChatBotMessage("You can access the events through searching the event name, or click on the near me button which will allow you to know if there is any event near your current location. To join the event, just click into the event you want and it will list out the event details for you, as well as a join event button below.");
        

      this.setChatbotMessage(clientMessage);
      this.setChatbotMessage(message);

    }

    handleEventFreeQuestion = () => {
      const clientMessage= this.createClientMessage(" Are the events free to join?");
      const message = this.createChatBotMessage("Yes, all events are free to join and will not cost you any money.");
        

      this.setChatbotMessage(clientMessage);
      this.setChatbotMessage(message);

    }
    
    handleVolunteersEnquiry = () => {
      const clientMessage= this.createClientMessage("Volunteers Enquiry");
      const message = this.createChatBotMessage("You have selected Volunteers Enquiry. May I know what problem are u facing?",{
        widget:"volunteersEnquiry"});
        

      this.setChatbotMessage(clientMessage);
      this.setChatbotMessage(message);

    }

    handleApplyVolunteerQuestion = () => {
      const clientMessage= this.createClientMessage("How do I apply as a volunteer?");
      const message = this.createChatBotMessage("You can access the event details screen, there is a button for you to apply as a volunteer.");
        

      this.setChatbotMessage(clientMessage);
      this.setChatbotMessage(message);

    }

    handleInterviewVolunteerQuestion = () => {
      const clientMessage= this.createClientMessage("Do I need to undergo any interviews to become a volunteer?");
      const message = this.createChatBotMessage("Depending on the event organizer, the organizer will contact you through phone or email once you have been shortlisted or accepted.");
        

      this.setChatbotMessage(clientMessage);
      this.setChatbotMessage(message);

    }

    handleErrorMessage = () => {
      const message = this.createChatBotMessage("Sorry but I dont understand what you mean.")

      this.setChatbotMessage(message);
    }


    setChatbotMessage = (message) => {
        this.setState(state => ({...state, messages:[...state.messages,message] }))
    }
  } 
  
  export default ActionProvider;