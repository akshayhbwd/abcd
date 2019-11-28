import React, { Component } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StyleSheet
} from "react-native";
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import {
    registerBusinessProfile,
    typeBusinessName,
    typeBusinessAddress,
    typeWebsite,
    selectStartDay,
    selectEndDay,
    selectStartTime,
    selectEndTime
} from '../../store/actions/user';
import {
  LightText,
  Logo,
  BoldText
} from '../../Components/styledTexts';
import Loader from '../../Components/Loader';
import {Button} from '../../Components/button';
import colors from "../../styles/colors";

const {height, width} = Dimensions.get('screen')
const days = [
    {
      label: 'Monday',
      value: 'Monday',
    },
    {
      label: 'Tuesday',
      value: 'Tuesday',
    },
    {
      label: 'Wednesday',
      value: 'Wednesday',
    },
    {
        label: 'Thursday',
        value: 'Thursday',
      },
      {
        label: 'Friday',
        value: 'Friday',
      },
      {
        label: 'Saturday',
        value: 'Saturday',
      },
      {
        label: 'Sunday',
        value: 'Sunday',
      },
  ];
class BRegistration extends Component {
  constructor() {
    super();
  }
  render(){
    
      return (
        <View style = {{ flex: 1}}>
            <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                {/* <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{flex: 1}}
                keyboardVerticalOffset={Platform.select({ios: 0, android: 20})}
                > */}
                <ScrollView style={{ flex:1,backgroundColor:'#fff' }}>
                    <View style={{flex:1}}>
                    <View style={{ flex:1, justifyContent:'center', alignItems:'center', marginVertical:20}}>
                        <Logo style={{ color: colors.appColor}}/>
                    </View>
                    <View style={{ alignItems:'center', justifyContent:'center', marginVertical:15}}>
                        <BoldText style={{ color: colors.appColor, textAlign:'center'}}>Update business profile</BoldText>
                    </View>

                
                    <View style={{ flex:2, marginHorizontal:15, justifyContent:'space-between'}}>
                        
                            <View style={{flex:1, marginVertical:10}}>
                            <View style={{ flexDirection:'row'}}>
                                <Image
                                    source={require('../../assets/user-anticon.png')}
                                />
                                <LightText style={{ marginLeft:10}}>Business name</LightText>  
                            </View>

                            <View style={{ marginHorizontal: 10, marginVertical:10}}>
                                <TextInput
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    placeholder="Business name"
                                    placeholderTextColor={colors.gray}
                                    fontSize={14}
                                     value={this.props.user.business_name}
                                     onChangeText={(business_name) => this.props.typeBusinessName(business_name)}
                                />
                            </View>
                            <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                            </View>
                            <View style={{flex:1, marginVertical:10}}>
                            <View style={{ flexDirection:'row'}}>
                                <Image
                                    source={require('../../assets/Businees-name.png')}
                                />
                                <LightText style={{ marginLeft:10}}>Business address</LightText>  
                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical:10}}>

