import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SectorsData } from "../data/Sectors";
import { ArrowBack, ArrowForward, Check, Close } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = {
  mainBoxCont: { mt: { xs: 4, sm: 6, md: 8 }, py: 4 },
  mainPaperCont: { elevation: 6, borderRadius: 4, mt: 4, p: { xs: 3, md: 4 } },
  stepHeading: { color: "#272727", fontWeight: 700, textAlign: "center" },
  stepDesc: { color: "#a9a9a9", fontWeight: 500, textAlign: "center" },
};

const UpdatePersonForm = (data) => {
  const { _id, name, sectors, terms } = data.data;

  const navigate = useNavigate();

  // handle form stepper
  const [activeStep, setActiveStep] = useState(0);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleNext = () => setActiveStep(activeStep + 1);

  // handle name input field
  const [enteredName, setEnteredName] = useState(name);
  const handleNameChange = (e) => {
    setEnteredName(e.target.value);
    console.log("entered name: ", enteredName);
  };

  // handle sectors selection field
  const [selectedSectors, setSelectedSectors] = useState(sectors);
  const handleSelectedSectors = (item) => {
    setSelectedSectors((prevSelectedSectors) => {
      const isSelected = prevSelectedSectors.includes(item);
      if (isSelected)
        return prevSelectedSectors.filter(
          (selectedSector) => selectedSector !== item
        );
      else return [...prevSelectedSectors, item];
    });
  };

  // handle terms selection field
  const [selectedTerms, setSelectedTerms] = useState(terms);

  // handle toast show hide state
  const [toastOpen, setToastOpen] = useState(false);

  // handle toast message state
  const [messageText, setMessageText] = useState("");

  //   handle update person state
  const [updatePerFrom, setUpdatePerForm] = useState({
    id: _id,
    name: name,
    sectors: sectors,
    terms: terms,
  });

  // send request to update employee
  const updatePersonRequest = async (e) => {
    e.preventDefault();
    setUpdatePerForm({
      id: _id,
      name: enteredName,
      sectors: selectedSectors,
      terms: selectedTerms,
    });

    const { idF, nameF, sectorsF, termsF } = updatePerFrom;

    // Check if all required fields are filled
    if (enteredName === "" || selectedSectors === [] || selectedTerms === "") {
      setToastOpen(true);
      if (enteredName === "") setMessageText("Please enter your name");
      else if (selectedSectors === []) setMessageText("Please select sectors");
      else setMessageText("Please select terms");
    } else {
      try {
        console.log("sending data to api");
        console.log("id: ", idF);

        const res = await axios.put(
          `https://mern-test-backend-production-3092.up.railway.app/persons/${idF}`,
          {
            nameF,
            sectorsF,
            termsF,
          }
        );

        setToastOpen(true);
        setMessageText("Employee updated scuccessfully");

        // clear update from state
        setEnteredName("");
        setSelectedSectors([]);
        setSelectedTerms("");
        // setUpdatePerForm({ name: "", sectors: [], terms: "" });
        navigate("/");
      } catch (error) {
        console.error("Error while updating employee: ", error);
      }
    }
  };

  return (
    <>
      <Box sx={useStyles.mainBoxCont}>
        <Container>
          <Paper sx={useStyles.mainPaperCont}>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="stretch"
            >
              {activeStep === 0 && (
                <>
                  <Grid item mt={4}>
                    <Typography variant="h4" sx={useStyles.stepHeading}>
                      Your Name
                    </Typography>
                  </Grid>
                  <Grid item mt={1}>
                    <Typography variant="body1" sx={useStyles.stepDesc}>
                      Please Provide your full name
                    </Typography>
                  </Grid>
                  <Grid item mt={6} mb={4} textAlign="center">
                    <FormControl sx={{ width: { xs: "100%", sm: "45%" } }}>
                      <TextField
                        variant="outlined"
                        size="medium"
                        label="Your Name"
                        id="name"
                        value={enteredName}
                        onChange={handleNameChange}
                      />
                    </FormControl>
                  </Grid>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <Grid item>
                    <Typography variant="h4" sx={useStyles.stepHeading}>
                      Your Sectors
                    </Typography>
                  </Grid>
                  <Grid item mt={1}>
                    <Typography variant="body1" sx={useStyles.stepDesc}>
                      Please Sectors you're familiar with
                    </Typography>
                  </Grid>
                  <Grid item my={3}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      sx={{
                        maxHeight: { xs: "45vh", md: "42vh", xl: "52vh" },
                        overflow: "auto",
                      }}
                    >
                      {SectorsData.map((item) => (
                        <>
                          <Grid
                            item
                            key={item.label}
                            py={1}
                            px={{ xs: 1, md: 2 }}
                            borderRadius={{
                              xs: 2,
                              md: 3,
                            }}
                            m={{ xs: "4px", sm: 1 }}
                            fontWeight={500}
                            style={
                              selectedSectors.includes(item.label)
                                ? {
                                    cursor: "pointer",
                                    color: "black",
                                    border: "2px solid #9AC5F4",
                                    background: "#9AC5F4",
                                  }
                                : {
                                    cursor: "pointer",
                                    color: "#9AC5F4",
                                    border: "2px solid",
                                  }
                            }
                            onClick={() => handleSelectedSectors(item.label)}
                          >
                            {item.label}
                          </Grid>
                          {item.subcat1 && (
                            <>
                              {item.subcat1.map((cat1Item) => (
                                <>
                                  <Grid
                                    item
                                    key={cat1Item.label}
                                    py={1}
                                    px={{ xs: 1, md: 2 }}
                                    borderRadius={{
                                      xs: 2,
                                      md: 3,
                                    }}
                                    m={{ xs: "4px", sm: 1 }}
                                    fontWeight={500}
                                    style={
                                      selectedSectors.includes(cat1Item.label)
                                        ? {
                                            cursor: "pointer",
                                            color: "black",
                                            border: "2px solid #99DBF5",
                                            background: "#99DBF5",
                                          }
                                        : {
                                            cursor: "pointer",
                                            color: "#99DBF5",
                                            border: "2px solid",
                                          }
                                    }
                                    onClick={() =>
                                      handleSelectedSectors(cat1Item.label)
                                    }
                                  >
                                    {cat1Item.label}
                                  </Grid>
                                  {cat1Item.subcat2 && (
                                    <>
                                      {cat1Item.subcat2.map((cat2Item) => (
                                        <>
                                          <Grid
                                            item
                                            key={cat2Item.label}
                                            py={1}
                                            px={{ xs: 1, md: 2 }}
                                            borderRadius={{
                                              xs: 2,
                                              md: 3,
                                            }}
                                            m={{ xs: "4px", sm: 1 }}
                                            fontWeight={500}
                                            style={
                                              selectedSectors.includes(
                                                cat2Item.label
                                              )
                                                ? {
                                                    cursor: "pointer",
                                                    color: "black",
                                                    border: "2px solid #A7ECEE",
                                                    background: "#A7ECEE",
                                                  }
                                                : {
                                                    cursor: "pointer",
                                                    color: "#A7ECEE",
                                                    border: "2px solid",
                                                  }
                                            }
                                            onClick={() =>
                                              handleSelectedSectors(
                                                cat2Item.label
                                              )
                                            }
                                          >
                                            {cat2Item.label}
                                          </Grid>
                                          {cat2Item.subcat3 && (
                                            <>
                                              {cat2Item.subcat3.map(
                                                (cat3Item) => (
                                                  <Grid
                                                    item
                                                    key={cat3Item.label}
                                                    py={1}
                                                    px={{ xs: 1, md: 2 }}
                                                    borderRadius={{
                                                      xs: 2,
                                                      md: 3,
                                                    }}
                                                    m={{ xs: "4px", sm: 1 }}
                                                    fontWeight={500}
                                                    style={
                                                      selectedSectors.includes(
                                                        cat3Item.label
                                                      )
                                                        ? {
                                                            cursor: "pointer",
                                                            color: "black",
                                                            border:
                                                              "2px solid #FFEEBB",
                                                            background:
                                                              "#FFEEBB",
                                                          }
                                                        : {
                                                            cursor: "pointer",
                                                            color: "#FFEEBB",
                                                            border: "2px solid",
                                                          }
                                                    }
                                                    onClick={() =>
                                                      handleSelectedSectors(
                                                        cat3Item.label
                                                      )
                                                    }
                                                  >
                                                    {cat3Item.label}
                                                  </Grid>
                                                )
                                              )}
                                            </>
                                          )}
                                        </>
                                      ))}
                                    </>
                                  )}
                                </>
                              ))}
                            </>
                          )}
                        </>
                      ))}
                    </Grid>
                  </Grid>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <Grid item mt={4}>
                    <Typography variant="h4" sx={useStyles.stepHeading}>
                      Terms & Conditions
                    </Typography>
                  </Grid>
                  <Grid item mt={1}>
                    <Typography variant="body1" sx={useStyles.stepDesc}>
                      Do Your Agree to Our Terms & Conditions
                    </Typography>
                  </Grid>{" "}
                  <Grid item mt={4}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={6} sm={4} md={3}>
                        <Paper
                          elevation={selectedTerms === false ? 8 : 2}
                          sx={{ m: { xs: 1, sm: 3 }, p: 3, cursor: "pointer" }}
                          onClick={() => setSelectedTerms(false)}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Grid item>
                              <Close
                                sx={{ color: "#C62221", fontSize: "44px" }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography textAlign="center">
                                I don't agree to Terms & Conditions
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={4} md={3}>
                        <Paper
                          elevation={selectedTerms === true ? 8 : 2}
                          sx={{ m: { xs: 1, sm: 3 }, p: 3, cursor: "pointer" }}
                          onClick={() => setSelectedTerms(true)}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Grid item>
                              <Check
                                sx={{ color: "#21C676", fontSize: "44px" }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography textAlign="center">
                                Yes I agree to Terms & Conditions
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 4,
                    paddingX: 2,
                  }}
                >
                  <Button
                    disableRipple
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    startIcon={<ArrowBack />}
                    sx={{
                      py: 1,
                      px: 3,
                      color: "#ffffff",
                      fontSize: 15,
                      fontWeight: "bold",
                      textTransform: "none",
                      letterSpacing: 1,
                      border: 2,
                      borderColor: "#4d4d4d",
                      backgroundColor: "#4d4d4d",
                      borderRadius: 3,
                      "&:hover": { color: "#4d4d4d" },
                    }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {activeStep < 2 ? (
                    <Button
                      disableRipple
                      endIcon={<ArrowForward />}
                      onClick={handleNext}
                      sx={{
                        py: 1,
                        px: 3,
                        color: "#ffffff",
                        fontSize: 15,
                        fontWeight: 700,
                        textTransform: "none",
                        letterSpacing: 1,
                        border: 2,
                        borderColor: "#4d4d4d",
                        backgroundColor: "#4d4d4d",
                        borderRadius: 3,
                        "&:hover": { color: "#4d4d4d" },
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      disableRipple
                      onClick={updatePersonRequest}
                      sx={{
                        py: 1,
                        px: 3,
                        color: "#ffffff",
                        fontSize: 15,
                        fontWeight: "bold",
                        textTransform: "none",
                        letterSpacing: 1,
                        border: 2,
                        borderColor: "#4d4d4d",
                        backgroundColor: "#4d4d4d",
                        borderRadius: 3,
                        "&:hover": { color: "#4d4d4d" },
                      }}
                    >
                      Update
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      <Snackbar
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        autoHideDuration={2000}
      >
        {messageText === "Employee added scuccessfully" ? (
          <Alert
            severity="success"
            onClose={() => setToastOpen(false)}
            sx={{ width: "100%" }}
          >
            {messageText}
          </Alert>
        ) : (
          <Alert
            severity="error"
            onClose={() => setToastOpen(false)}
            sx={{ width: "100%" }}
          >
            {messageText}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default UpdatePersonForm;
