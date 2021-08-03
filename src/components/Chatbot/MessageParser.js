// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {

      const lowercase= message.toLowerCase();

      if (lowercase.includes("hello") || lowercase.includes("hi") || lowercase.includes("hey")) {
          this.actionProvider.helloWorldHandler()
          return;
      }

      if (lowercase.includes("product")){
        this.actionProvider.handleProductEnquiry()
        return;
      }

      if (lowercase.includes("help")){
        this.actionProvider.handleHelpEnquiry()
        return;
      }

      if (lowercase.includes("thanks") || lowercase.includes("bye") ){
        this.actionProvider.handleLeaving()
        return;
      }

      if (lowercase.includes("ok") || lowercase.includes("understand")){
        this.actionProvider.handleUnderstand()
        return;
      }

      this.actionProvider.handleErrorMessage()

    }
  }
  
  export default MessageParser;

