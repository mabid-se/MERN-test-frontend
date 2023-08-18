import React, { useEffect, useState } from "react";
import axios from "axios";
import { SectorsData } from "../data/Sectors";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const AddPersonForm = () => {
  const steps = ["name", "sectors", "terms"];
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const [enteredName, setEnteredName] = useState("");
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedTerms, setSelectedTerms] = useState(false);

  const handleSelectedSectors = (item) => {
    const isSelected = selectedSectors.includes(item);
    if (isSelected)
      setSelectedSectors(
        selectedSectors.filter((selectedSector) => selectedSector !== item)
      );
    else setSelectedSectors([...selectedSectors, item]);
  };

  const [createPerson, setCreatePerson] = useState({
    name: "",
    sectors: [],
    terms: false,
  });

  const handleCreatePerFields = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input is a checkbox, update the 'terms' field with the checked status
    const newValue = type === "checkbox" ? checked : value;
    setCreatePerson({ ...createPerson, [name]: newValue });
  };

  const addPerson = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!createPerson.name || !createPerson.sectors || !createPerson.terms) {
      console.log("Please fill in all required fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/persons",
        createPerson
      );
      console.log("Person added: ", res.data);

      // Clear the form after successful submission
      setCreatePerson({ name: "", sectors: "", terms: false });
    } catch (error) {
      console.error("Error adding person", error);
    }
  };

  useEffect(() => {
    console.log("selected sectors are: ", selectedSectors);
  }, []);

  return (
    <>
      <Box sx={{ mt: { xs: 4, sm: 6, md: 10 }, py: 4 }}>
        <Container>
          <Paper
            elevation={6}
            sx={{ borderRadius: 4, mt: 4, p: { xs: 3, md: 4 } }}
          >
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="stretch"
              // height={{ xs: "650px", md: "700px", xl: "auto" }}
            >
              {activeStep === 0 && (
                <>
                  <Grid item mt={4}>
                    <Typography
                      variant="h4"
                      color="black.800"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      Your Name
                    </Typography>
                  </Grid>
                  <Grid item mt={1}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "black.400",
                        fontWeight: "medium",
                        textAlign: "center",
                      }}
                    >
                      Please Provide your full name
                    </Typography>
                  </Grid>
                  <Grid item my={4} textAlign="center">
                    <FormControl sx={{ width: { xs: "100%", sm: "45%" } }}>
                      <TextField
                        variant="outlined"
                        size="medium"
                        label="Your Name"
                        id="name"
                        //error={nameError} value={name}
                        //onChange={(e) => handleChange(e, setName, setNameError)}
                        // helperText={nameError ? "Name is required!" : ""}
                      />
                    </FormControl>
                  </Grid>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <Grid item>
                    <Typography
                      variant="h4"
                      color="black.800"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      Your Sectors
                    </Typography>
                  </Grid>
                  <Grid item mt={1}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "black.400",
                        fontWeight: "medium",
                        textAlign: "center",
                      }}
                    >
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
                        maxHeight: { xs: "45vh", md: "45vh", xl: "52vh" },
                        overflow: "auto",
                      }}
                    >
                      {SectorsData.map((item) => (
                        <>
                          <Grid
                            item
                            // color="#9AC5F4"
                            // border={2}
                            backgroundColor="#9AC5F4"
                            py={1}
                            px={{ xs: 1, md: 2 }}
                            borderRadius={{ xs: 2, md: 3 }}
                            fontWeight={500}
                            m={{ xs: "4px", sm: 1 }}
                            sx={{ cursor: "pointer" }}
                          >
                            {item.label}
                          </Grid>
                          {item.subcat1 && (
                            <>
                              {item.subcat1.map((cat1Item) => (
                                <>
                                  <Grid
                                    item
                                    // color="#99DBF5"
                                    // border={2}
                                    backgroundColor="#99DBF5"
                                    py={1}
                                    px={{ xs: 1, md: 2 }}
                                    borderRadius={{ xs: 2, md: 3 }}
                                    m={{ xs: "4px", sm: 1 }}
                                    sx={{ cursor: "pointer" }}
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
                                            // color="#A7ECEE"
                                            // border={2}
                                            backgroundColor="#A7ECEE"
                                            py={1}
                                            px={{ xs: 1, md: 2 }}
                                            borderRadius={{ xs: 2, md: 3 }}
                                            m={{ xs: "4px", sm: 1 }}
                                            sx={{ cursor: "pointer" }}
                                          >
                                            {cat2Item.label}
                                          </Grid>
                                          {cat2Item.subcat3 && (
                                            <>
                                              {cat2Item.subcat3.map(
                                                (cat3Item) => (
                                                  <Grid
                                                    item
                                                    // color="#FFEEBB"
                                                    // border={2}
                                                    backgroundColor="#FFEEBB"
                                                    py={1}
                                                    px={{ xs: 1, md: 2 }}
                                                    borderRadius={{
                                                      xs: 2,
                                                      md: 3,
                                                    }}
                                                    m={{ xs: "4px", sm: 1 }}
                                                    sx={{ cursor: "pointer" }}
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
                    <Typography
                      variant="h4"
                      color="black.800"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      Terms & Conditions
                    </Typography>
                  </Grid>
                  <Grid item mt={1}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "black.400",
                        fontWeight: "medium",
                        textAlign: "center",
                      }}
                    >
                      Do Your Agree to Our Terms & Conditions
                    </Typography>
                  </Grid>
                  <Grid item my={3}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={5} sm={4} md={3}>
                        <Paper elevation={2} sx={{ p: 3 }}>
                          No No No No No No No
                        </Paper>
                      </Grid>
                      <Grid item xs={5} sm={4} md={3}>
                        <Paper elevation={2} sx={{ p: 3 }}>
                          l Yes Yes Yes Yes Yes Yes Yes
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
                      color: "white.900",
                      fontSize: 15,
                      fontWeight: "bold",
                      textTransform: "none",
                      letterSpacing: 1,
                      border: 2,
                      borderColor: "black.600",
                      backgroundColor: "black.600",
                      borderRadius: 3,
                      "&:hover": {
                        color: "black.600",
                        fontWeight: "medium",
                      },
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
                        color: "white.900",
                        fontSize: 15,
                        fontWeight: "bold",
                        textTransform: "none",
                        letterSpacing: 1,
                        border: 2,
                        borderColor: "black.600",
                        backgroundColor: "black.600",
                        borderRadius: 3,
                        "&:hover": {
                          color: "black.600",
                          fontWeight: "medium",
                        },
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      disableRipple
                      onClick=""
                      sx={{
                        py: 1,
                        px: 3,
                        color: "white.900",
                        fontSize: 15,
                        fontWeight: "bold",
                        textTransform: "none",
                        letterSpacing: 1,
                        border: 2,
                        borderColor: "black.600",
                        backgroundColor: "black.600",
                        borderRadius: 3,
                        "&:hover": {
                          color: "black.600",
                          fontWeight: "medium",
                        },
                      }}
                    >
                      Finish
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      <Grid py={12}>
        <div>
          <form onSubmit={addPerson}>
            <input
              name="name"
              type="text"
              placeholder="enter name"
              value={createPerson.name}
              onChange={handleCreatePerFields}
            />
            <br />
            <input
              name="sectors"
              type="text"
              placeholder="enter sectors"
              value={createPerson.sectors}
              onChange={handleCreatePerFields}
            />
            <br />
            <input
              name="terms"
              type="checkbox"
              value={createPerson.terms}
              onChange={handleCreatePerFields}
            />
            <label>Agree to terms</label>
            <br />
            <button type="submit">add person</button>
          </form>
        </div>
      </Grid>
    </>
  );
};

export default AddPersonForm;
