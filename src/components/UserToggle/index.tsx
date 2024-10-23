import { Stack, Typography, Switch } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectUserType,
  switchUserType,
} from "../../features/userToggle/userToggleSlice";

const UserToggle: React.FC = () => {
  const isAdmin = useAppSelector(selectUserType);
  const dispatch = useAppDispatch();

  return (
    <Stack justifyContent="flex-end" direction="row" alignItems="center">
      <Typography variant="body2">admin</Typography>
      <Switch checked={!isAdmin} onChange={() => dispatch(switchUserType())} />
      <Typography variant="body2">user</Typography>
    </Stack>
  );
};

export default UserToggle;
