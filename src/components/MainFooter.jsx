import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import dummyLogo from "../assets/images/dummy-logo.png";
import ytLogo from "../assets/icons/youtubeDark.png";
import inLogo from "../assets/icons/linkedinDark.png";
import fbLogo from "../assets/icons/facebookDark.png";
import igLogo from "../assets/icons/instagramDark.png";

const useStyles = {
  navLinkItem: {
    color: "#a9a9a9",
    fontWeight: 500,
    textTransform: "capitalize",
    textDecoration: "none",
    "&:hover": {
      color: "#4d4d4d",
      textDecoration: "underline",
    },
  },
  navLinkHead: { color: "#272727", fontWeight: 600 },
};

const MainFooter = () => {
  const linkCat1 = [
    { label: "link 1", link: "" },
    { label: "link 2 2", link: "" },
    { label: "link 3 3 3", link: "" },
    { label: "link 4 4 4 4", link: "" },
  ];
  const linkCat2 = [
    { label: "link 1", link: "" },
    { label: "link 2 2", link: "" },
    { label: "link 3 3 3", link: "" },
  ];
  const linkCat3 = [
    { label: "link 1", link: "" },
    { label: "link 2 2", link: "" },
    { label: "link 3 3 3", link: "" },
  ];
  const linkCat4 = [
    { label: "link 1", link: "" },
    { label: "link 2 2", link: "" },
    { label: "link 3 3 3", link: "" },
  ];
  const linkCat5 = [
    { label: "link 1", link: "" },
    { label: "link 2 2", link: "" },
    { label: "link 3 3 3", link: "" },
    { label: "link 4 4 4 4", link: "" },
  ];
  const linkCat6 = [
    { label: "+1-234-567-8901", link: "" },
    { label: "+1-987-654-3210", link: "" },
    { label: "support@domain.com", link: "" },
  ];

  return (
    <>
      <Box
        sx={{
          py: 4,
          px: { xs: 2, md: 8 },
          boxShadow: `0 3px 10px rgb(0 0 0 / 0.2)`,
        }}
      >
        <Grid container direction="row">
          <Grid item xs={12} md={4} px={2}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
            >
              {/* --- Heading --- */}
              <Grid item>
                <Link to="/">
                  <img src={dummyLogo} alt="dummy-logo" width="65%" />
                </Link>
              </Grid>
              {/* --- social icons --- */}
              <Grid item my={{ xs: 1, md: 2 }}>
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={3}>
                    <Link onClick="" sx={{ cursor: "pointer" }}>
                      <img
                        src={ytLogo}
                        alt="youtube-dark"
                        style={{ width: "55%" }}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Link onClick="" sx={{ cursor: "pointer" }}>
                      <img
                        src={inLogo}
                        alt="linkedin-dark"
                        style={{ width: "55%" }}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Link onClick="" sx={{ cursor: "pointer" }}>
                      <img
                        src={fbLogo}
                        alt="facebook-dark"
                        style={{ width: "55%" }}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Link onClick="" sx={{ cursor: "pointer" }}>
                      <img
                        src={igLogo}
                        alt="instagram-dark"
                        style={{ width: "55%" }}
                      />
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              {/* --- contact details --- */}
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item xs={3}>
                        <Typography
                          variant="body2"
                          color="black.800"
                          fontWeight="regular"
                        >
                          Phone
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          variant="body2"
                          color="black.600"
                          fontWeight="bold"
                        >
                          +1-234-567-8901
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item xs={3}>
                        <Typography
                          variant="body2"
                          color="black.800"
                          fontWeight="regular"
                        >
                          WhatsApp
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          variant="body2"
                          color="black.600"
                          fontWeight="bold"
                        >
                          +1-234-567-8901
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item xs={3}>
                        <Typography
                          variant="body2"
                          color="black.800"
                          fontWeight="regular"
                        >
                          Email
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          variant="body2"
                          color="black.600"
                          fontWeight="bold"
                        >
                          mail@domain.com
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item xs={3}>
                        <Typography
                          variant="body2"
                          color="black.800"
                          fontWeight="regular"
                        >
                          Address
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          variant="body2"
                          color="black.600"
                          fontWeight="bold"
                        >
                          Office Name, Building, Block, Town, City
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            mt={{ xs: 8, md: 0 }}
            px={{ xs: 2, sm: 3, md: 6 }}
          >
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="stretch"
              spacing={2}
            >
              <Grid item>
                <Typography variant="h3" color="black.800" fontWeight="bold">
                  Quick Links
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item xs={6} sm={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h6" style={useStyles.navLinkHead}>
                          Link Cat 1
                        </Typography>
                      </Grid>
                      {linkCat1.map((item) => (
                        <Grid item>
                          <Link to={item.link} style={useStyles.navLinkItem}>
                            {item.label}
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h6" style={useStyles.navLinkHead}>
                          Link Cat 2
                        </Typography>
                      </Grid>
                      {linkCat2.map((item) => (
                        <Grid item>
                          <Link to={item.link} style={useStyles.navLinkItem}>
                            {item.label}
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h6" style={useStyles.navLinkHead}>
                          Link Cat 3
                        </Typography>
                      </Grid>
                      {linkCat3.map((item) => (
                        <Grid item>
                          <Link to={item.link} style={useStyles.navLinkItem}>
                            {item.label}
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h6" style={useStyles.navLinkHead}>
                          Link Cat 4
                        </Typography>
                      </Grid>
                      {linkCat4.map((item) => (
                        <Grid item>
                          <Link to={item.link} style={useStyles.navLinkItem}>
                            {item.label}
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h6" style={useStyles.navLinkHead}>
                          Link Cat 5
                        </Typography>
                      </Grid>

                      {linkCat5.map((item) => (
                        <Grid item>
                          <Link to={item.link} style={useStyles.navLinkItem}>
                            {item.label}
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h6" style={useStyles.navLinkHead}>
                          Support
                        </Typography>
                      </Grid>
                      {linkCat6.map((item) => (
                        <Grid item>
                          <Link to={item.link} style={useStyles.navLinkItem}>
                            {item.label}
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MainFooter;
