import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { pilotActions } from "@paralogs/front-core";
import { pilotSelector } from "../../selectors/pilotSelector";

export const AccountView: React.FC = () => {
  const pilot = useSelector(pilotSelector);
  const dispatch = useDispatch();

  return pilot ? (
    <Box padding={2}>
      <h6>This is account view component</h6>
      <p>First name : {pilot.firstName}</p>
      <p>Last name : {pilot.lastName}</p>
      <EditIcon onClick={() => dispatch(pilotActions.showUpdateForm)} />
    </Box>
  ) : (
    <div>No current user</div>
  );
};
