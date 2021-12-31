import React from "react";

// MaterialUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import {
  IconButton,
  Tooltip,
  Avatar,
  Container,
  Typography,
} from "@mui/material";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const NavBar = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ boxShadow: "none" }}>
          <Toolbar>
            {" "}
            <Box
              component="img"
              sx={{
                height: 64,
              }}
              alt="Your logo."
              src={window.location.origin + "/assets/logo.png"}
              alt="logo"
            />
            <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
              Bruno Bohlmann
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar
                src={window.location.origin + "/assets/avatar.jpg"}
                variant="rounded"
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Offset />
      </Box>
    </div>
  );
};

export default NavBar;
