import React, { Component } from "react";
import {
    View,
    Image,
    Modal,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Keyboard,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../../styles/colors';
import Header from '../../Components/Header';
import { LightText, BoldText } from "../../Components/styledTexts";
import {Button} from '../../Components/button';
import Loader from '../../Components/Loader';
import { 
    sendFund,
    checkCoupon
} from '../../store/actions/coupons';

class PaymentTo extends Component {
    constructor(){
        super();
        this.state = {
            modalVisible: false,
            purchaseAmount:0
        }
    }
sendFundForPay(){
    if(this.props.stripe_id === null){
        this.props.navigation.navigate('AddCard', {formPaymentTo: true})
    }else{
    this.props.sendFund(this.props.scanCouponDetail.discount, this.props.scanCouponDetail.customer_id, this.props.scanCouponDetail.coupon_id, this.props.navigation )
    }
}

    renderModalContent() {
        return(
            <TouchableWithoutFeedback
                onPress={()=>Keyboard.dismiss()}
            >
                <View style={{ padding:10,borderRadius:10, justifyContent: 'center', backgroundColor:colors.white}}>
                <View style={{paddingVertical:10}}>
                    <BoldText style={{fontSize: 20, color: colors.appColor, fontWeight: '600', marginVertical: 10, alignSelf: 'center'}}> Total Amount</BoldText>
                </View>
                <View style={{ borderStyle: 'dashed', borderWidth: .5 }}/>

                <View>
                <View style={{ marginVertical:20}}>
                    <LightText>Enter total purchase amount</LightText>

                <View style={{marginVertical:10, marginHorizontal:20, flexDirection:'row', padding:10, borderWidth:1, borderColor:colors.lightGray, borderRadius:5}}>
                    <View style={{justifyContent:'center'}}>
                        <LightText style={{fontSize:20}}>$</LightText>
                    </View>
                    <TextInput
                            autoCorrect={false}
                            // editable={false}
                            // returnKeyType='next'
                             placeholder="Enter amount"
                             keyboardType={'number-pad'}
                            placeholderTextColor={colors.lightGray}
                            fontSize={18}
                            value={this.state.purchaseAmount}
                            onChangeText={(value)=> this.setState({purchaseAmount: value})}
                            style={{ height: 40, marginLeft:2, width:'90%'}}
                        />
                    </View>
                        {/* <LightText style={{textAlign:'center', marginVertical:10, color:colors.gray}}>{`Lorem ipsum is simply dummy text of the printing and typesetting industry`}</LightText> */}
                    </View>
                   </View>
                   <View style={{ borderStyle: 'dashed', borderWidth: .5 }}/>
                    <View style={{ flexDirection:'row', height:40}}>
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                            onPress={()=>this.setState({modalVisible:false, purchaseAmount:0})}
                        >
                            <BoldText style={{color:colors.strongRed}}>Cancel</BoldText>
                        </TouchableOpacity>
                        <View style={{width:1, backgroundColor:colors.lightGray}}/>
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                            onPress={()=>{
                                this.setState({modalVisible:false})
                                this.props.checkCoupon(this.props.scanCouponDetail.qrcode, this.state.purchaseAmount, this.props.navigation)
                            }}
                        >
                            <BoldText style={{color:colors.appColor}}>Confirm</BoldText>
                        </TouchableOpacity>
                    </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }

    render(){
        return (
            <View style={{flex:1, justifyContent:'center'}}>
                    <View style={{flex: .1, backgroundColor: colors.white}}>
                        <Header
                             leftNavigation={this.props.navigation}
                            headercolor={colors.white}
                            color={colors.appColor}
                            value={'Payment to'}
                        />
                    </View>
                    <ScrollView style={{ flex:1 }}>
                        <View style={{margin:20, padding:10, borderRadius:10, backgroundColor: '#F7F7F7',shadowOffset:{width:1, height:5}, shadowOpacity: 0.28, shadowRadius:21, shadowColor: '#451B2D'}}>
                            <View style={{ alignItems:'center'}}>
                                    <LightText style={{ color: colors.appColor, fontSize: 16, marginHorizontal: 20, textAlign: 'center'}} >{(this.props.scanCouponDetail)?(`${this.props.scanCouponDetail.scanCouponDesc}`) : (null)}</LightText>
                                    {/* <BoldText style={{ color: colors.appColor, fontSize: 26}}>{(this.props.scanCouponDetail)?(`${this.props.scanCouponDetail.coupon_description}`) : (null)}</BoldText> */}
                            </View>
                            <View style={{marginVertical:10, borderStyle: 'dashed', borderWidth: 1 }}/>
                            <View style={{paddingVertical:10, alignItems:'center'}}>
                            {(this.props.scanCouponDetail && this.props.scanCouponDetail.customer_image !== null) ?(
                                <Image
                                    source={{uri: this.props.scanCouponDetail.customer_image}}
                                    style={{height:130, width:130, borderRadius: 65 }}
                                    resizeMode={'center'}
                                />) : (null)}
                                {/* <LightText style={{color: colors.gray,letterSpacing:2}}>01787656592</LightText> */}
                                <LightText style={{color: colors.gray, textAlign:'center'}}>{(this.props.scanCouponDetail) ? (this.props.scanCouponDetail.overview) : ('')}</LightText>
                            </View>
                            <View style={{marginVertical:10, borderStyle: 'dashed', borderWidth: .5 }}/>
                            {(this.props.scanCouponDetail.error)?(
                                <View>
                                    <LightText style={{color: 'red', textAlign: 'center'}}>{this.props.scanCouponDetail.error}</LightText>
                                </View>
                            ):(
                                <View>
                                {(this.props.scanCouponDetail.coupon_valid)?(
                                    <View>
                                   <View style={{padding:10, flexDirection:'row', justifyContent:'space-between'}}>
                                   <BoldText style={{color:colors.gray, fontSize:18}}>Amout:</BoldText>
                                   <LightText style={{color: colors.gray, marginVertical:5}}>{`$${this.props.scanCouponDetail.discount}`}</LightText>
                                    </View>
                                    {/* <View style={{padding:10, flexDirection:'row', justifyContent:'space-between'}}>
                                   <BoldText style={{color:colors.gray, fontSize:18}}>Service fee</BoldText>
                                   <LightText style={{color: colors.gray, marginVertical:5}}>{`$${this.props.scanCouponDetail.service_fee}`}</LightText>
                                    </View> */}
                                    </View>
                                ):(null)}
                                </View>
                            )}
                            

                            
                            <View style={{padding:10, flexDirection: 'row', alignItems:'center'}}>
                                <BoldText style={{color:colors.gray, fontSize:18}}>Name:</BoldText>
                                <LightText style={{color: colors.gray, marginVertical:5, fontSize: 16}}> {(this.props.scanCouponDetail) ? this.props.scanCouponDetail.customer_name : (null)}</LightText>
                            </View>
                            {/* <View style={{marginVertical:10, borderStyle: 'dashed', borderWidth: .5 }}/> */}
                            {(this.props.scanCouponDetail.error) ? (
                                <View style={{  }}>
                                <Button
                                style={{marginHorizontal:10}}
                                    value={'Enter transaction amount'}
                                    color={colors.appColor}
                                    onPress ={() =>{
                                         this.setState({modalVisible:true})  
                                    }}
                                />
                            </View>
                            ): (
                                <View style={{  }}>
                                <Button
                                    value={(this.props.scanCouponDetail.coupon_valid) ? 'Pay Now' :'Enter transaction amount'}
                                    color={colors.appColor}
                                    onPress ={() =>{
                                        (this.props.scanCouponDetail.coupon_valid) ? this.sendFundForPay() : this.setState({modalVisible:true})  
                                    }}
                                />
                                </View>
                            )}
                            

                        </View>
                        <Modal animationType="fade" transparent={true} visible={this.state.modalVisible ? true : false}>
                            <TouchableWithoutFeedback onPress={() => {
                                this.setState({modalVisible: false,error:''})
                            }}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.67)', padding:15 }}>
                                    <TouchableWithoutFeedback>
                                        {this.renderModalContent()}
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                    </ScrollView>
                    <Loader loading={this.props.loading} />
            </View>
        )
    }
}


const mapStateToProps = state =>{
    return {
        loading: state.coupon.loading,
        scanCouponDetail: state.coupon.scanCouponDetail,
        stripe_id: state.user.stripe_id
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        sendFund:(amount, id, coupon_id, navigation) => sendFund(amount, id, coupon_id, dispatch, navigation),
        checkCoupon:(qrcode, amount, navigation) => checkCoupon(qrcode, amount, dispatch, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTo);
