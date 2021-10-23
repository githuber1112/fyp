import React from "react";
import Button from "./../forms/Button";
import "./styles.scss";

const LoadMore = ({ onLoadMoreEvt = () => {} }) => {
  return (
    <Button className="loadBtn" onClick={() => onLoadMoreEvt()}>
      Load More
    </Button>
  );
};

export default LoadMore;
