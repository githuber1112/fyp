import React from "react";
import "./styles.scss";
import { Card, Typography } from "antd";

const { Text } = Typography;

const InfoData = ({ title, cases, total, active, isRed, isGrey, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoCard ${active && "infoCardSelected"}
      ${isRed && "infoRedSelected"}
      ${isGrey && "infoGreySelected"}
      `}
    >
      {/*title e.g Co,firmed Cases)*/}
      <h3 className="infoTitle">{title}</h3>
      {/*cases e.g +120k*/}
      <h2
        className={`infoCases 
        ${isRed && "infoCasesRed"}
        ${isGrey && "infoCasesBlack"}
        `}
      >
        {cases} <span className="upperT">(T</span>
        <span className="today">oday)</span>
      </h2>
      {/*total e.g 1.2M Total*/}
      <Text className="infoTotal" type="secondary">
        Total: {total}
      </Text>
    </Card>
  );
};

export default InfoData;
