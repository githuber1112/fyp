import React from "react";

import Link from "./Link";

const LinkShop = () => {
  const getUrl = () => {
    return `search`;
  };

  return (
  <Link url={getUrl()} title={"Shop"} />

  );
};

export default LinkShop;