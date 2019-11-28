import{
    FETCH_STORES_START,
    FETCH_STORES_SUCCESS,
    FETCH_STORES_FAILED,
    SEARCH_STORES_START,
    SEARCH_STORES_SUCCESS,
    SEARCH_STORES_FAILED,
    FETCH_STORES_BY_LOCATION_START,
    FETCH_STORES_BY_LOCATION_SUCCESS,
    FETCH_STORES_BY_LOCATION_FAILED,
    FETCH_COUPON_DETAIL_START,
    FETCH_MY_COUPON_DETAIL_SUCCESS,
    FETCH_COUPON_DETAIL_SUCCESS,
    FETCH_COUPON_DETAIL_FAILED,
    ADD_COUPON_SUCCESS,
    ADD_COUPON_START,
    ADD_COUPON_FAILED,
    FETCH_MYCOUPONS_START,
    FETCH_MYCOUPONS_SUCCESS,
    FETCH_MYCOUPONS_FAILED,
    SCAN_QR,
    SCAN_QR_SUCCESS,
    SCAN_QR_FAILED,
    PAY_NOW_START,
    PAY_NOW_SUCCESS,
    PAY_NOW_FAILED,
    CHECK_COUPON_START,
    CHECK_COUPON_SUCCESS,
    CHECK_COUPON_FAILED,
    RESETPAGE,
    DELETE_COUPON_START,
    DELETE_COUPON_SUCCESS,
    DELETE_COUPON_FAILED
    } from '../ActionTypes';
import API from '../../Components/API';

import {logout} from '../actions/user';

export const resetPage= (dispatch)=>{
    dispatch({
        type:RESETPAGE
    })
}
export const fetchStoresList = (page,dispatch) => {
    console.log("j",page)
    dispatch({
        type: FETCH_STORES_START
      });
      API.fetchStoreList(page)
      .then((res) =>res.json())
      .then(jsonRes => {
          console.log("fetchStoreList response",jsonRes);
          if(jsonRes.status){
            //   console.log(jsonRes.stores)
              dispatch({
                  type: FETCH_STORES_SUCCESS,
                  page:page,
                  payload: jsonRes.stores
              })
          }else{
              dispatch({
                  type: FETCH_STORES_FAILED,
                  payload: jsonRes.error
              })
          }
      })     
}
export const fetchMyCoupons = (dispatch, navigation) => {
    dispatch({
        type: FETCH_MYCOUPONS_START
      });
      API.fetchMyCouponsList()
      .then((res) =>res.json())
      .then(jsonRes => {
          console.log(jsonRes);
          if(jsonRes.status){
              dispatch({
                  type: FETCH_MYCOUPONS_SUCCESS,
                  payload: jsonRes.coupons
              })
          }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
              dispatch({
                  type: FETCH_MYCOUPONS_FAILED,
                  payload: jsonRes.error
              })
              alert(jsonRes.error)
          }
      })     
}
export const searchStoresList = (text,dispatch) => {
    dispatch({
        type: SEARCH_STORES_START
      });
      API.searchStoreList(text)
      .then((res) =>res.json())
      .then(jsonRes => {
          console.log(jsonRes)
          if(jsonRes.status){
              dispatch({
                  type: SEARCH_STORES_SUCCESS,
                  payload: jsonRes.stores
              })
          }else{
              dispatch({
                  type: SEARCH_STORES_FAILED,
                  payload: jsonRes.error
              })
          }
      })     
}

export const storeByLocation = (lat, lng, text, dispatch) => {
    dispatch({
        type: FETCH_STORES_BY_LOCATION_START
      });
      API.storeByLocation(lat, lng, text)
      .then((res) =>res.json())
      .then(jsonRes => {
          console.log(jsonRes)
          if(jsonRes.status){
              dispatch({
                  type: FETCH_STORES_BY_LOCATION_SUCCESS,
                  payload: jsonRes.stores
              })
          }else{
              dispatch({
                  type: FETCH_STORES_BY_LOCATION_FAILED,
                  payload: jsonRes.error
              })
          }
      })     
}

