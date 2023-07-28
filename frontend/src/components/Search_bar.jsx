// Search_bar.jsx

import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Search_bar = ({ onSearch, onSearchResults }) => {
  const [search, setSearch] = useState({
    trainingName: '',
    trainingArea: '',
    trainingCategory: '',
    trainingInstitution: ''
  });
  const [options, setOptions] = useState({
    trainingNames: [],
    trainingAreas: [],
    trainingCategories: [],
    trainingInstitutions: []
  });

  useEffect(() => {
    fetchOptionsFromDatabase()
  }, []);

  const fetchOptionsFromDatabase = () => {
    axios
      .get('http://localhost:5000/api/options')
      .then((response) => {
        const { trainingNames, trainingAreas, trainingCategories, trainingInstitutions } = response.data;
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
    // Perform search based on the search object
    axios
      .get('http://localhost:5000/api/viewdata', { params: search })
      .then((response) => {
        const searchResults = response.data;
        onSearchResults(searchResults); // Pass the search results to the parent component
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    onSearch(search); // Pass the search parameters to the parent component
    performSearch();
  };

  return (
    <div>
      <div className="container-fluid mt-1">
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" data-bs-theme="dark">
          <div className="container-fluid gap-3">
            <input
              className="form-control me-2"
              list="nameOptions"
              id="exampleNameList"
              name="trainingName"
              placeholder="Name of Training"
              value={search.trainingName}
              onChange={handleInputChange}
            />
            <datalist id="nameOptions">
              <option value="All" />
              {options.trainingNames.map((name, index) => (
                <option key={index} value={name} />
              ))}
            </datalist>

            <input
              className="form-control me-2"
              list="areaOptions"
              id="exampleAreaList"
              name="trainingArea"
              placeholder="Area"
              value={search.trainingArea}
              onChange={handleInputChange}
            />
            <datalist id="areaOptions">
              <option value="ALL" />
              {options.trainingAreas.map((area, index) => (
                <option key={index} value={area} />
              ))}
            </datalist>

            <input
              className="form-control me-2"
              list="categoryOptions"
              id="exampleCategoryList"
              name="trainingCategory"
              placeholder="Category"
              value={search.trainingCategory}
              onChange={handleInputChange}
            />
            <datalist id="categoryOptions">
              <option value="ALL" />
              {options.trainingCategories.map((category, index) => (
                <option key={index} value={category} />
              ))}
            </datalist>

            <input
              className="form-control me-2"
              list="institutionOptions"
              id="exampleInstitutionList"
              name="trainingInstitution"
              placeholder="Institution"
              value={search.trainingInstitution}
              onChange={handleInputChange}
            />
            <datalist id="institutionOptions">
              <option value="ALL" />
              {options.trainingInstitutions.map((institution, index) => (
                <option key={index} value={institution} />
              ))}
            </datalist>

            <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Search_bar;
