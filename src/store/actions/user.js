import{
TYPE_MOBILE,
CHOOSE_COUNTRY,
LOGIN_START,
LOGIN_ERROR,
LOGIN_OTP,
OTP_SUCCESS,
TYPE_FIRST_NAME,
TYPE_LAST_NAME,
TYPE_EMAIL_ADDRESS,
SELECT_USER_TYPE,
SELECT_PROFILE_IMAGE,
ERROR_UPDATE_PROFILE,
START_UPDATE_PROFILE,
END_UPDATE_PROFILE,
TERM_CONDITION,
USER_LOGOUT,
TYPE_BUSINESS_NAME,
TYPE_BUSINESS_ADDRESS,
TYPE_WEBSITE,
SELECT_START_DAY,
SELECT_END_DAY,
SELECT_START_TIME,
SELECT_END_TIME,
GET_CHARITIES_LIST,
GET_CHARITIES_SUCCESS,
GET_CHARITIES_FAILED,
CASH_OUT_START,
CASH_OUT_SUCCESS,
CASH_OUT_FAILED,
TRANSECTION_LIST_START,
TRANSECTION_LIST_SUCCESS,
TRANSECTION_LIST_FAILED,
DONATE_START,
DONATE_SUCCESS,
DONATE_FAILED,
GET_PAYMENT_DETAIL,
GET_PAYMENT_DETAIL_SUCCESS,
GET_PAYMENT_DETAIL_FAILED,
SAVE_STRIPE_CODE,
SAVE_STRIPE_CODE_SUCCESS,
SAVE_STRIPE_CODE_FAILED,
LOGIN_STRIPE_START,
LOGIN_STRIPE_SUCCESS,
LOGIN_STRIPE_FAILED
} from '../ActionTypes';
import API from '../../Components/API';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { addCouponToCart } from '../actions/coupons';

export const typeMobile = phone_number => {
    return {
        type: TYPE_MOBILE,
        payload: phone_number
    }
};
export const chooseCountry = country_code => {
    return {
        type: CHOOSE_COUNTRY,
        payload: country_code
    }
};
export const termCondition = () => {
    return {
        type: TERM_CONDITION,
    }
};
export const login = (country_code, phone_number, dispatch, navigate) =>{
    if(phone_number.length === 10){
        dispatch({
            type:LOGIN_START
        });
        API.login(country_code, phone_number)
        .then(res => res.json())
        .then(jsonRes => {
            console.log(jsonRes)
            if(jsonRes.success){
                dispatch({
                    type: LOGIN_OTP
                });
                navigate('Verification',{
                    phoneNumber: phone_number,
                    country_code: country_code
                });
            }else{
                dispatch({
                    type: LOGIN_ERROR,
                    payload:{
                        phone_number: [jsonRes.error]
                    }
                });
            }
        })
        .catch(err =>{
            dispatch({
                type: LOGIN_ERROR,
                payload: err
            });
        });
    }else{
        dispatch({
            type: LOGIN_ERROR,
            payload:{
                phone_number:['Kindly enter 10 digit phone number']
            }
        });
    }
};
export const verifyOTP = (code, country_code, phone_number, userType, dispatch, navigation) => {
    if (code.length === 6) {
        dispatch({
            type: LOGIN_START
        });
        try{
            API.verifyOTP(code, country_code, phone_number, userType)
            .then(res => res.json())
            .then(jsonRes => {
                 console.log('Response', JSON.stringify(jsonRes));
                if(jsonRes.status){ 
                    AsyncStorage.setItem('accessToken', jsonRes.access_token)
                    .then(() => {
                        dispatch({
                            type: OTP_SUCCESS,
                            payload: jsonRes.user
                        });
                        AsyncStorage.setItem('user', JSON.stringify(jsonRes.user))
                            .then(() =>{
                                
                                 if(jsonRes.user.is_business_account === 0){
                                    AsyncStorage.getItem('couponId').then((couponId) =>{
                                        if(couponId !== null){
                                            addCouponToCart(couponId, dispatch, navigation)
                                        }
                                        if(jsonRes.user.first_name === ""){
                                            navigation.navigate('Registration')
                                        }else{
                                        navigation.navigate('endUserTabNavigator');
                                        }
                                    })
                                }else{
                                    if(jsonRes.user.business_name === null){
                                        navigation.navigate('BRegistration')
                                    }else if(jsonRes.user.stripe_id === null){
                                        navigation.navigate('AddCard', {formPaymentTo: false});
                                    }else{
                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({ routeName: 'marchantTabNavigator' })],
                                          });
                                          navigation.dispatch(resetAction);
                                    }
                                }
                            })
                            .catch(err =>{
                                AsyncStorage.setItem('accessToken', null)
                                dispatch({
                                    type: LOGIN_ERROR,
                                    payload: err
                                });
                            })
                        })                    
                }else{
                    dispatch({
                        type: LOGIN_ERROR,
                        payload: {
                            otp: [jsonRes.error]
                        }
                    });
                }
            })
            .catch(err =>{
                dispatch({
                    type: LOGIN_ERROR,
                    payload: err
                });
            });
        }catch(error){
            dispatch({
                type: LOGIN_ERROR,
                payload: error
            });
        }
    } else {
        dispatch({
            type: LOGIN_ERROR,
            payload: {
                otp: ['Please enter the correct OTP']
            }
        });
    }
};
export const selectUserType = (userType, dispatch) => {
        dispatch({
            type: SELECT_USER_TYPE,
            payload: userType
        })
};
export const typeFirstName = first_name => {
    return {
        type: TYPE_FIRST_NAME,
        payload: first_name
    }
};
export const typeLastName = last_name => {
    return {
        type: TYPE_LAST_NAME,
        payload: last_name
    }
};
export const typeEmailAddress = email_address => {
    return {
        type: TYPE_EMAIL_ADDRESS,
        payload: email_address
    }
};

