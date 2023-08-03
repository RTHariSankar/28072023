import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/searchbar.scss'

const Searchbar = ({ onSearch, onSearchResults }) => {
  const [search, setSearch] = useState({
    trainingName: '',
    trainingArea: '',
    trainingCategory: '',
    trainingInstitution: '',
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
    axios
      .get('http://localhost:5000/api/viewdata', { params: search })
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
    <div className='searchbar'>
      <input
        className='items'
        type="text"
        placeholder="Name of Training"
        name="trainingName"
        value={search.trainingName}
        onChange={handleInputChange}
      />
      <datalist id="nameOptions">
        {options.trainingNames.map((name, index) => (
          <option key={index} value={name} />
        ))}
      </datalist>

      <input
        className='items'
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

      <input
        className='items'
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

      <input
        className='items'
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

      <button className='searchButton' type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Searchbar;