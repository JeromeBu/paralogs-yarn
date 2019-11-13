import React from "react";

import { salut } from "@paralogs/shared";
import { MyLink } from "../commun/MyLink";

export const Home: React.FC = () => {
  return (
    <p>
      Welcome, got to <MyLink to="flights">Flights</MyLink>
      <br />
      This is from shared package : {salut}
    </p>
  );
};