// For business
export const typeBusinessName = business_name => {
    return {
        type: TYPE_BUSINESS_NAME,
        payload: business_name
    }
};
export const typeBusinessAddress = business_address => {
    return {
        type: TYPE_BUSINESS_ADDRESS,
        payload: business_address
    }
};
export const typeWebsite = website => {
    return {
        type: TYPE_WEBSITE,
        payload: website
    }
};
export const selectStartDay = start_day => {
    return {
        type: SELECT_START_DAY,
        payload: start_day
    }
};
export const selectEndDay = end_day => {
    return {
        type: SELECT_END_DAY,
        payload: end_day
    }
};
export const selectStartTime = start_time => {
    return {
        type: SELECT_START_TIME,
        payload: start_time
    }
};
export const selectEndTime = end_time => {
    return {
        type: SELECT_END_TIME,
        payload: end_time
    }
};

export const selectProfileImage = profile_image =>{
    return{
        type: SELECT_PROFILE_IMAGE,
        payload:profile_image
    }
}

export const registerProfile = (first_name, last_name, email_address, userType, term_condition, dispatch, navigation) =>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    // console.log("243",first_name, last_name, email_address, userType)
    if(first_name && last_name && email_address && first_name.length > 0 && last_name.length > 0 && email_address.length > 0 && reg.test(email_address) && term_condition){
        dispatch({
            type: START_UPDATE_PROFILE
        });
        API.registerProfile(first_name, last_name, email_address, userType)
        .then((res) => res.json())
        .then(jsonRes =>{
            console.log(jsonRes)
            if(jsonRes.status){
                dispatch({
                    type: END_UPDATE_PROFILE,
                    payload: jsonRes.user
                })
                AsyncStorage.setItem('user', JSON.stringify(jsonRes.user))
                .then(() =>{
                    navigation.navigate('endUserTabNavigator')
                });
            }else{
                dispatch({
                    type: ERROR_UPDATE_PROFILE,
                    payload: jsonRes.error
                })
                alert(jsonRes.error)
            }
        })
        .catch(err =>{
            console.log(err);
        })

    }else{
        let errors = {}
        if(!first_name){
            errors['first_name'] = ['Kindly fill the first name']
        }else if(!last_name){
            errors['last_name'] = ['Kindly fill the last name']
        }else if(!email_address){
            errors['email_address'] = ['Kindly fill the email address']
        }else if(!reg.test(email_address)){
            errors['email_address'] = ['Kindly enter a valid email address.']
        }else if(!term_condition){
            errors['term_condition'] = ['Kindly accept Term & Conditions'] 
        }
        dispatch({
            type: ERROR_UPDATE_PROFILE,
            payload: errors
        });
    }
}

