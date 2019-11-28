import AsyncStorage from '@react-native-community/async-storage';
export const Stripekey_Test = 'ca_FnLsjzNObfBQiXv9Mm8F9frWegUlesnm';
export const Stripekey_final = 'ca_FnLszO9MIwbXiibkOtFhUSNzRCDO42eV';
export const live_apiKey = 'pk_live_H4M2hKBY8UNJlSvL85FddRfV00uCgORSo4';
export const dev_apiKey = 'pk_test_h1vnLBcAkZSpDs7t6wBsYIoX00kJb0xfqU';
 let baseURL = 'http://3.130.153.144/api/';


export default class API {
    static baseURL = baseURL;

    static request(url, method = 'GET', body = null) {
        console.log("baseURL + url",baseURL + url)
        return AsyncStorage.getItem('accessToken').then((data) => {
            let access_token = data;
            return fetch(baseURL + url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (access_token ? access_token : null)
                },
                body: body === null ? null : JSON.stringify(body)
            });
        });
    }

    static login(country_code, phone_number) {
        return this.request('generate-otp', 'POST', {
                phone: phone_number,
                country_code: country_code,
                signup_by:'mobile',
                
        });
    }
    static reSendOTP(country_code, phone_number){
        return this.request('generate-otp', 'POST',{
                phone: phone_number,
                country_code: country_code,
                signup_by:'mobile'
        });
    }

    static verifyOTP(code, country_code, phone_number, userType) {
        console.log(code, phone_number)
        return this.request('confirm-verification-code', 'POST', {
                verification_code: code,
                phone: phone_number,
                country_code:country_code,
                is_business_account: userType
        });
    }
    
    static registerProfile(first_name, last_name, email, userType){
        return this.request('basic-info', 'POST', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                // is_business_account: userType,
        });
    }
    static registerBusinessProfile(business_name, business_id, business_address,business_phone, business_email, city, zipcode, website, userType, business_working_start_day, business_working_end_day, business_working_start_time, business_working_end_time, image, first_name, last_name, email){
        console.log(website)
        return this.request('merchant-basic-info', 'POST', {
                business_name: business_name,
                business_address: business_address,
                business_phone: business_phone,
                business_email: business_email,
                city: city,
                zipcode: zipcode,
                website: website,
                business_ein:business_id,
                business_working_start_day: business_working_start_day,
                business_working_end_day: business_working_end_day,
                business_working_start_time: business_working_start_time,
                business_working_end_time: business_working_end_time,
                image:image,
                first_name: first_name,
                last_name: last_name,
                email: email,
                // is_business_account: userType,
        });
    }
    static updateProfile(first_name, last_name, email, address, city, zipcode, image){
        return this.request('upload-image', 'POST', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                address: address,
                city: city,
                zipcode: zipcode,
                image:image
        });
    }

    static fetchStoreList(page){
        return this.request(`stores?page=${page}`, 'GET')
    }

    static searchStoreList(text){
        return this.request(`search-stores`, 'POST', {
            search:text
        })
    }

    static storeByLocation(lat, lng, text){
        console.log('lat',lat, 'lng',lng, `search=${text}`)
        return this.request(`stores`, 'POST', {
            lat:lat,
            long:lng,
            search:text
        })
    }
   static fetchCouponDetail(storeId){
    return this.request(`get-copuons/${storeId}`, 'GET')
   }
   static fetchMyCouponDetail(couponId){
       return this.request(`coupon-detail/${couponId}`, 'GET')
   }

   static addCouponToCart(couponId){
       return this.request('add-coupon-cart', 'POST',{
           coupon_id:couponId
       })
   }
   static deleteCouponFromCart(couponId){
    return this.request('delete-coupon-cart', 'POST',{
        coupon_id:couponId
    })
}
static loginStripe(){
    return this.request('stripe-login', 'POST', null)
}

   static fetchMyCouponsList(){
       return this.request('my-coupons', 'GET')
   }
   static saveCardToken(token, card_id){
       console.log('Card detail', token, ' ', card_id)
       return this.request('save-card-token', 'POST', {
           token: token,
           card_id: card_id
       })
   }
   static scanQRCode(code){
       return this.request('scan-coupon', 'POST', {
           qrcode: code
       })
   }

   static checkCoupon(code, amount){
       console.log(' code ', code, 'amount' , amount)
    return this.request('check-coupon', 'POST', {
        qrcode: code,
        purchase_amount: amount
    })
}
   
   static sendFund( amount, customer_id, coupon_id ){
       return this.request('send-fund', 'POST', {
           customer_id: customer_id,
           amount: amount,
           coupon_id: coupon_id
       })
   }
   static getTransections(){
       return this.request('transactions', 'GET')
   }
    static getCharities(){
        return this.request('charities', 'POST')
    }
    static searchCharities(key){
        return this.request('charity-search', 'POST',{
            key:key
        })
    }
    static paymentDetail(amount, type){
        return this.request('payment-detail', 'POST',{
            amount:amount,
            type: type
        })
    }
    static cashOutBalance( amount, ){
        return this.request('cashout', 'POST', null)
    }
    static getTransectionList(){
        return this.request('transactions', 'GET')
    }
    static getCustomerTransections(){
       return this.request('transactions/customer', 'GET')
    }

    static donate(amt, ein, name){
        return this.request('donate', 'POST', {
            amount:amt,
            EIN: ein,
            charity_name: name
        })
    }

    static StripConnect(Body){
        return this.request('create-user-express', 'POST', Body)
    }
   
}

