import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import { 
    typeFirstName,
    typeLastName,
    typeEmailAddress,
    registerProfile
 } from '../../store/actions/user';
import {
  LightText,
  Logo,
  BoldText
} from '../../Components/styledTexts';
import Loader from '../../Components/Loader';
import {Button} from '../../Components/button';
import colors from "../../styles/colors";
import { ScrollView } from "react-native-gesture-handler";

class Registration extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render(){
      return (
        <View style = {{ flex: 1}}>
            <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1 }}>
                {/* <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" :null}
                style={{flex: 1}}
                keyboardVerticalOffset={Platform.select({ios: -60, android: 20})}
                > */}
                    <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Logo style={{ color: colors.appColor}}/>
                    </View>
                    <View style={{ alignItems:'center', justifyContent:'center', marginVertical:10}}>
                        <BoldText style={{ color: colors.appColor, textAlign:'center'}}>Let's create your account</BoldText>
                    </View>

                
                    <View style={{ flex:1.5, marginHorizontal:15, justifyContent:'space-around'}}>
                        
                            <View style={{ flex: 1}}>
                            <View style={{ flexDirection:'row'}}>
                                <Image
                                    source={require('../../assets/user-anticon.png')}
                                />
                                <LightText style={{ marginLeft:10}}>First name</LightText>  
                            </View>

                            <View style={{ marginHorizontal: 10, marginVertical:10}}>
                                <TextInput
                                style={{height: 40}}
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    placeholder="First name"
                                    placeholderTextColor={colors.gray}
                                    fontSize={14}
                                    value={this.props.first_name}
                                    onChangeText={(first_name) => this.props.typeFirstName(first_name)}
                                />
                            </View>
                            {this.props.errors.first_name ? (<LightText style={{ color: 'red' }}>{this.props.errors.first_name}</LightText>) : null}
                            <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                            </View>
                            <View style={{ flex: 1, marginTop: 5 }}>
                            <View style={{ flexDirection:'row', }}>
                                <Image
                                    source={require('../../assets/user-anticon.png')}
                                />
                                <LightText style={{ marginLeft:10}}>Last name</LightText>  
                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical:10}}>

                            <TextInput
                            style={{ height: 40}}
                                autoCorrect={false}
                                returnKeyType='next'
                                placeholder="Last name"
                                placeholderTextColor={colors.gray}
                                fontSize={14}
                                value={this.props.last_name}
                                onChangeText={(last_name) => this.props.typeLastName(last_name)}
                            />
                            </View>
                            {this.props.errors.last_name ? (<LightText style={{ color: 'red' }}>{this.props.errors.last_name}</LightText>) : null}
                            <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                            </View>
                            <View style={{ flex: 1, marginTop: 5 }}>
                            <View style={{ flexDirection:'row'}}>
                                <Image
                                    source={require('../../assets/mail.png')}
                                />
                                <LightText style={{ marginLeft:10}}>Email address</LightText>  
                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical:10}}>
                            <TextInput
                                autoCorrect={false}
                                returnKeyType='next'
                                keyboardType='email-address'
                                placeholder="Email address"
                                placeholderTextColor={colors.gray}
                                fontSize={14}
                                value={this.props.email_address}
                                onChangeText={(email_address) => this.props.typeEmailAddress(email_address)}
                            />
                            </View>
                            {this.props.errors.email_address ? (<LightText style={{ color: 'red' }}>{this.props.errors.email_address}</LightText>) : null}
                            <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                            </View>
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('TOS')}
                            >
                                <LightText style={{ color: colors.gray, textDecorationLine:'underline'}}>{'Term & Conditions'} <BoldText style={{color:'red', textDecorationLine:'underline', textDecorationColor:'#fff'}}>*</BoldText></LightText>
                            </TouchableOpacity>
                            {this.props.errors.term_condition ? (<LightText style={{ color: 'red' }}>{this.props.errors.term_condition}</LightText>) : null}
                    </View>
                    <Loader loading={this.props.loading} />
                    </View>
                {/* </KeyboardAvoidingView> */}
            </TouchableWithoutFeedback>
                <View style={{  }}>
                    <Button
                        value={'Continue'}
                        color={colors.appColor}
                        onPress ={() =>{
                            this.props.registerProfile(this.props.first_name, this.props.last_name, this.props.email_address, this.props.userType, this.props.term_condition, this.props.navigation)
                        }}
                    />
                </View>
                </ScrollView>
            </SafeAreaView>
        </View>   
      )
  }
}


const mapStateToProps = state =>{
    return{
        first_name: state.user.first_name,
        last_name: state.user.last_name,
        email_address: state.user.email_address,
        userType: state.user.userType,
        loading: state.user.loading,
        term_condition: state.user.term_Condition,
        errors: state.user.errors
    }
  };
  
  const mapDispatchToProps = dispatch =>{
    return {
        typeFirstName: (first_name) => {
            dispatch(typeFirstName(first_name));
        },
        typeLastName: (last_name) => {
            dispatch(typeLastName(last_name));
        },
        typeEmailAddress: (email_address) => {
            dispatch(typeEmailAddress(email_address));
        },
        registerProfile:(first_name, last_name, email_address, userType, term_condition, navigation) => registerProfile(first_name, last_name, email_address, userType,term_condition, dispatch, navigation)
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Registration);