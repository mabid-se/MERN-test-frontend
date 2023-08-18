import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import dummyLogo from "../assets/images/dummy-logo.png";
import fbLight from "../assets/icons/facebookLight.png";
import igLight from "../assets/icons/instagramLight.png";
import linkLight from "../assets/icons/linkedinLight.png";
import ytLight from "../assets/icons/youtubeLight.png";

const MainNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 1, label: "home", link: "/" },
    { id: 2, label: "add employee", link: "/add" },
    { id: 3, label: "about us", link: "/about-us" },
    { id: 4, label: "contact us", link: "/contact-us" },
    { id: 5, label: "faqs", link: "/faqs" },
  ];

  const socialItems = [
    { id: 5, icon: ytLight, label: "youtube-logo", link: "/" },
    { id: 6, icon: linkLight, label: "linkedin-logo", link: "/" },
    { id: 7, icon: fbLight, label: "facebook-logo", link: "/" },
    { id: 8, icon: igLight, label: "instagram-logo", link: "/" },
  ];

  const userItems = [
    { id: 9, label: "add employee", link: "/add" },
    { id: 10, label: "log out", link: "/" },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        py={16}
        px={4}
        sx={{
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        <Grid item>
          <IconButton
            size="small"
            onClose={handleDrawerToggle}
            sx={{
              position: "absolute",
              top: 25,
              right: 25,
              color: "#ffffff",
              border: 2,
              borderRadius: "50%",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        {navItems.map((item) => (
          <Grid item py={2} color="#ffffff" borderBottom={2}>
            <Link to={item.link} style={{ textDecoration: "none" }}>
              <Typography variant="h5" color="#ffffff">
                {item.label}
              </Typography>
            </Link>
          </Grid>
        ))}

        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mt={6}
          >
            {socialItems.map((item) => (
              <Grid item>
                <Link to={item.link}>
                  <img src={item.icon} alt="" />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      <Box>
        <CssBaseline />
        <AppBar
          position="absolute"
          elevation={6}
          sx={{ py: 1, elevation: 6, background: "white" }}
        >
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              color="black !important"
              display={{ xs: "none", md: "flex" }}
            >
              {/* --- logo for large displays ---  */}
              <Grid item md={2} px={{ md: 1, lg: 3 }}>
                <Typography
                  component="a"
                  onClick={() => navigate("/")}
                  sx={{
                    mx: 3,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={dummyLogo}
                    alt="dummy-logo"
                    style={{ width: "65%" }}
                  />
                </Typography>
              </Grid>
              {/* --- menu for large displays --- */}
              <Grid item md={8} px={{ md: 1, lg: 3 }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={5}
                  sx={{
                    color: "black.700",
                    textTransform: "capitalize",
                  }}
                >
                  {navItems.map((item) => (
                    <Grid item>
                      <Link to={item.link} style={{ textDecoration: "none" }}>
                        <Typography
                          sx={
                            location.pathname === item.link
                              ? {
                                  color: "#272727",
                                  fontSize: 15,
                                  fontWeight: 700,
                                  textTransform: "capitalize",
                                  textDecoration: "none",
                                  textDecoration: "underline",
                                  textUnderlineOffset: 33,
                                  textDecorationThickness: 2,
                                }
                              : {
                                  color: "#a9a9a9",
                                  fontSize: 15,
                                  fontWeight: 500,
                                  textTransform: "capitalize",
                                  textDecoration: "none",
                                  "&:hover": {
                                    color: "#272727",
                                    fontWeight: 700,
                                    textDecoration: "underline",
                                    textUnderlineOffset: 33,
                                    textDecorationThickness: 2,
                                  },
                                }
                          }
                        >
                          {item.label}
                        </Typography>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item md={2} px={{ md: 1, lg: 3 }}>
                <Tooltip title="User Menu">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "50px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userItems.map((user) => (
                    <MenuItem key={user.id} onClick={handleCloseUserMenu}>
                      <Link to={user.link} style={{ textDecoration: "none" }}>
                        <Typography
                          sx={{
                            color: "#a9a9a9",
                            textTransform: "capitalize",
                            fontWeight: 500,
                            "&:hover": { color: "#272727" },
                          }}
                        >
                          {user.label}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
            </Grid>

            {/* --- Menu for small displays --- */}
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              display={{ md: "none" }}
            >
              {/* --- logo for small displays --- */}
              <Grid item xs={10}>
                <Link to="/">
                  <img
                    src={dummyLogo}
                    alt="dummy-logo"
                    style={{ width: "20%" }}
                  />
                </Link>
              </Grid>
              {/* --- menu button for small displays --- */}
              <Grid item xs={2}>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  size="large"
                  sx={{
                    flexGrow: 0,
                    mr: 2,
                    display: { md: "none" },
                    "&:hover": {
                      color: "white.900",
                      borderRadius: 15,
                      backgroundColor: "black.800",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/* --- drawer menu for small displays --- */}
        <Box component="nav" sx={{ height: "auto" }}>
          <Drawer
            // container={container}
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#272727",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default MainNavbar;
