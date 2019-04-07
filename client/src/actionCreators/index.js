import axios from 'axios';
import actionTypes from '../actionTypes';

const { LOGIN, LOGOUT } = actionTypes;

export const login = (username, restaurantsList) => ({ type: LOGIN, username, restaurantsList });
export const logout = () => ({ type: LOGOUT });

export const updateProfile = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/profile');
    const { data } = response;
    const { user } = data;
    const { name, restaurantsList } = user;
    dispatch(login(name, restaurantsList));
  } catch (err) {
    dispatch(logout());
    console.log(err.message); // eslint-disable-line no-console
  }
};