export const registerBusinessProfile = (business_name, business_address, website, userType,business_working_start_day, business_working_end_day, business_working_start_time, business_working_end_time, image, first_name, last_name, email, term_condition, dispatch, navigation) =>{

    if(business_name && business_address && business_name.length > 0 && business_address.length > 0 && term_condition ){
        dispatch({
            type: START_UPDATE_PROFILE
        });
        API.registerBusinessProfile(business_name,'', business_address,'','','','', website, userType, business_working_start_day, business_working_end_day, business_working_start_time, business_working_end_time, image, first_name, last_name, email)
        .then((res) => res.json())
        .then(jsonRes =>{
            console.log(jsonRes)
            if(jsonRes.status){
                dispatch({
                    type: END_UPDATE_PROFILE,
                    payload: jsonRes.user
                })
                AsyncStorage.setItem('user', JSON.stringify(jsonRes.user))
                .then(() =>{
                        // navigation.navigate('marchantTabNavigator')
                        navigation.navigate('AddCard', {formPaymentTo: false})
                });
            }else{
                dispatch({
                    type: ERROR_UPDATE_PROFILE,
                    payload: jsonRes.error
                })
                alert(jsonRes.error)
            }
        })
        .catch(err =>{
            console.log(err);
        })

    }else{
        let error = '';
        if(!business_name){
            error = 'Kindly fill the business name'
        }else if(!business_address){
            error = 'Kindly fill the business address';
        }else if(!term_condition){
            error = 'Kindly accept Term & Conditions' 
        }
        if(error !== ''){
            alert(error)
        }
        dispatch({
            type: ERROR_UPDATE_PROFILE,
            payload:''
        });
    }
}
export const updateBusinessProfile = (business_name, business_id, business_address,business_phone, business_email, city, zipcode, website, userType,business_working_start_day, business_working_end_day, business_working_start_time, business_working_end_time, image, first_name, last_name, email, dispatch, navigation) =>{

        dispatch({
            type: START_UPDATE_PROFILE
        });
        API.registerBusinessProfile(business_name, business_id, business_address,business_phone, business_email, city, zipcode, website, userType, business_working_start_day, business_working_end_day, business_working_start_time, business_working_end_time, image, first_name, last_name, email)
        .then((res) => res.json())
        .then(jsonRes =>{
            console.log(jsonRes)
            if(jsonRes.status){
                dispatch({
                    type: END_UPDATE_PROFILE,
                    payload: jsonRes.user
                })
                AsyncStorage.setItem('user', JSON.stringify(jsonRes.user))
                .then(() =>{
                        navigation.goBack()
                });
            }else{
                dispatch({
                    type: ERROR_UPDATE_PROFILE,
                    payload: jsonRes.error
                })
                alert(jsonRes.error)
            }
        })
        .catch(err =>{
            console.log(err);
        })
}
export const updateProfile = (first_name, last_name, email_address, address, city, zipcode, image, dispatch, navigation) =>{
    dispatch({
        type: START_UPDATE_PROFILE
    });
    API.updateProfile(first_name, last_name, email_address, address, city, zipcode, image)
    .then((res) => res.json())
    .then(jsonRes =>{
        console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: END_UPDATE_PROFILE,
                payload: jsonRes.user
            })
            AsyncStorage.setItem('user', JSON.stringify(jsonRes.user))
            .then(() =>{
                navigation.goBack()
                // navigation.navigate('endUserTabNavigator')
            });
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: ERROR_UPDATE_PROFILE,
                payload: jsonRes.error
            })
            alert(jsonRes.error)
        }
    })
    .catch(err =>{
        console.log(err);
    })
}
export const saveCardToken = (token, card_id, formPaymentTo, dispatch, navigation) =>{
    dispatch({
        type: START_UPDATE_PROFILE
    });
    API.saveCardToken(token, card_id)
    .then((res) => res.json())
    .then(jsonRes =>{
        console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: END_UPDATE_PROFILE,
                payload: jsonRes.user
            })
            AsyncStorage.setItem('user', JSON.stringify(jsonRes.user))
            .then(() =>{
                if(formPaymentTo){
                    navigation.goBack()
                }else{
                    navigation.navigate('marchantTabNavigator')
                }
            });
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: ERROR_UPDATE_PROFILE,
                payload: jsonRes.error
            })
            alert(jsonRes.error)
        }
    })
    .catch(err =>{
        console.log(err);
    })
}
export const getCharities = (dispatch, navigation) =>{
    dispatch({
        type: GET_CHARITIES_LIST
    });
    API.getCharities()
    .then((res) => res.json())
    .then(jsonRes =>{
        console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: GET_CHARITIES_SUCCESS,
                payload: jsonRes.response.data
            })
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: GET_CHARITIES_FAILED,
                payload: jsonRes.error
            })
            alert(jsonRes.error)
        }
    })
    .catch(err =>{
        console.log(err);
    })
}
export const searchCharities = (key, dispatch, navigation) =>{
    dispatch({
        type: GET_CHARITIES_LIST
    });
    API.searchCharities(key)
    .then((res) => res.json())
    .then(jsonRes =>{
        console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: GET_CHARITIES_SUCCESS,
                payload: jsonRes.response.data
            })
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: GET_CHARITIES_FAILED,
                payload: jsonRes.error
            })
            alert(jsonRes.error)
        }
    })
    .catch(err =>{
        console.log(err);
    })
}
export const cashOutBalance = ( dispatch, navigation) =>{
    dispatch({
        type: CASH_OUT_START
    });
    API.cashOutBalance()
    .then((res) => res.json())
    .then(jsonRes =>{
        // console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: CASH_OUT_SUCCESS,
            })
            alert(jsonRes.message)
            getCustomerTransections(dispatch, navigation)
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: CASH_OUT_FAILED,
                payload: jsonRes.error
            })
            alert(jsonRes.error)
        }
    })
    .catch(err =>{
        console.log(err);
    })
}

