import React, {Component} from 'react';
import {
    View,
    Image,
    ScrollView,
    FlatList,
    Linking,
    Platform,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    addCouponToCart
} from '../../store/actions/coupons';
import { 
    LightText,
    BoldText
} from '../../Components/styledTexts';
import { selectUserType } from '../../store/actions/user';
import Header from '../../Components/Header';
import colors from '../../styles/colors';
import General from '../../styles/General';
import { Button} from '../../Components/button';

class CouponDetail extends Component {
    constructor(){
        super();
        this.state = {
            selectedIndex: 0,
        };
    }
    
    componentDidMount(){
        this.getSelectedCoupon()
    }

    getSelectedCoupon(){
        this.props.couponDetail.coupons.map((item, index) => {
            console.log(item, '     ', this.props.navigation.state.params.couponId)
            if(item.id === this.props.navigation.state.params.couponId){
                this.setState({ selectedIndex: index})
            }
        })
    }

    getNow(couponId){
        AsyncStorage.getItem('accessToken').then((accessToken) =>{
            if(accessToken !== null){
                this.props.addCouponToCart(couponId, this.props.navigation)
            }else{
                AsyncStorage.setItem('couponId', couponId.toString())
                .then(() => {
                    this.props.selectUserType(0)
                    this.props.navigation.navigate('Login')
                })     
            }
        })
    }

    render(){

        return (
            <View style = {{ flex: 1}}>
                    <View style={{flex: .1}}>
                        <Header
                        leftNavigation={this.props.navigation}
                        color={colors.appColor}
                        value={'EcoCheck Details'}
                        />
                    </View>
                    <ScrollView style={{ flex: 1}}>
                        <View style={{ flex:1, alignItems:'center', flexDirection:'row'}}>
                            <View style={{ flex:1 }}>
                                <Image
                                    source={{uri: (this.props.couponDetail.store_detail) ? this.props.couponDetail.store_detail.image : ""}}
                                    style={{ height: 100, width: 100, marginTop:10, marginLeft:5, borderRadius: 50}}
                                    resizeMode={'cover'}
                                />
                            </View>
                            <View style={{ flex:1.5, marginHorizontal: 5, justifyContent:'space-around', alignItems:'flex-end', }}>
                                    <LightText>{(this.props.couponDetail.store_detail) ? this.props.couponDetail.store_detail.business_name : null}</LightText>
                                    <LightText
                                    onPress={()=>{
                                        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                                        const latLng = `${this.props.couponDetail.store_detail.lat},${this.props.couponDetail.store_detail.lng}`;
                                        const url = Platform.select({
                                            ios: `${scheme}${this.props.couponDetail.store_detail.business_name}@${latLng}`,
                                            android: `${scheme}${latLng}(${this.props.couponDetail.store_detail.business_name})`
                                        });
                                        Linking.openURL(url); 
                                    }}
                                    >{(this.props.couponDetail.store_detail) ? this.props.couponDetail.store_detail.business_address : null}</LightText>
                                    {
                                        (this.props.couponDetail.store_detail) ? (this.props.couponDetail.store_detail.business_phone &&
                                    <LightText>Phone:<LightText style={{color: colors.appColor}}
                                    onPress={()=>{
                                        let url = '';

                                        if (Platform.OS !== 'android') {
                                            url = `telprompt:${this.props.couponDetail.store_detail.business_phone}`;
                                            }
                                            else  {
                                                url = `tel:${this.props.couponDetail.store_detail.business_phone}`;
                                            }

                                        // const url = `telprompt:${this.props.couponDetail.store_detail.business_phone}`;
                                        Linking.canOpenURL(url)
                                            .then((supported) => {
                                                if (!supported) {
                                                    console.log('Can\'t handle url: ' + url);
                                                } else {
                                                    return Linking.openURL(url)
                                                        .then((data) => console.log("then", data))
                                                        .catch((err) => { throw err; });
                                                }
                                            })
                                            .catch((err) => console.log('An error occurred', err));
                                    }}
                                    >{this.props.couponDetail.store_detail.business_phone}</LightText></LightText>
                                    ): null
                                    }
                                    {
                                        (this.props.couponDetail.store_detail) ? (this.props.couponDetail.store_detail.website &&
                                    <LightText>Website: <LightText style={{color: colors.appColor}} onPress={()=>{
                                        const words = this.props.couponDetail.store_detail.website.split(':');
                                        let webLink = '';
                                        if(words[0].toUpperCase() === 'HTTP' || words[0].toUpperCase() === 'HTTPS')
                                        {
                                            webLink = this.props.couponDetail.store_detail.website
                                        }else{
                                            webLink = "http://" + this.props.couponDetail.store_detail.website
                                        }
                                        Linking.canOpenURL(webLink).then(supported => {
                                            if (supported) {
                                              Linking.openURL(webLink);
                                            } else {
                                            }
                                          });  
                                    }}>{this.props.couponDetail.store_detail.website}</LightText></LightText>
                                    ): null
                                    }
                                    {
                                        (this.props.couponDetail.store_detail) ? (this.props.couponDetail.store_detail.business_working_start_time &&
                                            <LightText style={{ textAlign:'right'}}>Business hours: <LightText style={{color: colors.appColor, textAlign:'center'}}>{this.props.couponDetail.store_detail.business_working_start_time} To {this.props.couponDetail.store_detail.business_working_start_time}</LightText></LightText>
                                        ):null
                                    }
                            </View>
                        </View>

                        <View style={{ flex:1, marginTop: 10}}>
                            <Image
                                source={{ uri: (this.props.couponDetail.coupons) ? (this.props.couponDetail.coupons[this.state.selectedIndex].image) : ""}}
                                style={{ flex:1, height: 250, backgroundColor: colors.lightGray}}
                                resizeMode={'cover'}
                            />
                        </View>
                        <View style={{ flex:1}}>
                        <View style={{justifyContent:'center',padding:10,width:'100%', alignItems:'center'}}>
                        <BoldText style={{ fontSize: 26, color:colors.black}}>*{(this.props.couponDetail.coupons) ? (this.props.couponDetail.coupons[this.state.selectedIndex].store_description):null}</BoldText>

                        </View>
                            <Button
                                value={'Add to Booklet'}
                                color={colors.appColor}
                                Light={true}
                                textStyle={{fontSize: 20}}
                                onPress ={() => this.getNow(this.props.couponDetail.coupons[this.state.selectedIndex].id)}
                            />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 10}}>
                            <BoldText style={{ fontWeight: '400'}}> Product overview</BoldText>
                            <View style={{ marginVertical: 10, height: 1, backgroundColor: colors.lightGray}}/>
                            <LightText style={{ color: colors.gray}}>{(this.props.couponDetail.coupons) ? (this.props.couponDetail.coupons[this.state.selectedIndex].overview) : null}</LightText>
                           
