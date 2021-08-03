import React from "react";

import Link from "./Link";

const LinkRegistration = () => {
  const getUrl = () => {
    return `registration`;
  };

  return (
  <Link url={getUrl()} title={"Registration"} />

  );
};

export default LinkRegistration;