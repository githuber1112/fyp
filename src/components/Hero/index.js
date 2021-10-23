import React from "react";
import { Link } from "react-router-dom";
import heroPicture from "./../../assets/heropicture.jpg";
import "./styles.scss";
import Button from "./../forms/Button";
import { Carousel } from "antd";

function HeroSection() {
  return (
    <div className="heroWrap">
      <Carousel autoplay effect="fade">
        <div className="hero-container">
          <p>Elonmask is a leading online store.</p>
          <p>
            We provide an unparalleled selection of quality products, an easy
            shopping experience, expedited shipping offers, and exceptional
            customer service.{" "}
          </p>
          <div className="hero-btns">
            <Link to="/search">
              <Button className="btn">Shop Now ></Button>
            </Link>
          </div>
        </div>
        <div>2</div>
      </Carousel>
    </div>
  );
}

export default HeroSection;
