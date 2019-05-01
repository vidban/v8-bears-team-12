import React from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { removePal } from './actionCreators';

const styles = {
  title: {
    padding: '8px',
  },
};

function PalList({ pals, dispatchRemovePal, classes }) {
  const { history } = useReactRouter();
  function handleChat(palId, palName) {
    history.push(`/pal-chat/${palId}/${palName}`);
  }

  function onRemove(palId) {
    dispatchRemovePal(palId);
  }

  return (
    <div className="pal-container">
      <Typography variant="h4" className={classes.title}>
        Pal List
      </Typography>
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
            <button type="button" onClick={() => handleChat(pal._id, pal.name)}>
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
          <div>
            <button type="button" onClick={() => onRemove(pal._id)}>
              X
            </button>
          </div>
        </div>
      ))}
      {!pals.length && (
        <div>
          You currently have no pals. Add some from the{' '}
          <Link to="/home">Home</Link> Tab.
        </div>
      )}
    </div>
  );
}

PalList.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
  dispatchRemovePal: PropTypes.func,
  classes: PropTypes.shape({}),
};

PalList.defaultProps = {
  pals: [],
  dispatchRemovePal: () => {},
  classes: {},
};

const mapStateToProps = ({ profile }) => ({
  pals: profile.pals,
});

const mapDispatchToProps = {
  dispatchRemovePal: removePal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PalList));
