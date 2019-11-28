import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    Image,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { fetchMyCouponDetail} from '../../store/actions/coupons';
import { 
    LightText,
    BoldText
} from '../../Components/styledTexts';
import Header from '../../Components/Header';
import colors from '../../styles/colors';
import { Button} from '../../Components/button';

class MyCouponDetail extends Component {
    constructor(){
        super();
        this.state = {
        };
    }
    componentDidMount(){
        this.props.fetchMyCouponDetail(this.props.navigation.state.params.couponId, this.props.navigation)
    }

    getNow(){
        AsyncStorage.getItem('accessToken').then((accessToken) =>{
            if(accessToken !== null){

            }else{
                this.props.navigation.navigate('Login')
            }
        })
    }

    render(){
        return (
            <View style = {{ flex: 1}}>
                {/* <SafeAreaView style={{ flex: 1}}> */}
                    <View style={{flex: .1}}>
                        <Header
                        leftNavigation={this.props.navigation}
                        color={colors.appColor}
                        value={'EcoCheck Details'}
                        />
                    </View>
                    <ScrollView style={{ flex: 1}}>
                        <View style={{ flex:1, alignItems:'center', flexDirection:'row', minHeight:120}}>
                            <View style={{width:'40%'}}>
                                <Image
                                    source={{uri: (this.props.couponDetail.coupons) ? this.props.couponDetail.coupons.store_image : ""}}
                                    style={{ height: 100, width: 100, borderRadius: 50, marginTop:10, marginLeft:5}}
                                    resizeMode={'cover'}
                                />
                            </View>
                            <View style={{width:'60%',}}>
                                    <LightText style={{ color: colors.black, fontSize: 18, fontWeight:'bold'}} >{this.props.couponDetail.coupons ? this.props.couponDetail.coupons.store_description : null}</LightText>
                            </View>
                        </View>

                        <View style={{ flex:1, marginTop: 10}}>
                            <Image
                                source={{ uri: (this.props.couponDetail.coupons) ? (this.props.couponDetail.coupons.image) : ""}}
                                style={{ flex:1, height: 250, backgroundColor: colors.lightGray}}
                                resizeMode={'cover'}
                            />
                        </View>

                        <View style={{ flex:1, padding:10, backgroundColor: colors.appColor}}>
                            <LightText style={{ color: colors.white, textAlign:'center', fontSize:16}}>{(this.props.couponDetail.coupons) ? (this.props.couponDetail.coupons.coupon_title):null}</LightText>
                            <View style={{ backgroundColor: colors.white, borderRadius: 10, padding: 2, marginTop: 10,}}>
                                <View style={{ backgroundColor: colors.white, flexDirection:'row', borderRadius: 10, borderColor: colors.appColor, borderWidth: 2}}>
                                <View style={{ flex: 1,padding: 10, alignItems:'center', justifyContent:'center',}}>
                                    {this.props.couponDetail.coupons &&<QRCode
                                        value={this.props.couponDetail.coupons ? this.props.couponDetail.coupons.qrcode : ''}
                                        backgroundColor={'#fff'}
                                        color={colors.charcoal}
                                        size={150}
                                    />}
                                {/* <QRCode
                                    value={this.props.couponDetail.coupons ? this.props.couponDetail.coupons.qrcode : ''}
                                    size={150}
                                    bgColor={colors.charcoal}
                                    fgColor='#fff'/> */}
                                </View>
                            </View>
                             </View>
                        </View>
                        
                        <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 10}}>
                            <BoldText style={{ fontWeight: '400'}}> Product overview</BoldText>
                            <View style={{ marginVertical: 10, height: 1, backgroundColor: colors.lightGray}}/>
                            <LightText style={{ color: colors.gray}}>{(this.props.couponDetail.coupons) ? (this.props.couponDetail.coupons.overview) : null}</LightText>
                        </View>
                        <Loader loading={this.props.loading} />
                    </ScrollView>
                {/* </SafeAreaView> */}
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return {
        couponDetail: state.coupon.myCouponDetail,
        loading: state.coupon.loading
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        fetchMyCouponDetail:(storeId, navigation) => fetchMyCouponDetail(storeId, dispatch, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCouponDetail);