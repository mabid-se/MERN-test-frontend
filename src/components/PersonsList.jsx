import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PersonsList = () => {
  const columns = [
    "Name",
    "Sectors",
    "Terms",
    "Edit Employee",
    "Delete Employee",
  ];

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
      const res = await axios.get(`http://localhost:8080/persons`);
      //set the state
      setPersons(res.data.persons);
    } catch (error) {
      console.error("Error fetching persons: ", error);
    }
  };

  // delete specific person
  const deletePerson = async (_id) => {
    //  send request to delete person
    const res = await axios.delete(`http://localhost:8080/persons/${_id}`);

    // update the state
    const newPersons = [...persons].filter((person) => person._id !== _id);
    setPersons(newPersons);
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
                            {person.terms && <>agree</>}
                            {!person.terms && <>disagree</>}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button>
                            <NavLink to="/update" state={{ person: person }}>
                              Update
                            </NavLink>
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => deletePerson(person._id)}>
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
    </>
  );
};

export default PersonsList;