                            <TextInput
                                autoCorrect={false}
                                returnKeyType='next'
                                placeholder="Business address"
                                placeholderTextColor={colors.gray}
                                fontSize={14}
                                 value={this.props.user.business_address}
                                 onChangeText={(business_address) => this.props.typeBusinessAddress(business_address)}
                            />
                            </View>
                            <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                            </View>
                            <View style={{flex:1, marginVertical:10}}>
                            <View style={{ flexDirection:'row'}}>
                                <Image
                                    source={require('../../assets/phone-name.png')}
                                />
                                <LightText style={{ marginLeft:10}}>Phone number</LightText>  
                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical:10}}>
                            <LightText>{this.props.user.phone_number}</LightText>
                            </View>
                            <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                            </View>
                            <View style={{flex:1, marginVertical:10}}>
                            <View style={{ flexDirection:'row'}}>
                                <Image
                                    source={require('../../assets/Web-site.png')}
                                />
                                <LightText style={{ marginLeft:10}}>Business Website URL</LightText>  
                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical:10}}>
                            <TextInput
                                autoCorrect={false}
                                returnKeyType='next'
                                placeholder="Website URL"
                                placeholderTextColor={colors.gray}
                                fontSize={14}
                                value={this.props.user.website}
                                onChangeText={(website) => this.props.typeWebsite(website)}
                            />
                            </View>
                            <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                            </View>
                            <View>
                            <View style={{ flexDirection:'row', marginVertical:10}}>
                                <Image
                                    source={require('../../assets/time-office.png')}
                                />
                                <LightText style={{ marginLeft:10}}>Business hours</LightText>  
                            </View>
                            <View style={{ flexDirection:'row',marginVertical:10, justifyContent:'space-between'}}>
                                <LightText>Available from</LightText>
                                {/* <LightText>End day</LightText> */}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginVertical:3, alignItems:'center' }}>
                            <RNPickerSelect
                                placeholder={{}}
                                items={days}
                                onValueChange={value => {
                                this.props.selectStartDay(value)
                                }}
                                style={pickerSelectStyles}
                                value={this.props.user.business_working_start_day}
                            />
                            <LightText style={{fontSize:16,}}>to</LightText>
                            <RNPickerSelect
                                placeholder={{}}
                                items={days}
                                onValueChange={value => {
                                this.props.selectEndDay(value)
                                }}
                                style={pickerSelectStyles}
                                value={this.props.user.business_working_end_day}
                            />                      
                                </View>

                            <View style={{ flexDirection:'row',marginVertical:10, justifyContent:'space-between'}}>
                                <LightText>Open time</LightText>
                                <LightText>Close time</LightText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginVertical:3 }}>
                                <DatePicker
                                style={{width: (width/2)-50 }}
                                date={this.props.user.business_working_start_time}
                                mode="time"
                                placeholder="00:00 AM"
                                format="hh:mm A"
                                minuteInterval={15}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                 onDateChange={(time) => {this.props.selectStartTime(time)}}
                            /> 

                            <DatePicker
                                style={{width: (width/2)-50}}
                                date={this.props.user.business_working_end_time}
                                mode="time"
                                placeholder="00:00 AM"
                                format="hh:mm A"
                                minuteInterval={15}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                 onDateChange={(time) => {this.props.selectEndTime(time)}}
                            />                       
                                </View>
                                <TouchableOpacity style={{ marginTop: 10 }}
                                    onPress={()=>this.props.navigation.navigate('TOS')}
                                    >
                                <LightText style={{ color: colors.gray, textDecorationLine:'underline'}}>{'Term & Conditions'} <BoldText style={{color:'red', textDecorationLine:'underline', textDecorationColor:'#fff'}}>*</BoldText></LightText>
                            </TouchableOpacity>
                            </View>
                    </View>
                
                <View style={{  }}>
                    <Button
                        value={'Continue'}
                        color={colors.appColor}
                        onPress ={() =>{
                            this.props.registerBusinessProfile(this.props.user.business_name, this.props.user.business_address, this.props.user.website, this.props.user.userType, this.props.user.business_working_start_day, this.props.user.business_working_end_day, this.props.user.business_working_start_time, this.props.user.business_working_end_time, this.props.user.profile_image, '', '', '', this.props.term_condition, this.props.navigation)
                        }}
                    />
                </View>
                </View>
                </ScrollView>
                {/* </KeyboardAvoidingView> */}
            </TouchableWithoutFeedback>
            <Loader loading={this.props.loading} />
            </SafeAreaView>
        </View>   
      )
  }
}


const mapStateToProps = state =>{
    return{
        user: state.user,
        loading: state.user.loading,
        term_condition: state.user.term_Condition,
    }
  };
  
  const mapDispatchToProps = dispatch =>{
    return {
        typeBusinessName: (business_name) => {
            dispatch(typeBusinessName(business_name));
        },
        typeBusinessAddress: (business_address) => {
            dispatch(typeBusinessAddress(business_address));
        },
        typeWebsite: (website) => {
            dispatch(typeWebsite(website));
        },
        selectStartDay: (start_day) => {
            dispatch(selectStartDay(start_day));
        },
        selectEndDay: (end_day) => {
            dispatch(selectEndDay(end_day));
        },
        selectStartTime: (start_time) => {
            dispatch(selectStartTime(start_time));
        },
        selectEndTime: (end_time) => {
            dispatch(selectEndTime(end_time));
        },
        registerBusinessProfile:(business_name, business_address, website, userType, business_working_start_day, business_working_end_day, business_working_start_time, business_working_end_time, image, first_name, last_name, email, term_condition, navigation)=>registerBusinessProfile(business_name, business_address, website, userType, business_working_start_day, business_working_end_day, business_working_start_time, business_working_end_time, image, first_name, last_name, email, term_condition, dispatch, navigation)
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(BRegistration);

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });