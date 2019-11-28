import React, { Component } from "react";
import {
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal,
    Keyboard,
    Linking,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../../Components/Header';
import { SafeAreaView } from "react-navigation";
import {logout} from '../../store/actions/user';
import colors from '../../styles/colors';
import { LightText, BoldText } from "../../Components/styledTexts";


const {width} = Dimensions.get('screen')

class MProfile extends Component {
    constructor(){
        super();
        this.state = { 
            image: null,
            modalVisible: false,
        };
    }
    showModel(){
        this.setState({modalVisible: true})
    }

    renderModalContent() {
        return(
            <TouchableWithoutFeedback
                onPress={()=>Keyboard.dismiss()}
            >
                <View style={{ padding:10,borderRadius:10, justifyContent: 'center', backgroundColor:colors.white}}>
                <View style={{paddingVertical:10}}>
                    <BoldText style={{fontSize: 20, color: colors.appColor, fontWeight: '600', marginVertical: 10, alignSelf: 'center'}}>Confirmation</BoldText>
                </View>
                <View style={{ borderStyle: 'dashed', borderWidth: .5 }}/>
                <View>
                    <View style={{ marginVertical:20}}>
                        <LightText style={{textAlign:'center', marginVertical:10, marginHorizontal: 20, color:colors.gray}}>{`    Are you sure, you want to logout?      `}</LightText>
                    </View>
                   </View>
                   <View style={{ borderStyle: 'dashed', borderWidth: .5 }}/>
                    <View style={{ flexDirection:'row', height:40}}>
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                            onPress={()=>this.setState({modalVisible:false})}
                        >
                            <BoldText style={{color:colors.strongRed}}>Cancel</BoldText>
                        </TouchableOpacity>
                        <View style={{width:1, backgroundColor:colors.lightGray}}/>
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                            onPress={()=>{
                                this.setState({modalVisible:false}),
                                this.props.logout(this.props.navigation);
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
            <View style = {{ flex: 1, backgroundColor:colors.appColor}}>
                <SafeAreaView style={{ flex: 1}}>
                    <View style={{flex: .08, backgroundColor: colors.appColor}}>
                        <Header
                        headercolor={colors.appColor}
                        color={colors.white}
                        value={'Business Profile'}
                        rightIcon={require('../../assets/logout.png')}
                        onPressRight={this.showModel.bind(this)}
                        />
                    </View>
                    <ScrollView style={{ flex:1, backgroundColor:'#fff' }}>
                    <View style={{ flex: 1, justifyContent:'center', paddingVertical:20, backgroundColor: colors.appColor}}>
                        <View style={{ flexDirection:'row' }}>
                                                <View style={{ flex:1, justifyContent:'flex-start', alignItems:'flex-end'}}>
                                                <View style={{ height: width/4, width: width/4, borderRadius: (width/4)/ 2, borderWidth: 2, borderColor: colors.white, justifyContent:'center', alignItems:'center' }}>
                                                <Image
                                                    style={{ height: width/4 - 10, width: width/4 - 10, borderRadius: (width/4 - 10)/ 2 }}
                                                    source={(this.props.user.profile_image) ? ({uri: this.props.user.profile_image}) : require("../../assets/user-anticon.png")}
                                                    resizeMode={'cover'}
                                                />
                                                </View>
                                                <View style={{ position:'absolute', borderRadius:15, alignItems:'center', justifyContent:'center', height:30, width:30, backgroundColor:colors.white}}>
                                                    <TouchableOpacity
                                                      onPress={() => { 
                                                           this.props.navigation.navigate('MEditProfile')}}
                                                    >
                                                    <Image
                                                    source={require('../../assets/edit.png')}
                                                    style={{ height: 25, width: 25, tintColor:colors.appColor}}
                                                    />
                                                    </TouchableOpacity>
                                                </View>
                                                </View>
                                                <View style={{ flex:2, paddingLeft:10}}>
                                                <BoldText style={{ color: colors.white, marginVertical: 10 }}>{`${this.props.user.business_name}`}</BoldText>
                                                </View>
                                            </View>
                     </View>
                        <View style={{ flex: 2, backgroundColor:colors.white}}>
                            <View style={{ marginHorizontal:10, marginVertical:20, height:50, justifyContent:'space-between'}}>
                                <LightText style={{fontWeight:'500', marginLeft: 10}}>Details</LightText>
                                <View style={{backgroundColor: colors.lightGray, height:1}}/>
                            </View>
                            <View style={{ marginHorizontal:20}}>
                                <View style={{ flexDirection: 'row', alignItems:'center', marginVertical: 5}}>
                                        <Image
                                            style={{ marginLeft:3, tintColor: colors.appColor}}
                                            source={require("../../assets/busines-name.png")}
                                        />
                                        <LightText style={{ marginLeft: 5}}> Business name</LightText>
                                    </View>
                                    <LightText style={{ color: colors.gray, marginLeft: 5}}>{`${this.props.user.business_name}`}</LightText>
                                    <View style={{backgroundColor: colors.lightGray, height:1, marginTop:10}}/>
                                    
                                    <View style={{ flexDirection: 'row', alignItems:'center', marginVertical: 5, marginTop:20}}>
                                        <Image
                                            style={{ marginLeft:3, tintColor: colors.appColor}}
                                            source={require("../../assets/busines-name.png")}
                                        />
                                        <LightText style={{ marginLeft: 5}}>Business tax Id (EIN)</LightText>
                                    </View>
                                    <LightText style={{ color: colors.gray, marginLeft: 5}}>{this.props.user.business_ein}</LightText>
                                    <View style={{backgroundColor: colors.lightGray, height:1, marginTop:10}}/>

                                    <View style={{ flexDirection: 'row', alignItems:'center', marginVertical: 5, marginTop:20}}>
                                        <Image
                                            style={{ marginLeft:3, tintColor: colors.appColor}}
                                            source={require("../../assets/busines-name.png")}
                                        />
                                        <LightText style={{ marginLeft: 5}}>Business address</LightText>
                                    </View>
                                    <LightText style={{ color: colors.gray, marginLeft: 5}}>{this.props.user.business_address}</LightText>
                                    <View style={{backgroundColor: colors.lightGray, height:1, marginTop:10}}/>
                                    
                                    <View style={{ flexDirection: 'row', alignItems:'center', marginVertical: 5, marginTop:20}}>
                                        <Image
                                            style={{ marginLeft:3, tintColor: colors.appColor}}
                                            source={require("../../assets/busines-name.png")}
                                        />
                                        <LightText style={{ marginLeft: 5}}>City</LightText>
                                    </View>
                                    <LightText style={{ color: colors.gray, marginLeft: 5}}>{this.props.user.city}</LightText>
                                    <View style={{backgroundColor: colors.lightGray, height:1, marginTop:10}}/>
                                   
                                    <View style={{ flexDirection: 'row', alignItems:'center', marginVertical: 5, marginTop:20}}>
                                        <Image
                                            style={{ marginLeft:3, tintColor: colors.appColor}}
                                            source={require("../../assets/busines-name.png")}
                                        />
                                        <LightText style={{ marginLeft: 5}}>Zip code</LightText>
                                    </View>
                                    <LightText style={{ color: colors.gray, marginLeft: 5}}>{this.props.user.zipcode}</LightText>
                                    <View style={{backgroundColor: colors.lightGray, height:1, marginTop:10}}/>
{/* for contact Details */}
                                    <View style={{ flexDirection: 'row', alignItems:'center', marginVertical: 5, marginTop:20}}>
                                        <Image
                                            style={{ marginLeft:3, tintColor: colors.appColor}}
                                            source={require("../../assets/phone-name.png")}
                                        />
                                        <LightText style={{ marginLeft: 5}}>Business Phone number</LightText>
                                    </View>
                                    <LightText style={{ color: colors.gray, marginLeft: 5}}>{`${this.props.user.business_phone}`}</LightText>
                                    <View style={{backgroundColor: colors.lightGray, height:1, marginTop:10}}/>
                                   
                                    <View style={{ flexDirection: 'row', alignItems:'center', marginVertical: 5, marginTop:20}}>
                                        <Image
                                            style={{ marginLeft:3, tintColor: colors.appColor}}
                                            source={require("../../assets/mail.png")}
                                        />
                                        <LightText style={{ marginLeft: 5}}>Business email</LightText>
                                    </View>
                                    <LightText style={{ color: colors.gray, marginLeft: 5}}>{`${this.props.user.business_email}`}</LightText>
                                    <View style={{backgroundColor: colors.lightGray, height:1, marginTop:10}}/>
                                   
                                    <View style={{ flexDirection: 'row', alignItems:'center', marginVertical: 5, marginTop:20}}>
                                        <Image
                                            style={{ marginLeft:3, tintColor: colors.appColor}}
                                            source={require("../../assets/busines-name.png")}
                                        />
                                        <LightText style={{ marginLeft: 5}}>Business website</LightText>
                                    </View>
{/* Link */}

                                <TouchableOpacity
                                    onPress={() => {
                                        const words = this.props.user.website.split(':');
                                        let racetrackLink = '';
                                        if(words[0].toUpperCase() === 'HTTP' || words[0].toUpperCase() === 'HTTPS')
                                        {
                                            racetrackLink = this.props.user.website
                                        }else{
                                            racetrackLink = "http://" + this.props.user.website
                                        }
                                        Linking.canOpenURL(racetrackLink).then(supported => {
                                            if (supported) {
                                            Linking.openURL(racetrackLink);
                                            } else {
                                            }
                                        });              
                                    }}
                                    >
                                    <LightText style={{ paddingLeft: 5 }}>{this.props.user.website}</LightText>
                                    </TouchableOpacity>

                                    <View style={{backgroundColor: colors.lightGray, height:1, marginTop:10}}/>
                                    
                                    <View style={{ flexDirection: 'row', alignItems:'center', marginVertical: 5, marginTop:20}}>
                                        <Image
                                            style={{ marginLeft:3, tintColor: colors.familyMember}}
                                            source={require("../../assets/time-office.png")}
                                        />
                                        <LightText style={{ marginLeft: 5}}>Business hours</LightText>
                                    </View>
                                    <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                                        <LightText style={{ color: colors.gray, marginLeft: 5}}>{`${this.props.user.business_working_start_day}-${this.props.user.business_working_end_day}`}</LightText>
                                        <LightText style={{ color: colors.gray, marginLeft: 5}}>{`${this.props.user.business_working_start_time}-${this.props.user.business_working_end_time}`}</LightText>
                                    </View>
                                    <View style={{backgroundColor: colors.lightGray, height:1, marginTop:10}}/>
                                    
                                    { (this.props.user.card_last4 !== '') && 
                                        <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'row', alignItems:'center', marginVertical: 5, marginTop:20}}>
                                        <Image
                                            style={{ marginLeft:3, tintColor: colors.appColor, height: 30, width: 30}}
                                            source={require("../../assets/credit-card.png")}
                                            resizeMode={'contain'}
                                        />
                                        <LightText style={{ marginLeft: 5}}>Card Detail</LightText>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between', marginVertical: 5, marginTop:20}}>

                                    <LightText style={{ marginLeft: 5}}>{`XXXX XXXX XXXX ${this.props.user.card_last4}`}</LightText>
                                        <TouchableOpacity 
                                            onPress={()=>{this.props.navigation.navigate('AddCard', {formPaymentTo: true})}}
                                        >
                                            <Image
                                                style={{ marginLeft:3, tintColor: colors.appColor, height: 25, width: 25}}
                                                source={require("../../assets/edit.png")}
                                                resizeMode={'contain'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                        </View>
                                    }
                                    
            <View style={{ height: 30 }}/>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
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
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return {
        user: state.user
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        logout:(navigation) => logout(dispatch, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MProfile);