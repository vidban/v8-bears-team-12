import React from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';
import { connect } from 'react-redux';

function PalList({ pals }) {
  const { history } = useReactRouter();
  function handleChat(palId) {
    history.push(`/pal-chat/${palId}`);
  }

  return (
    <div className="pal-container">
      <h1>Pal List</h1>
      <div className="pal-cards">
        {pals.map(pal => (
          <div key={pal._id} className="pal-card">
            <div className="pal-card-image">
              <img
                src="https://via.placeholder.com/100"
                style={{
                  minwidth: '100px',
                  minheight: '100px',
                  border: '1px solid gray',
                }}
                alt="user"
              />
              <button type="button" onClick={() => handleChat(pal._id)}>
                Chat
              </button>
            </div>
            <div className="pal-card-info">
              <ul style={{ listStyleType: 'none' }}>
                <li>
                  <span>UserName: </span>
                  {pal.name}
                </li>
                <li>
                  <span>Interests: </span>
                  {pal.interests && pal.interests.join(', ')}
                </li>
                <li>
                  <span>Diet Restrictions: </span>
                  {pal.dietRestrictions && pal.dietRestrictions}
                </li>
                <li>
                  <span>Restaurants List: </span>
                  {pal.restaurantsList.map(e => e.name).join(', ')}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

PalList.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
};

PalList.defaultProps = {
  pals: [],
};

const mapStateToProps = ({ profile }) => ({
  pals: profile.pals,
});

export default connect(mapStateToProps)(PalList);
