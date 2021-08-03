import React from "react";

import Link from "./Link";

const LinkDashboard = () => {
  const getUrl = () => {
    return `dashboard`;
  };

  return (
  <Link url={getUrl()} title={"Dashboard"} />

  );
};

export default LinkDashboard;