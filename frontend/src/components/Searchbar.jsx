import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

const Searchbar = ({ onSearch, onSearchResults }) => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const [search, setSearch] = useState({
    trainingName: "",
    trainingArea: "",
    trainingCategory: "",
    trainingInstitution: "",
  });

  const [options, setOptions] = useState({
    trainingNames: [],
    trainingAreas: [],
    trainingCategories: [],
    trainingInstitutions: [],
  });

  useEffect(() => {
    fetchOptionsFromDatabase();
  }, []);

  const fetchOptionsFromDatabase = () => {
    axios
      .get("http://localhost:5000/api/options")
      .then((response) => {
        const {
          trainingNames,
          trainingAreas,
          trainingCategories,
          trainingInstitutions,
        } = response.data;
        setOptions({
          trainingNames,
          trainingAreas,
          trainingCategories,
          trainingInstitutions,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };

  const performSearch = () => {
    axios
      .get("http://localhost:5000/api/viewdata", { params: search })
      .then((response) => {
        const searchResults = response.data;
        onSearchResults(searchResults);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    onSearch(search);
    performSearch();
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{backgroundColor:'indigo'}}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                type="text"
                placeholder="Training Name"
                name="trainingName"
                value={search.trainingName}
                onChange={handleInputChange}
              />
              <datalist id="nameOptions">
                {options.trainingNames.map((name, index) => (
                  <option key={index} value={name} />
                ))}
              </datalist>
            </Search>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                type="text"
                placeholder="Area"
                name="trainingArea"
                value={search.trainingArea}
                onChange={handleInputChange}
              />
              <datalist id="areaOptions">
                {options.trainingAreas.map((area, index) => (
                  <option key={index} value={area} />
                ))}
              </datalist>
            </Search>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                type="text"
                placeholder="Category"
                name="trainingCategory"
                value={search.trainingCategory}
                onChange={handleInputChange}
              />
              <datalist id="categoryOptions">
                {options.trainingCategories.map((category, index) => (
                  <option key={index} value={category} />
                ))}
              </datalist>
            </Search>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                type="text"
                placeholder="Institution"
                name="trainingInstitution"
                value={search.trainingInstitution}
                onChange={handleInputChange}
              />
              <datalist id="institutionOptions">
                {options.trainingInstitutions.map((institution, index) => (
                  <option key={index} value={institution} />
                ))}
              </datalist>
            </Search>
            <Button color="inherit" variant="outlined" onClick={handleSearch}>
              Search
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Searchbar;