export const donate = (amt, ein, name, dispatch, navigation) =>{
    dispatch({
        type: DONATE_START
    });
    API.donate(amt, ein, name)
    .then((res) => res.json())
    .then(jsonRes =>{
        // console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: DONATE_SUCCESS,
            })
            // alert(jsonRes.message)
            getCustomerTransections(dispatch)
            navigation.navigate('SuccessFull', {receipt:jsonRes.response})
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: DONATE_FAILED,
                payload: jsonRes.error
            })
            alert(jsonRes.error)
        }
    })
    .catch(err =>{
        console.log(err);
    })
}

export const loginStripe = ( dispatch, navigation) =>{
    dispatch({
        type: LOGIN_STRIPE_START
    });
    API.loginStripe()
    .then((res) => res.json())
    .then(jsonRes =>{
         console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: LOGIN_STRIPE_SUCCESS,
            })
            navigation.navigate('WebViewScreen',{url: jsonRes.result.url})
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: LOGIN_STRIPE_FAILED,
            })
            alert(jsonRes.error)
        }
    })
    .catch(err =>{
        console.log(err);
    })
}


export const getCustomerTransections = (dispatch, navigation) =>{
    dispatch({
        type: TRANSECTION_LIST_START
    });
    API.getCustomerTransections()
    .then((res) => res.json())
    .then(jsonRes =>{
         console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: TRANSECTION_LIST_SUCCESS,
                payload: jsonRes
            })
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: TRANSECTION_LIST_FAILED,
                payload: jsonRes.error
            })
            alert(jsonRes.error)
        }
    })
    .catch(err =>{
        console.log(err);
    })
}

export const paymentDetail = (amount, type, dispatch, navigation) =>{
    dispatch({
        type: GET_PAYMENT_DETAIL
    });
    API.paymentDetail(amount, type)
    .then((res) => res.json())
    .then(jsonRes =>{
        console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: GET_PAYMENT_DETAIL_SUCCESS,
                payload: jsonRes.result
            })
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: GET_PAYMENT_DETAIL_FAILED,
                payload: jsonRes.error
            })
            alert(jsonRes.error)
        }
    })
    .catch(err =>{
        console.log(err);
    })
}

export const getTransectionList = (dispatch, navigation) =>{
    dispatch({
        type: TRANSECTION_LIST_START
    });
    API.getTransectionList()
    .then((res) => res.json())
    .then(jsonRes =>{
        console.log(jsonRes)
        if(jsonRes.status){
            dispatch({
                type: TRANSECTION_LIST_SUCCESS,
                payload: jsonRes
            })
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: TRANSECTION_LIST_FAILED,
                payload: jsonRes.error
            })
            alert(jsonRes.error)
        }
    })
    .catch(err =>{
        console.log(err);
    })
}


export const SaveStripeCode =(body,dispatch,navigation)=>{
    dispatch({
        type: SAVE_STRIPE_CODE
    });
    console.log("stripe body",body)
    API.StripConnect((body))
   
    .then((res) => res.json())
    .then(jsonRes =>{
        console.log("stripe code saved",jsonRes)
        if(jsonRes.status){
            dispatch({
                type: OTP_SUCCESS,
                payload: jsonRes.user
            });
            AsyncStorage.setItem('user', JSON.stringify(jsonRes.user)).then(()=>{
                setTimeout(() => {
                    navigation.goBack()
                }, 800);
            })
        }else{
            if(jsonRes.is_block){
                logout(dispatch, navigation)
            }
            dispatch({
                type: SAVE_STRIPE_CODE_FAILED,
            })
            navigation.goBack()
            alert(jsonRes.message)
        }
    })
}
export const logout = async(dispatch, navigation) =>{

    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'drawerNavigation' })],
      });
     await AsyncStorage.clear();
      dispatch({
        type: USER_LOGOUT
    });
    navigation.dispatch(resetAction);
}

