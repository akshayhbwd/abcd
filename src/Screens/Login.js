import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { connect } from 'react-redux';
import {
  LightText,
  Logo,
  BoldText
} from './../Components/styledTexts';
import Loader from '../Components/Loader';
import {Button} from '../Components/button';
import { typeMobile, chooseCountry, login } from '../store/actions/user';
import colors from "../styles/colors";



class Login extends Component {
  constructor() {
    super();
    this.state = {
      touchCount:0,
    };
  }

  handleClick = () => {
    this.props.login(this.props.country_code, this.props.phone_number, this.props.navigation.navigate)
  };
  componentWillMount() {
  }

  render(){
    return(
        <View style = {{ flex: 1}}>
         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
             behavior={Platform.OS === "ios" ? "padding" : null}
             style={{flex: 1}}
             keyboardVerticalOffset={Platform.select({ios: 0, android: 20})}
            >
                <View style={{flex:1, alignItems:'center', justifyContent:'center' }}>
                    <TouchableWithoutFeedback style={{flex:1, alignItems:'center', justifyContent:'flex-start', backgroundColor:'yellow'}}
                    onPress = {() =>{
                      this.setState({touchCount: this.state.touchCount + 1})
                      if(this.state.touchCount > 2){
                        this.props.chooseCountry('+91');
                        alert('country change to india')
                      }
                    }}
                    >
                        <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
                            <Logo style={{ color: colors.appColor}}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{flex: 2, marginHorizontal: 20, justifyContent:'space-between', }}>
                    <View style={{ flex:.5}}>
                    <BoldText style={{ color: colors.appColor}}> Your phone!</BoldText>
                    </View>
                    <View style={{ flex:1}}>
                        <LightText style={{ marginLeft: 10 }}>Phone Number</LightText>
                        <View style={[{ borderWidth: 1, borderColor: 'transparent'}, this.props.errors.phone_number ? styles.errorInput : {}]}>
                                
                                <View style={[{flexDirection: 'row', alignItems: 'center', height: 45}]}>
                                    <TextInput
                                        maxLength={10}
                                        underlineColorAndroid='transparent'
                                        autoCorrect={false}
                                        returnKeyType='done'
                                        keyboardType='numeric'
                                        placeholder="Enter your mobile number"
                                        placeholderTextColor='rgb(119,120,122)'
                                        fontSize={18}
                                        value={this.state.PhoneNumber}
                                        onChangeText={(phone_number) => this.props.phoneNumberChange(phone_number)}
                                        style={[styles.normalInput]}
                                    />
                                </View>
                                <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                            </View>
                            <LightText style={{ marginTop: 2, color: 'red' }}>{this.props.errors.phone_number ? this.props.errors.phone_number[0] : null}</LightText>
                            <LightText style={{ color: colors.gray}}> A 6 digit passcode will be sent via text to verify your mobile number!</LightText>
                    </View>
                        
                    <View style={{flex:1}}>
                          <View style={{flex: 1}}>
                            <Button
                                    value={'Verify'}
                                    color={colors.appColor}
                                    Light={true}
                                    textStyle={{fontSize: 20}}
                                    onPress ={() =>{
                                      this.props.login(this.props.country_code, this.props.phone_number, this.props.navigation.navigate)
                                    }}
                                />
                            </View>
                        </View>
                        </View>
                        <Loader loading={this.props.loading} />
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  normalInput: {
    color: colors.appColor,
    marginLeft: 10,
    fontWeight:'bold',
    flex: 1,
    height: 45,
},
errorInput: {
    borderColor: 'red'
}
});


const mapStateToProps = state =>{
  return{
      phone_number: state.user.phone_number,
      country_code: state.user.country_code,
      loading: state.user.loading,
      errors: state.user.errors,
      
  }
};

const mapDispatchToProps = dispatch =>{
  return{
      phoneNumberChange: (phone_number) => {
          dispatch(typeMobile(phone_number));
      },
      chooseCountry: (country_code) => {
        dispatch(chooseCountry(country_code));
    },
      login:(country_code, phone_number, navigate) => login(country_code, phone_number, dispatch, navigate)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);