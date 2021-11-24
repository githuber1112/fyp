import React from "react";
import Header from "./../components/header";
import Footer from "./../components/Footer";
import ChatBot from "../components/Chatbot";

const MainLayout = (props) => {
  return (
    <div>
      <Header {...props} />
      <div className="main">{props.children}</div>
      <ChatBot />
      <Footer />
    </div>
  );
};

export default MainLayout;
