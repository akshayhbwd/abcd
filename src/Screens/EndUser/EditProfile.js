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
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../../Components/Header';
import { SafeAreaView } from "react-navigation";
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import {updateProfile} from '../../store/actions/user';
import Loader from '../../Components/Loader';
import colors from '../../styles/colors';
import {Button} from '../../Components/button';
import { LightText, BoldText } from "../../Components/styledTexts";
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';


const {height, width} = Dimensions.get('screen')

class EditProfile extends Component {
    constructor(){
        super();
        this.state = { 
            first_name:'',
            last_name:'',
            email_address:'',
            phone_number:'',
            address:'',
            city:'',
            zipcode:'',
            image: null,
            errors:{}
        };
    }
    componentDidMount(){
        this.setState({
            first_name:this.props.user.first_name,
            last_name: this.props.user.last_name,
            email_address: this.props.user.email_address,
            phone_number:this.props.user.phone_number,
            image:this.props.user.profile_image,
            address:this.props.user.address,
            city:this.props.user.city,
            zipcode: this.props.user.zipcode
        })
    }

    updateProfile(){
    let reg = /\S+@\S+\.\S+/g ;
    if(this.state.first_name && this.state.last_name && this.state.email_address && this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.email_address.length > 0 && reg.test(this.state.email_address)){
        this.props.updateProfile(this.state.first_name, this.state.last_name, this.state.email_address, this.state.address, this.state.city, this.state.zipcode, this.state.image, this.props.navigation)
    }else{
        let errors = {}
        if(!this.state.first_name){
            errors['first_name'] = ['Kindly fill the first name']
        }else if(!this.state.last_name){
            errors['last_name'] = ['Kindly fill the last name']
        }else if(!this.state.email_address){
            errors['email_address'] = ['Kindly fill the email address']
        }else if(reg.test(this.state.email_address)){
            errors['email_address'] = ['Kindly enter a valid email address.']
        }
        this.setState({errors:errors})
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
                    image: `data:${image.mime};base64,${image.data}`,
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
                    image: `data:${image.mime};base64,${image.data}`,
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
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                {/* <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{flex: 1}}
                keyboardVerticalOffset={Platform.select({ios: 0, android: 20})}
                > */}
                 <ScrollView style={{ flex:1,backgroundColor:'#fff' }}>

                     <View style={{ flex: 1, justifyContent:'center', backgroundColor:colors.appColor, paddingVertical:20}}>
                   
                        <View style={{ justifyContent:'center', alignItems:'center' }}>
                                                <View style={{ justifyContent:'flex-start', alignItems:'flex-end'}}>
                                                <TouchableOpacity style={{ height: width/4, width: width/4, borderRadius: (width/4)/ 2, borderWidth: 2, borderColor: colors.lightGray, justifyContent:'center', alignItems:'center' }}
                                                onPress={()=> this.showActionSheet()}
                                                >
                                                <Image
                                                    style={{ height: width/4 - 10, width: width/4 - 10, borderRadius: (width/4 - 10)/ 2,}}
                                                    source={(this.state.image) ? ({uri: this.state.image}) : require("../../assets/user-anticon.png")}
                                                    resizeMode={'cover'}
                                                />
                                                </TouchableOpacity>
                                                </View>
                                                <LightText style={{ color: colors.white, marginTop:5}}>{`Upload your photo`}</LightText>           
                        
                                                <ActionSheet
                                                ref={o => this.ActionSheet = o}
                                                title={'Which one do you like ?'}
                                                options={['Take photo', 'Choose from Library', 'Cancel']}
                                                cancelButtonIndex={2}
                                                onPress={(index) => { this.openGalleryForProfilePic(index) }}
                                                />
                        </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor:colors.white}}>
                            <View style={{ marginHorizontal:10, marginVertical:20, height:50, justifyContent:'space-between',}}>
                                <LightText style={{fontWeight:'500', textAlign:'center'}}>Personal Details</LightText>
                                <View style={{backgroundColor: colors.lightGray, height:1}}/>
                            </View>
                            <View style={{ marginHorizontal:20}}>
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

                        <View style={{flex:1, marginVertical:5}}>
                        <View style={{ flexDirection:'row'}}>
                            <Image
                                source={require('../../assets/home.png')}
                            />
                            <LightText style={{ marginLeft:10}}>Address</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                        <TextInput
                            autoCorrect={false}
                            returnKeyType='next'
                            placeholder="Address"
                            placeholderTextColor={colors.gray}
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
                                source={require('../../assets/home.png')}
                            />
                            <LightText style={{ marginLeft:10}}>City</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                        <TextInput
                            autoCorrect={false}
                            returnKeyType='next'
                            placeholder="City"
                            placeholderTextColor={colors.gray}
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
                            />
                            <LightText style={{ marginLeft:10}}>Zip code</LightText>  
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical:10}}>
                        <TextInput
                            autoCorrect={false}
                            maxLength={6}
                            placeholder="Zip code"
                            keyboardType={'number-pad'}
                            placeholderTextColor={colors.gray}
                            fontSize={14}
                             value={this.state.zipcode}
                             onChangeText={(zipcode) => this.setState({zipcode: zipcode})}
                        />
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
                <View style={{height: 50}}/>
                 </View>
                
                
                </ScrollView>
                {/* </KeyboardAvoidingView> */}
            </TouchableWithoutFeedback>
                </SafeAreaView>
                <Loader loading={this.props.loading} />
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
        updateProfile:(first_name, last_name, email_address, address, city, zipcode, image, navigation) => updateProfile(first_name, last_name, email_address, address, city, zipcode, image, dispatch, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);