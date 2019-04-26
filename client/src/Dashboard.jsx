/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import DiningMateList from './DiningMateList';

function Dashboard({ searchCity, searchState }) {
  const [diningMates, setDiningMates] = useState([]);

  useEffect(() => {
    const fetchDiningMates = async () => {
      const res = await axios.get('/api/dining-mates');
      setDiningMates(res.data.diningMatches);
    };
    if (searchCity) {
      fetchDiningMates();
    }
  }, [searchCity]);

  return (
    <div className="dashboard-tab">
      <div className="search-area-info">
        <h4 style={{ color: 'rgb(19, 73, 134)' }}>
          Search Area:
          <span style={{ color: 'black', borderBottom: '2px solid rgb(19, 73, 134) ' }}>
            {searchCity}, {searchState}
          </span>
          <Link to="/set-search-area">
            <Button style={{ border: '1px solid grey' }}>Change</Button>
          </Link>
        </h4>
      </div>
      <DiningMateList diningMates={diningMates} />
    </div>
  );
}

Dashboard.propTypes = {
  searchCity: PropTypes.string,
  searchState: PropTypes.string,
  searchLocation: PropTypes.shape({
    type: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }),
};

Dashboard.defaultProps = {
  searchCity: '',
  searchState: '',
  searchLocation: { type: '', coordinates: [] },
};

const mapStateToProps = (state) => ({
  name: state.profile.name,
  searchCity: state.profile.searchCity,
  searchState: state.profile.searchState,
  searchLocation: state.profile.searchLocation,
});

export default connect(mapStateToProps)(Dashboard);
