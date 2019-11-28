import * as actionTypes from '../ActionTypes';

const initialState ={
    phone_number: "",
    country_code:"+1",
    userType: 1,
    uuid: null,
    first_name: '',
    last_name: '',
    email_address: null,
    profile_image: null,
    address:null,
    loading:false,
    stripe_id:null,
    term_Condition: false,
    business_name:null,
    business_address:null,
    city: null,
    zipcode: null,
    business_phone:null,
    business_email: null,
    website:null,
    business_ein:null,
    business_working_start_day:'Monday',
    business_working_end_day:'Friday',
    business_working_start_time:null,
    business_working_end_time:null,
    charityList:[],
    transections:{},
    payment_Detail:null,
    errors: {}

}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TYPE_MOBILE: {
            return {
                ...state,
                phone_number: action.payload,
                errors: {}
            }
        }
        case actionTypes.CHOOSE_COUNTRY: {
            return {
                ...state,
                country_code: action.payload
            }
        }
        case actionTypes.LOGIN_START: {
            return {
                ...state,
                loading: true,
                errors: {}
            }
        }
        case actionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                errors: {}
            }
        }
        case actionTypes.LOGIN_ERROR: {
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        }
        case actionTypes.LOGIN_OTP: {
            return {
                ...state,
                loading: false,
                errors: {}
            }
        }
        case actionTypes.LOGIN_FAILED: {
            return {
                ...state,
                loading: false,
                errors: {
                    message: action.payload
                }
            }
        }
        case actionTypes.OTP_SUCCESS: {
            return {
                ...state,
                uuid: action.payload.id,
                phone_number: action.payload.phone,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email_address: action.payload.email,
                userType: action.payload.is_business_account,
                profile_image:action.payload.image,
                address:action.payload.address,
                stripe_id: action.payload.stripe_id,
                business_name: action.payload.business_name,
                business_address: action.payload.business_address,
                city: action.payload.city,
                zipcode: action.payload.zipcode,
                business_phone: action.payload.business_phone,
                business_email: action.payload.business_email,
                website: action.payload.website,
                business_ein: action.payload.business_ein,
                business_working_start_day: action.payload.business_working_start_day,
                business_working_end_day: action.payload.business_working_end_day,
                business_working_start_time: action.payload.business_working_start_time,
                business_working_end_time: action.payload.business_working_end_time,
                card_last4: action.payload.card_last4,
                loading: false
            }
        }
        case actionTypes.SELECT_USER_TYPE: {
            return {
                ...state,
                userType: action.payload,
            }
        }
        case actionTypes.TYPE_FIRST_NAME: {
            let errors = JSON.parse(JSON.stringify(state.errors));
            if(errors.first_name) {
                delete errors.first_name;
            }
            return {
                ...state,
                first_name: action.payload,
                errors: errors
            }
        }
        case actionTypes.TERM_CONDITION:{
            let errors = JSON.parse(JSON.stringify(state.errors));
            if(errors.term_condition) {
                delete errors.term_condition;
            }
            return {
                ...state,
                term_Condition:!state.term_Condition
            }
        }
        case actionTypes.TYPE_LAST_NAME: {
            let errors = JSON.parse(JSON.stringify(state.errors));
            if(errors.last_name) {
                delete errors.last_name;
            }
            return {
                ...state,
                last_name: action.payload,
                errors: errors
            }
        }
        case actionTypes.TYPE_EMAIL_ADDRESS: {
            let errors = JSON.parse(JSON.stringify(state.errors));
            if(errors.email_address) {
                delete errors.email_address;
            }
            return {
                ...state,
                email_address: action.payload,
                errors: errors
            }
        }
        //business Details
        case actionTypes.TYPE_BUSINESS_NAME: {
            let errors = JSON.parse(JSON.stringify(state.errors));
            if(errors.business_name) {
                delete errors.business_name;
            }
            return {
                ...state,
                business_name: action.payload,
                errors: errors
            }
        }
        case actionTypes.TYPE_BUSINESS_ADDRESS: {
            let errors = JSON.parse(JSON.stringify(state.errors));
            if(errors.business_address) {
                delete errors.business_address;
            }
            return {
                ...state,
                business_address: action.payload,
                errors: errors
            }
        }
        case actionTypes.TYPE_WEBSITE: {
            let errors = JSON.parse(JSON.stringify(state.errors));
            if(errors.website) {
                delete errors.website;
            }
            return {
                ...state,
                website: action.payload,
                errors: errors
            }
        }
        case actionTypes.SELECT_START_DAY: {
            return {
                ...state,
                business_working_start_day: action.payload,
            }
        }
        case actionTypes.SELECT_END_DAY: {
            return {
                ...state,
                business_working_end_day: action.payload,
            }
        }
        case actionTypes.SELECT_START_TIME: {
            return {
                ...state,
                business_working_start_time: action.payload,
            }
        }
        case actionTypes.SELECT_END_TIME: {
            return {
                ...state,
                business_working_end_time: action.payload,
            }
        } 
        case actionTypes.SELECT_PROFILE_IMAGE:{
            return {
                ...state,
                profile_image: action.payload
            }
        }
        case actionTypes.START_UPDATE_PROFILE:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.END_UPDATE_PROFILE:{
            return {
                ...state,
                uuid: action.payload.id,
                phone_number: action.payload.phone,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email_address: action.payload.email,
                userType: action.payload.is_business_account,
                profile_image:action.payload.image,
                address:action.payload.address,
                stripe_id: action.payload.stripe_id,
                business_name: action.payload.business_name,
                business_address: action.payload.business_address,
                city: action.payload.city,
                zipcode: action.payload.zipcode,
                business_phone: action.payload.business_phone,
                business_email: action.payload.business_email,
                website: action.payload.website,
                business_ein: action.payload.business_ein,
                business_working_start_day: action.payload.business_working_start_day,
                business_working_end_day: action.payload.business_working_end_day,
                business_working_start_time: action.payload.business_working_start_time,
                business_working_end_time: action.payload.business_working_end_time,
                loading: false,
                card_last4: action.payload.card_last4
            }
        }
        case actionTypes.ERROR_UPDATE_PROFILE: {
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        }
        case actionTypes.GET_CHARITIES_LIST:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.GET_CHARITIES_SUCCESS:{
            return {
                ...state,
                loading: false,
                charityList: action.payload
            }
        }
        case actionTypes.GET_CHARITIES_FAILED:{
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.DONATE_START:{
            return {
                ...state,
                loading: true,
            }
        }
        case actionTypes.DONATE_SUCCESS:{
            return {
                ...state,
                loading: false,
            }
        }
        case actionTypes.DONATE_FAILED:{
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.CASH_OUT_START:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.CASH_OUT_SUCCESS:{
            return {
                ...state,
                loading: false,
            }
        }
        case actionTypes.CASH_OUT_FAILED:{
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.TRANSECTION_LIST_START:{
            return {
                ...state,
                loading: true,
            }
        }
        case actionTypes.TRANSECTION_LIST_SUCCESS:{
            return {
                ...state,
                loading: false,
                transections: action.payload
            }
        }
        case actionTypes.TRANSECTION_LIST_FAILED:{
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.GET_PAYMENT_DETAIL:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.GET_PAYMENT_DETAIL_SUCCESS:{
            return {
                ...state,
                loading: false,
                payment_Detail: action.payload
            }
        }
        case actionTypes.GET_PAYMENT_DETAIL_FAILED:{
            return {
                ...state,
                payment_Detail:null,
                loading: false
            }
        }
        case actionTypes.SAVE_STRIPE_CODE:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.SAVE_STRIPE_CODE_SUCCESS:{
            return {
                ...state,
                loading: false,
               
            }
        }
        case actionTypes.SAVE_STRIPE_CODE_FAILED:{
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.LOGIN_STRIPE_START:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.LOGIN_STRIPE_SUCCESS:{
            return {
                ...state,
                loading: false,
               
            }
        }
        case actionTypes.LOGIN_STRIPE_FAILED:{
            return {
                ...state,
                loading: false
            }
        }

        case actionTypes.USER_LOGOUT:{
            return {
                ...state,
                phone_number: "",
                country_code:"+1",
                userType: 1,
                uuid: null,
                first_name: null,
                last_name: null,
                email_address: null,
                profile_image: null,
                address:null,
                stripe_id: null,
                loading:false,
                term_Condition: false,
                business_name:null,
                business_address:null,
                business_working_start_day:'Monday',
                business_working_end_day:'Monday',
                business_working_start_time:null,
                business_working_end_time:null,
                card_last4:'',
                errors: {}
            }
        }



        default:
            return state
    }
}