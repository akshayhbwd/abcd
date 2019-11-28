import React, { Component } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CodeInput from 'react-native-confirmation-code-input';
import { connect } from 'react-redux';
import Loader from './../Components/Loader';
import { verifyOTP } from "../store/actions/user";
import API from '../Components/API';
import {
   BoldText,
   LightText,
   Logo
  } from './../Components/styledTexts';
import colors from "../styles/colors";
import {Button} from '../Components/button';
import { SafeAreaView } from "react-navigation";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

class Verification extends Component {
  constructor() {
    super();
    this.state = {
        loader:false,
        otp:''
    };
  }
  
  
  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };
  
    reSendOTP() {
        try{
            API.reSendOTP(this.props.country_code, this.props.phone_number)
            .then(res => res.json())
            .then(jsonRes =>{
                if(jsonRes.success){
                    console.log("resend otp", jsonRes)
                    alert(jsonRes.message);
                }else{
                    alert(jsonRes.error);
                }
            });
        }catch(error){
            alert(error)
        }
    }

  render(){
    return(
        <View style = {{ flex: 1}}>
           
            <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView contentContainerStyle={{flex: 1}} 
                        style={{height: height, width: width}}
                        behavior='position' enabled 
                         keyboardVerticalOffset={-250}
                         >
                        <View style={{flex: 1, marginHorizontal: 30, paddingVertical: 10}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableOpacity
                                    style={{flex: 0.5}}
                                    onPress={() => {
                                        this.props.navigation.goBack()
                                    }}
                                >
                                    <Image style={{height: 30, width: 30, tintColor: colors.patient}}
                                           resizeMode='contain'
                                           source={require('./../assets/arrow.png')}
                                    />
                                </TouchableOpacity>
                                
                                <View style={{flex: 0.5}}/>
                            </View>

                            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
                                    <Logo style={{ color: colors.appColor}}/>
                                </View> 
                            </View>

                            <View style={{flex: 1, justifyContent: 'space-around', alignItems:'center'}}>
                                <BoldText style={{color: colors.appColor, fontSize: 20}}>Passcode Verification</BoldText>
                                
                                <BoldText style={{ marginTop: 5, textAlign: 'center', color: 'rgb(119,120,122)', fontSize: 16 }}> {'Enter the passcode that we sent on \n' + this.props.country_code + ' ' + this.props.phone_number} </BoldText>
                            </View>

                            <View style={{flex: 0.7, alignItems: 'center', justifyContent: 'center'}}>
                                <LightText style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{this.props.errors.otp ? this.props.errors.otp[0] : null}</LightText>
                                
                                <CodeInput
                                    ref="codeInputRef1"
                                    secureTextEntry
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    codeLength={6}
                                    activeColor={colors.appColor}
                                    inactiveColor={colors.gray}
                                    className={'border-b'}
                                    space={5}
                                    size={40}
                                    inputPosition='left'
                                    onFulfill={(code) => {
                                        this.setState({ otp: code });
                                    }}
                                />
                            </View>

                            <View style={{flex: 1}}>
                            <Button
                                    value={'Continue'}
                                    color={colors.appColor}
                                    Light={true}
                                    textStyle={{fontSize: 20}}
                                    onPress ={() =>{
                                        this.props.verifyOTP(this.state.otp, this.props.country_code, this.props.phone_number, this.props.userType, this.props.navigation)
                                        //   this.props.navigation.navigate('Registration')
                                    }}
                                />
                            </View>

                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                                <View style={{ alignItems:'center'}}>
                                    <TouchableOpacity
                                       onPress = {() => this.reSendOTP()}
                                     >
                                        <BoldText style={{
                                            color: colors.gray,
                                            letterSpacing: 1,
                                            textAlign: 'center',
                                            fontSize:16
                                        }}>Resend code</BoldText>
                                    </TouchableOpacity>
                                    </View>
                            </View>
                        </View>
                        <Loader loading={this.props.loading} />
                    </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                    </SafeAreaView>
        </View>
    )
    }
}

const mapStateToProps = state =>{
    return {
        userType: state.user.userType,
        loading: state.user.loading,
        country_code: state.user.country_code,
        phone_number: state.user.phone_number,
        errors: state.user.errors,
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        verifyOTP:(code, country_code, phone_number, userType, navigation) => verifyOTP(code,country_code,phone_number, userType, dispatch,navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Verification);