import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { ArrowForward, Check, Close } from "@mui/icons-material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PersonsList = () => {
  const columns = ["Emp. Name", "Sectors", "Terms", "Edit Emp.", "Delete Emp."];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [persons, setPersons] = useState([]);

  const getPersons = async () => {
    try {
      //fetching the persons
      const res = await axios.get(
        `https://mern-test-backend-production-3092.up.railway.app/persons`
      );

      //set the state
      setPersons(res.data.persons);
    } catch (error) {
      console.error("Error fetching persons: ", error);
    }
  };

  // handle toast show hide state
  const [toastOpen, setToastOpen] = useState(false);

  // delete specific person
  const deletePerson = async (_id) => {
    try {
      //  send request to delete person
      const res = await axios.delete(
        `https://mern-test-backend-production-3092.up.railway.app/persons/${_id}`
      );

      setToastOpen(true); // update the state
      const newPersons = [...persons].filter((person) => person._id !== _id);
      setPersons(newPersons);
    } catch (error) {
      console.error("error while deleting: ", error);
    }
  };

  useEffect(() => {
    getPersons();
  }, []);

  return (
    <>
      <Box sx={{ mt: 10, py: 4 }}>
        <Container>
          <Paper>
            <TableContainer
              sx={{ maxHeight: { xs: "70vh", lg: "65vh", xl: "70vh" } }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell key={index}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          color="#27374D"
                        >
                          {column}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {persons
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((person) => (
                      <StyledTableRow>
                        <TableCell>
                          <Typography
                            variant="body1"
                            textTransform="capitalize"
                            color="#526D82"
                          >
                            {person._id} {person.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {person.sectors.map((item) => (
                            <>
                              <Typography
                                variant="body1"
                                textTransform="capitalize"
                                color="#526D82"
                              >
                                {item}
                              </Typography>
                            </>
                          ))}
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            textTransform="capitalize"
                            color="#526D82"
                          >
                            {person.terms && (
                              <>
                                <Check
                                  sx={{ color: "#21C676", fontSize: "30px" }}
                                />
                              </>
                            )}
                            {!person.terms && (
                              <>
                                <Close
                                  sx={{ color: "#C62221", fontSize: "30px" }}
                                />
                              </>
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <NavLink to="/update" state={{ person: person }}>
                            <Button
                              disableRipple
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
                              Update
                            </Button>
                          </NavLink>
                        </TableCell>
                        <TableCell>
                          <Button
                            disableRipple
                            sx={{
                              py: 1,
                              px: 3,
                              color: "#ED5E68",
                              fontSize: 15,
                              fontWeight: 700,
                              textTransform: "none",
                              letterSpacing: 1,
                              border: 2,
                              borderRadius: 3,
                              "&:hover": {
                                color: "#ffffff",
                                borderColor: "#ED5E68",
                                backgroundColor: "#ED5E68",
                              },
                            }}
                            onClick={() => deletePerson(person._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 15, 20]}
              component="div"
              count={persons.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
      <Snackbar
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        autoHideDuration={1500}
      >
        <Alert
          severity="warning"
          onClose={() => setToastOpen(false)}
          sx={{ width: "100%" }}
        >
          Employee deleted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PersonsList;
