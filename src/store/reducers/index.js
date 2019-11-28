import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import {couponsReducer} from './couponsReducer';

export default combineReducers({
    user: userReducer,
    coupon: couponsReducer
});