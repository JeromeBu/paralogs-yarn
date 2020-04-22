import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { authSelectors } from "../../selectors/authSelectors";

export const AccountView: React.FC = () => {
  const currentUser = useSelector(authSelectors.currentUser);

  return currentUser ? (
    <Box padding={2}>
      <h6>This is account view component</h6>
      <p>Email: currentUser.</p>
      <p>First name : {currentUser?.firstName}</p>
      <p>First name : {currentUser?.lastName}</p>
      <EditIcon onClick={() => "TODO trigger action to show user update form"} />
    </Box>
  ) : (
    <div>No current user</div>
  );
};
