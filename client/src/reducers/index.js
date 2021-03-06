import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import profile from './profile';
import snackbar from './snackbar';
import chat from './chat';
import dashboard from './dashboard';
import router from './router';
import restaurantpicker from './restaurantpicker';
import app from './app';

const reducer = combineReducers({
  app,
  snackbar,
  profile,
  form: formReducer,
  chat,
  dashboard,
  router,
  restaurantpicker
});

export default reducer;
