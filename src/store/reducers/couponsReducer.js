import * as actionTypes from '../ActionTypes';

const initialState ={
    couponsList:[],
    nearStore:[],
    myCouponList:[],
    couponDetail:{},
    myCouponDetail:{},
    scanCouponDetail:null,
    loading:false,
    CDLoader: false,
    page:1,
    errors: {}

}

export const couponsReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_STORES_START:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.RESETPAGE:{
            return {
                ...state,
                page:1
            }
        }
        case actionTypes.FETCH_STORES_SUCCESS:{
           if(action.page===1){
            if(state.page <= action.payload.last_page){
            return {
                ...state,
                loading: false,
                 page:state.page + 1,
                couponsList: action.payload.data,
            }
        }else{
            return {
                ...state,
                loading: false,
                 page:state.page,
                couponsList: action.payload.data,
            }
        }
           }else{
            if(state.page<= action.payload.last_page){
                return {
                    ...state,
                    loading: false,
                    page:state.page+1,
                    couponsList: state.couponsList.concat(action.payload.data),
                }
            }else{
                return {
                    ...state,
                    loading: false,
                    page:state.page,
                    couponsList: state.couponsList.concat(action.payload.data),
                }
            }
           }
            
        }
        case actionTypes.FETCH_STORES_FAILED:{
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        }
        case actionTypes.SEARCH_STORES_START:{
            return {
                ...state,
            }
        }
        case actionTypes.SEARCH_STORES_SUCCESS:{
            return {
                ...state,
                couponsList: action.payload,
            }
        }
        case actionTypes.SEARCH_STORES_FAILED:{
            return {
                ...state,
                errors: action.payload
            }
        }
        case actionTypes.FETCH_STORES_BY_LOCATION_START:{
            return {
                ...state,
            }
        }
        case actionTypes.FETCH_STORES_BY_LOCATION_SUCCESS:{
            return {
                ...state,
                nearStore: action.payload,
            }
        }
        case actionTypes.FETCH_STORES_BY_LOCATION_FAILED:{
            return {
                ...state,
                errors: action.payload
            }
        }
        case actionTypes.FETCH_COUPON_DETAIL_START:{
            return {
                ...state,
                CDLoader: true
            }
        }
        case actionTypes.FETCH_COUPON_DETAIL_SUCCESS:{
            return {
                ...state,
                CDLoader: false,
                couponDetail: action.payload,
            }
        }
        case actionTypes.FETCH_MY_COUPON_DETAIL_SUCCESS:{
            return {
                ...state,
                CDLoader: false,
                myCouponDetail: action.payload,
            }
        }
        case actionTypes.FETCH_COUPON_DETAIL_FAILED:{
            return {
                ...state,
                errors: action.payload
            }
        }
        case actionTypes.ADD_COUPON_START:{
            return {
                ...state,
                loading:true
            }
        }
        case actionTypes.ADD_COUPON_SUCCESS:{
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.ADD_COUPON_FAILED:{
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.FETCH_MYCOUPONS_START:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.FETCH_MYCOUPONS_SUCCESS:{
            return {
                ...state,
                myCouponList: action.payload,
                loading: false
            }
        }
        case actionTypes.FETCH_MYCOUPONS_FAILED:{
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        }
        case actionTypes.DELETE_COUPON_START:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.DELETE_COUPON_SUCCESS:{
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.DELETE_COUPON_FAILED:{
            return {
                ...state,
                loading: false,
            }
        }
        case actionTypes.SCAN_QR:{
            return {
                ...state,
                scanCouponDetail:null,
                loading: true
            }
        }
        case actionTypes.SCAN_QR_SUCCESS:{
            return {
                ...state,
                loading: false,
                scanCouponDetail: action.payload
            }
        }
        case actionTypes.SCAN_QR_FAILED:{
            return {
                ...state,
                loading: false,
                scanCouponDetail:null
            }
        }
        case actionTypes.CHECK_COUPON_START:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.CHECK_COUPON_SUCCESS:{
            return {
                ...state,
                loading: false,
                scanCouponDetail: action.payload
            }
        }
        case actionTypes.CHECK_COUPON_FAILED:{
            return {
                ...state,
                loading: false,
            }
        }



        case actionTypes.PAY_NOW_START:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.PAY_NOW_SUCCESS:{
            return{
                ...state,
                loading: false
            }
        }
        case actionTypes.PAY_NOW_FAILED:{
            return{
                ...state,
                loading: false
            }
        }
        
        default:
            return state
        
    }
}