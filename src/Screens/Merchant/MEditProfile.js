import React, { Component } from "react";
import {
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    StyleSheet,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../../Components/Header';
import { SafeAreaView } from "react-navigation";
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import {updateBusinessProfile} from '../../store/actions/user';
import Loader from '../../Components/Loader';
import colors from '../../styles/colors';
import {Button} from '../../Components/button';
import { LightText, BoldText } from "../../Components/styledTexts";
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';


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

class MEditProfile extends Component {
    constructor(){
        super();
        this.state = { 
            first_name:'',
            last_name:'',
            email_address:'',
            phone_number:'',
            business_phone:'',
            business_email:'',
            city:'',
            zipcode:'',
            address:'',
            profile_image: null,
            business_name:'',
            business_id:'',
            startDay:'',
            endDay:'',
            startTime:'',
            endTime:'',
            wesite:'',
            errors:{}
        };
    }
    componentDidMount(){
        this.setState({
            first_name:this.props.user.first_name,
            last_name: this.props.user.last_name,
            email_address: this.props.user.email_address,
            phone_number:this.props.user.phone_number,
            business_phone: this.props.user.business_phone,
            business_email: this.props.user.business_email,
            // profile_image:this.props.user.profile_image,
            address:this.props.user.business_address,
            city: this.props.user.city,
            zipcode: this.props.user.zipcode,
            website: this.props.user.website,
            business_name: this.props.user.business_name,
            business_id: this.props.user.business_ein,
            startDay: this.props.user.business_working_start_day,
            endDay: this.props.user.business_working_end_day,
            startTime: this.props.user.business_working_start_time,
            endTime: this.props.user.business_working_end_time,
            wesite: this.props.user.wesite
        })
    }

    updateProfile(){
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(this.state.business_name && this.state.first_name && this.state.last_name && this.state.email_address && this.state.address && this.state.business_id && this.state.city && this.state.zipcode && this.state.business_name.length > 0 && this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.email_address.length > 0 && reg.test(this.state.email_address) ){
        this.props.updateBusinessProfile(this.state.business_name, this.state.business_id, this.state.address, this.state.business_phone, this.state.business_email, this.state.city, this.state.zipcode, this.state.website, this.props.user.userType, this.state.startDay, this.state.endDay, this.state.startTime, this.state.endTime, this.state.profile_image, this.state.first_name, this.state.last_name, this.state.email_address, this.props.navigation)
    }else{
        var msg=''
        if(!this.state.business_name){
            msg='Kindly fill the business name'
        }else if(!this.state.first_name){
            msg='Kindly fill the first name'
        }else if(!this.state.last_name){
            msg='Kindly fill the last name'
        }else if(!this.state.email_address){
            msg='Kindly fill the email address'
        }else if(!reg.test(this.state.email_address)){
            msg='Kindly enter a valid email address.'
        // }else if(!this.state.business_email){
        //     msg='Kindly fill the business email'
        // }else if(!reg.test(this.state.business_email)){
        //         msg='Kindly enter a valid business email.'
        }else if(!this.state.city){
            msg='Kindly fill the city'
        }else if(!this.state.zipcode){
            msg='Kindly fill the zip code'
        }else if(!this.state.address){
            msg='Kindly fill the business address'
        }else if(!this.state.business_id){
            msg='Kindly fill the business EIN'
        }
        alert(msg)
    }
}
openGalleryForProfilePic(buttonIndex) {
    
    if(buttonIndex === 1) {
        ImagePicker.openPicker({
            width: 1000,
            height: 1000,
            cropping: true,
            includeBase64: true,
            mediaType: 'photo'
        })
            .then(image => {
                this.setState({
                    profile_image: `data:${image.mime};base64,${image.data}`,
                });
            });
    } else if(buttonIndex === 0) {
        ImagePicker.openCamera({
            width: 1000,
            height: 1000,
            cropping: true,
            includeBase64: true,
            mediaType: 'photo'
        })
            .then(image => {
                this.setState({
                    profile_image: `data:${image.mime};base64,${image.data}`,
                });
            });
    }
}

showActionSheet = () => {
this.ActionSheet.show()
}

    render(){
        return (
            <View style = {{ flex: 1, backgroundColor:colors.appColor}}>
                <SafeAreaView style={{ flex: 1}}>
                    <View style={{flex: .08, backgroundColor: colors.appColor}}>
                        <Header
                        leftNavigation={this.props.navigation}
                        headercolor={colors.appColor}
                        color={colors.white}
                        value={'Edit Profile'}
                        />
                    </View>
                    <ScrollView style={{ flex:1,backgroundColor:'#fff' }}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                 behavior={Platform.OS === "ios" ? "position" : null}
                 enabled
                 keyboardVerticalOffset={Platform.select({ios: -900, android: 20})}
                >
                    <View>
                 

                     <View style={{ flex: 1, justifyContent:'center', backgroundColor:colors.appColor, paddingVertical:20}}>
                   
                        <View style={{ flexDirection:'row' }}>
                                                <View style={{ flex:1, justifyContent:'flex-start', alignItems:'flex-end'}}>
                                                <TouchableOpacity style={{ height: width/4, width: width/4, borderRadius: (width/4)/ 2, borderWidth: 2, borderColor: colors.lightGray, justifyContent:'center', alignItems:'center' }}
                                                onPress={()=> this.showActionSheet()}
                                                >
                                                {(this.state.profile_image !== null)?(
                                                    <Image
                                                    style={{ height: width/4 - 10, width: width/4 - 10, borderRadius: (width/4 - 10)/ 2 }}
                                                    source = {{uri:this.state.profile_image}}
                                                     resizeMode={'cover'}
                                                />
                                                ):(
                                                <Image
                                                    style={{ height: width/4 - 10, width: width/4 - 10, borderRadius: (width/4 - 10)/ 2 }}
                                                    source={(this.props.user.profile_image) ? ({uri: this.props.user.profile_image}) : require("../../assets/user-anticon.png")}
                                                     resizeMode={'cover'}
                                                />
                                                )}

                                                
                                                </TouchableOpacity>
                                                </View>
                                                <View style={{ flex:2, paddingLeft:10, justifyContent:'center'}}>
                                                    <LightText style={{ color: colors.white, fontWeight:'600'}}>{`Business Logo`}</LightText>           
                                                </View>
                                                <ActionSheet
                                                ref={o => this.ActionSheet = o}
                                                title={'Which one do you like ?'}
                                                options={['Take photo', 'Choose from Library', 'Cancel']}
                                                cancelButtonIndex={2}
                                                onPress={(index) => { this.openGalleryForProfilePic(index) }}
                                                />
                        </View>

                        <View style={{ flex:1, marginHorizontal:30, marginTop:20}}>
{/* Bussiness name */}
                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/busines-name.png')}
                                style={{tintColor:colors.white}}
                            />
                            <LightText style={{ marginLeft:10, color: colors.white}}>Business name</LightText>  
                        </View>

                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                            <TextInput
                                autoCorrect={false}
                                returnKeyType='next'
                                placeholder="Business name"
                                placeholderTextColor={colors.gray}
                                style={{color:colors.white}}
                                fontSize={14}
                                 value={this.state.business_name}
                                 onChangeText={(business_name) => this.setState({business_name:business_name})}
                            />
                        </View>
                        {this.state.errors.business_name ? (<LightText style={{ color: 'red' }}>{this.state.errors.business_name}</LightText>) : null}
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>
{/* business Id */}
                <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/user-anticon.png')}
                                style={{tintColor:colors.white}}
                            />
                            <LightText style={{ marginLeft:10, color:colors.white}}>Business tax ID (EIN)</LightText>  
                        </View>

                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                            <TextInput
                                autoCorrect={false}
                                returnKeyType='next'
                                placeholder="Business tax Id"
                                placeholderTextColor={colors.gray}
                                fontSize={14}
                                style={{color:colors.white}}
                                value={this.state.business_id}
                                onChangeText={(business_id) => this.setState({business_id:business_id})}
                            />
                        </View>
                        {this.state.errors.business_id ? (<LightText style={{ color: 'red' }}>{this.state.errors.business_id}</LightText>) : null}
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>

                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/home.png')}
                                style={{tintColor:colors.white}}
                            />
                            <LightText style={{ marginLeft:10, color: '#fff'}}>Business Address</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                        <TextInput
                            autoCorrect={false}
                            returnKeyType='next'
                            placeholder="Business Address"
                            placeholderTextColor={colors.gray}
                            style={{color:colors.white}}
                            fontSize={14}
                             value={this.state.address}
                             onChangeText={(address) => this.setState({address:address})}
                        />
                        </View>
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>

                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/phone-name.png')}
                                style={{tintColor:colors.white}}
                            />
                            <LightText style={{ marginLeft:10, color: '#fff'}}>Business Phone number</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                        <TextInput
                            autoCorrect={false}
                            maxLength={10}
                            returnKeyType='next'
                            keyboardType='numeric'
                            placeholder="Business Phone number"
                            placeholderTextColor={colors.gray}
                            style={{color:colors.white}}
                            fontSize={14}
                             value={this.state.business_phone}
                             onChangeText={(phone) => this.setState({business_phone: phone})}
                        />
                        </View>
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>
                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/mail.png')}
                                style={{tintColor:colors.white}}
                            />
                            <LightText style={{ marginLeft:10, color: '#fff'}}>Business email</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                        <TextInput
                            autoCorrect={false}
                            returnKeyType='next'
                            placeholder="Business email"
                            keyboardType={'email-address'}
                            placeholderTextColor={colors.gray}
                            style={{color:colors.white}}
                            fontSize={14}
                             value={this.state.business_email}
                             onChangeText={(business_email) => this.setState({business_email: business_email})}
                        />
                        </View>
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>
                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/home.png')}
                                style={{tintColor:colors.white}}
                            />
                            <LightText style={{ marginLeft:10, color: '#fff'}}>City</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                        <TextInput
                            autoCorrect={false}
                            returnKeyType='next'
                            placeholder="city"
                            placeholderTextColor={colors.gray}
                            style={{color:colors.white}}
                            fontSize={14}
                             value={this.state.city}
                             onChangeText={(city) => this.setState({city: city})}
                        />
                        </View>
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>
                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/mail.png')}
                                style={{tintColor:colors.white}}
                            />
                            <LightText style={{ marginLeft:10, color: '#fff'}}>Zip code</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                        <TextInput
                            maxLength={6}
                            autoCorrect={false}
                            returnKeyType='next'
                            placeholder="Zip code"
                            keyboardType={'number-pad'}
                            placeholderTextColor={colors.gray}
                            style={{color:colors.white}}
                            fontSize={14}
                             value={this.state.zipcode}
                             onChangeText={(zipcode) => this.setState({zipcode: zipcode})}
                        />
                        </View>
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>

                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/Web-site.png')}
                                style={{tintColor:colors.white}}
                            />
                            <LightText style={{ marginLeft:10, color: '#fff'}}>Business Website URL</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                        <TextInput
                            autoCorrect={false}
                            returnKeyType='next'
                            placeholder="Website url"
                            placeholderTextColor={colors.gray}
                            fontSize={14}
                            style={{color:colors.white}}
                             value={this.state.website}
                             onChangeText={(website) => this.setState({website:website})}
                        />
                        </View>
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>
          {/* Office time               */}

                        <View>
                            <View style={{ flexDirection:'row', marginVertical:10}}>
                                <Image
                                    source={require('../../assets/time-office.png')}
                                    style={{tintColor:colors.white}}
                                />
                                <LightText style={{ marginLeft:10, color: colors.white}}>Business hours</LightText>  
                            </View>
                            <View style={{ flexDirection:'row',marginVertical:10, justifyContent:'space-between'}}>
                                <LightText style={{color: colors.white}}>Available from</LightText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginVertical:3, alignItems:'center' }}>
                            <View style={{ borderWidth: 1, borderColor: '#fff', width: width/2.5, }}>
                            <RNPickerSelect
                                placeholder={{}}
                                items={days}
                                onValueChange={value => {
                                    this.setState({startDay:value})
                                }}
                                 style={pickerSelectStyles}
                                value={this.state.startDay}
                            />
                            </View>
                            <LightText style={{fontSize:16, color: colors.white, marginHorizontal: 5}}>to</LightText>
                            <View style={{ borderWidth: 1, borderColor: '#fff', width: width/2.5, }}>
                            <RNPickerSelect
                                placeholder={{}}
                                items={days}
                                onValueChange={value => {
                                    this.setState({endDay:value})
                                }}
                                style={pickerSelectStyles}
                                value={this.state.endDay}
                            />
                            </View>                      
                                </View>

                            <View style={{ flexDirection:'row',marginVertical:10, justifyContent:'space-between'}}>
                                <LightText style={{color: colors.white}}>Open time</LightText>
                                <LightText style={{color: colors.white}}>Close time</LightText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginVertical:3 }}>
                                <DatePicker
                                style={{width: (width/2)-50}}
                                customStyles={{dateInput:{borderWidth: 1, borderColor:'#fff'}, dateText:{color:'#fff'}}}
                                date={this.state.startTime}
                                mode="time"
                                placeholder="00:00 AM"
                                format="hh:mm A"
                                minuteInterval={15}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                 onDateChange={(time) => {this.setState({startTime:time})}}
                            /> 

                            <DatePicker
                                style={{width: (width/2)-50}}
                                customStyles={{dateInput:{borderWidth: 1, borderColor:'#fff', color:'#fff'},dateText:{color:'#fff'}}}
                                date={this.state.endTime}
                                mode="time"
                                placeholder="00:00 AM"
                                format="hh:mm A"
                                minuteInterval={15}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                 onDateChange={(time) => {this.setState({endTime:time})}}
                            />                       
                                </View>
                            </View>
                        </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor:colors.white}}>
                            <View style={{ alignItems:'center', marginHorizontal:10, marginVertical:20, height:50, justifyContent:'space-between',}}>
                                <BoldText style={{fontWeight:'500', textAlign:'center'}}>Account Holder</BoldText>
                                <BoldText style={{fontWeight:'500', textAlign:'center'}}>Contact Information.</BoldText>
                            </View>
                            <View style={{backgroundColor: colors.lightGray, height:1}}/>
                            <View style={{ marginHorizontal:20, marginVertical: 5}}>
                            <View style={{ flex:1.5, marginHorizontal:15, justifyContent:'space-around'}}>
                        
                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/user-anticon.png')}
                            />
                            <LightText style={{ marginLeft:10}}>First name</LightText>  
                        </View>

                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                            <TextInput
                                autoCorrect={false}
                                returnKeyType='next'
                                placeholder="First name"
                                placeholderTextColor={colors.gray}
                                fontSize={14}
                                 value={this.state.first_name}
                                 onChangeText={(first_name) => this.setState({first_name:first_name})}
                            />
                        </View>
                        {this.state.errors.first_name ? (<LightText style={{ color: 'red' }}>{this.state.errors.first_name}</LightText>) : null}
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>
                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/user-anticon.png')}
                            />
                            <LightText style={{ marginLeft:10}}>Last name</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>

                        <TextInput
                            autoCorrect={false}
                            returnKeyType='next'
                            placeholder="Last name"
                            placeholderTextColor={colors.gray}
                            fontSize={14}
                             value={this.state.last_name}
                             onChangeText={(last_name) => this.setState({last_name:last_name})}
                        />
                        </View>
                        {this.state.errors.last_name ? (<LightText style={{ color: 'red' }}>{this.state.errors.last_name}</LightText>) : null}
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>
                        <View style={{flex:1, marginVertical:5}}>
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
                            placeholder="Email address"
                            keyboardType={'email-address'}
                            placeholderTextColor={colors.gray}
                            fontSize={14}
                             value={this.state.email_address}
                             onChangeText={(email_address) => this.setState({email_address:email_address})}
                        />
                        </View>
                        {this.state.errors.email_address ? (<LightText style={{ color: 'red' }}>{this.state.errors.email_address}</LightText>) : null}
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>

                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/phone-name.png')}
                            />
                            <LightText style={{ marginLeft:10}}>Phone number</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                        
                        <LightText>{this.state.phone_number}</LightText>
                        </View>
                        <View style={{height: 1, backgroundColor: colors.lightGray}}/>
                        </View>
                     </View>             
                </View>
                
                <View style={{  }}>
                    <Button
                        value={'Update'}
                        color={colors.appColor}
                        onPress ={() =>{
                             this.updateProfile()
                        }}
                    />
                </View>
                
                 </View>
                 </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            </ScrollView>
                <Loader loading={this.props.loading} />
                </SafeAreaView>
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return {
        user: state.user,
        loading: state.user.loading
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        updateBusinessProfile:(business_name, business_id, business_address, business_phone, business_email, city, zipcode, website, userType, business_working_start_day, business_working_end_day, business_working_start_time, business_working_end_time, image, first_name, last_name, email, navigation)=>updateBusinessProfile(business_name, business_id, business_address,business_phone, business_email, city, zipcode, website, userType, business_working_start_day, business_working_end_day, business_working_start_time, business_working_end_time, image, first_name, last_name, email, dispatch, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MEditProfile);

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
    //   borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 4,
      color: '#fff',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 10,
      height: 40,
    //   borderWidth: 1,
    //   borderColor: '#FFF',
    //   borderRadius: 8,
      color: '#fff',
      width: (width/2.5),
      paddingRight: 1, // to ensure the text is never behind the icon
    },
  });