import React from "react";

import { MyLink } from "../commun/MyLink";

export const Home: React.FC = () => {
  return (
    <p>
      Welcome, got to <MyLink to="flights">Flights</MyLink>
    </p>
  );
};
