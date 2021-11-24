import React from "react";
import Directory from "./../../components/Directory";
import "./styles.scss";
import ChatBot from "./../../components/Chatbot/index";
import ProductCarousel from "../../components/Card";
import HeroSection from "../../components/Hero";
import Featuring from "../../components/Featuring";

const Homepage = (props) => {
  return (
    <div>
      <HeroSection />
      <ProductCarousel />
      <Directory />
      <Featuring />
    </div>
  );
};

export default Homepage;