                            <View style={{ marginTop: 10}}>
                            <BoldText style={{ fontWeight: '400'}}> More EcoChecks</BoldText>
                            <FlatList
                                data={this.props.couponDetail.coupons}
                                horizontal
                                style={{ padding: 10 }}
                                ItemSeparatorComponent={() => {
                                    return <View style={{ flex: 1, width: 5 }} />
                                }}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={{ flex: 1, paddingHorizontal: 5, paddingVertical: 5, justifyContent: 'flex-start', alignItems: 'flex-end' }}
                                    onPress={()=> this.setState({ selectedIndex: index})}
                                    >
                                        <View style={[General.Card, { flex: 1, marginVertical: 5, alignItems: 'center', justifyContent: 'center', }]}>
                                            <Image
                                                source={{uri: item.image}}
                                                style={{ borderRadius: 5, height: 80, width: 80 }}
                                                resizeMode={'cover'}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                            </View>

                            <BoldText style={{ fontWeight: '400', marginVertical: 1, fontSize: 14}}>* EcoCheck's cash back value is subject to fees.</BoldText>
                            <BoldText style={{ fontWeight: '400', marginVertical: 1, fontSize: 14}}>* No returns or refunds for this offer</BoldText>
                            <View style={{ height: 20}}/>
                        </View>
                    </ScrollView>
                    <Loader loading={this.props.loading} />
                {/* </SafeAreaView> */}
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return {
        couponDetail: state.coupon.couponDetail,
        loading: state.coupon.loading
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        selectUserType:(userType) =>selectUserType(userType, dispatch),
        addCouponToCart:(couponId, navigation) => addCouponToCart(couponId, dispatch, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CouponDetail);