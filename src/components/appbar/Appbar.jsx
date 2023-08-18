import {
  AppBar,
  Avatar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import dummyLogo from "../../assets/images/dummy-logo.png";
import classes from "./styles.module.css";
import { Close } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const Appbar = (props) => {
  const { window } = props;

  const navItems = [
    { id: 0, label: "home", link: "/" },
    { id: 1, label: "add profile", link: "/add" },
    { id: 2, label: "contact us", link: "/contact" },
    { id: 3, label: "about us", link: "/about" },
  ];

  const userItems = [
    { id: 4, label: "add person", link: "/add" },
    { id: 5, label: "log out", link: "/" },
  ];

  const socialItems = [
    {
      // icon: <Instagram />,
      link: "www.instagram.com/",
    },
    {
      //  icon: <Facebook />,
      link: "www.facebook.com/",
    },
    {
      // icon: <Twitter />,
      link: "www.twitter.com/",
    },
    {
      //  icon: <LinkedIn />,
      link: "www.linkedin.com/",
    },
  ];

  const location = useLocation();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => setDrawerOpen((prevState) => !prevState);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawerCont = (
    <Box onClick={handleDrawerToggle}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        sx={{ py: 12, px: 6 }}
      >
        <Grid item>
          <IconButton
            onClose={handleDrawerToggle}
            sx={{
              position: "absolute",
              top: 25,
              right: 25,
              borderRadius: 0,
              color: "white.four",
              border: "2px solid",
              borderRadius: 0,
              width: 30,
              height: 30,
              "&:hover": { color: "#FFB82B" },
            }}
          >
            <Close />
          </IconButton>
        </Grid>
        {navItems.map((item) => (
          <Grid item key={item.label} className={classes.drawerItemsCont}>
            <NavLink
              to={item.link}
              style={
                location.pathname === item.link
                  ? { color: "#d3f345" }
                  : { color: "#ab5345" }
              }
            >
              {item.label}
            </NavLink>
          </Grid>
        ))}
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            mt: 6,
            gap: 2,
          }}
        >
          {socialItems.map((item) => (
            <NavLink to={item.link}>{item.link}</NavLink>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
  return (
    <>
      <AppBar sx={{ background: "#ffffff", py: 2 }} position="static">
        <CssBaseline />
        <Container>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Grid item xs={4} md={2}>
              <NavLink to="/">
                <img src={dummyLogo} alt="dummy-logo" width="80%" />
              </NavLink>
            </Grid>
            <Grid
              item
              md={8}
              display={{ xs: "none", md: "flex" }}
              justifyContent="center"
            >
              {navItems.map((item) => (
                <NavLink
                  exact
                  to={item.link}
                  key={item.id}
                  className={
                    location.pathname === item.link
                      ? `${classes.indMenuItem} ${classes.indMenuItemActive}`
                      : `${classes.indMenuItem}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </Grid>
            <Grid item md={2} display={{ xs: "none", md: "flex" }}>
              <Tooltip title="User Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userItems.map((user) => (
                  <MenuItem key={user.id} onClick={handleCloseUserMenu}>
                    <NavLink to={user.link} style={{ textDecoration: "none" }}>
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
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Grid>

            <Grid item xs={2} display={{ xs: "flex", md: "none" }}>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="termporary"
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              display: { xs: "flex", md: "none" },
              width: "60%",
              background: "#091242",
            },
          }}
        >
          {drawerCont}
        </Drawer>
      </Box>
    </>
  );
};

export default Appbar;