export const fetchCouponDetail = (storeId, couponId, dispatch, navigation) => {
    dispatch({
        type: FETCH_COUPON_DETAIL_START
      });
      API.fetchCouponDetail(storeId)
      .then((res) =>res.json())
      .then(jsonRes => {
         console.log("coupon details",jsonRes)
          if(jsonRes.status){
             
              dispatch({
                  type: FETCH_COUPON_DETAIL_SUCCESS,
                  payload: jsonRes
              })
              navigation.navigate('CouponDetail',{ couponId: couponId})
          }else{
              dispatch({
                  type: FETCH_COUPON_DETAIL_FAILED,
                  payload: jsonRes.error
              })
          }
      })     
}

export const fetchMyCouponDetail = (couponId, dispatch, navigation)=>{
    dispatch({
        type: FETCH_COUPON_DETAIL_START
      });
    API.fetchMyCouponDetail(couponId)
    .then((res) => res.json())
    .then(jsonRes => {
        if(jsonRes.status){
            dispatch({
                type: FETCH_MY_COUPON_DETAIL_SUCCESS,
                payload: jsonRes
            })
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: FETCH_COUPON_DETAIL_FAILED,
                payload: jsonRes.error
            })
            alert(jsonRes.error)
        }
    })
}

export const addCouponToCart = (coupon_id, dispatch, navigation)=>{
    dispatch({
        type: ADD_COUPON_START
      });
    API.addCouponToCart(coupon_id)
    .then((res) => res.json())
    .then(jsonRes =>{
        if(jsonRes.status){
            fetchMyCoupons(dispatch, navigation)
            dispatch({
                type: ADD_COUPON_SUCCESS
              });
            alert(jsonRes.message)
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: ADD_COUPON_FAILED
              });
              alert(jsonRes.error)
        }
    })
}

export const deleteCouponFromCart = (coupon_id, dispatch, navigation)=>{
    dispatch({
        type: DELETE_COUPON_START
      });
    API.deleteCouponFromCart(coupon_id)
    .then((res) => res.json())
    .then(jsonRes =>{
        if(jsonRes.status){
            fetchMyCoupons(dispatch, navigation)
            dispatch({
                type: DELETE_COUPON_SUCCESS
              });
            alert(jsonRes.message)
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: DELETE_COUPON_FAILED
              });
              alert(jsonRes.error)
        }
    })
}

export const scanQRCode = (code, dispatch, navigation) =>{
    dispatch({
        type: SCAN_QR
      });
    API.scanQRCode(code)
    .then((res) => res.json())
    .then(jsonRes =>{
        console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: SCAN_QR_SUCCESS,
                payload: jsonRes.detail
              });
              navigation.navigate('PaymentTo')
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: SCAN_QR_FAILED
              });
              alert(jsonRes.error)
        }
    })
}
export const checkCoupon = (code, amount, dispatch, navigation) =>{
    dispatch({
        type: CHECK_COUPON_START
      });
    API.checkCoupon(code, amount)
    .then((res) => res.json())
    .then(jsonRes =>{
        console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: CHECK_COUPON_SUCCESS,
                payload: jsonRes.detail
              });
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: CHECK_COUPON_FAILED
              });
              alert(jsonRes.error)
        }
    })
}

export const sendFund = (amount, id, coupon_id, dispatch, navigation) =>{
    dispatch({
        type: PAY_NOW_START
      });
      console.log(amount, id)
    API.sendFund(amount, id, coupon_id)
    .then((res) => res.json())
    .then(jsonRes =>{
        console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: PAY_NOW_SUCCESS
              });
              navigation.navigate('SuccessFull', {receipt:jsonRes.response})
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: PAY_NOW_FAILED
              });
              alert(jsonRes.error)
        }
    })
}