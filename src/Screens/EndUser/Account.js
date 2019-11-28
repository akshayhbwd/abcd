import React, { Component } from "react";
import {
    View,
    Image,
    TouchableWithoutFeedback,
    SectionList,
    Modal,
    Keyboard,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { 
    cashOutBalance,
    getCustomerTransections,
    paymentDetail
 } from '../../store/actions/user';
import Loader from '../../Components/Loader';
import Header from '../../Components/Header';
import colors from '../../styles/colors';
import { LightText, BoldText } from "../../Components/styledTexts";

class Account extends Component {
    constructor(){
        super();
        this.state = { 
            confirmAmount: '',
            modalVisible: false,
            isRefreshing: false
        };
    }
    componentDidMount(){
        this.props.getCustomerTransections(this.props.navigation)
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.loading != this.props.loading){
             if(!this.props.loading){
                 this.setState({ isRefreshing: false})
             }
        }
     }
     handleRefresh(){
         if(this.state.isRefreshing){
             return
         }
         this.setState({ isRefreshing: true})
         this.props.getCustomerTransections(this.props.navigation);
       };

       getPaymentDetail(text) {
        this.props.paymentDetail(text, 'cashout', this.props.navigation)
        this.setState({confirmAmount: text})
      }

    renderItem = (item) => {

        var total = Number((item.item.transaction_fee + item.item.amount + item.item.qfund_fee + item.item.platform_fee));
        return (
            <View style={{ padding: 15 }}>
                <View style={{ flex:1, flexDirection:'row', alignItems:'center'}}
                >
                  <View style={{height:35, width:35, borderRadius:17, alignItems:'center', justifyContent:'center',backgroundColor:colors.lightGray }}>
                          <Image
                              source={require('../../assets/Arrow-up-circle.png')}
                              style={{ height: 20, width: 20, }}
                          />
                  </View>
                  <View style={{ flex:1, marginLeft: 15 }}>
                      <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <LightText>{item.item.text}</LightText>
                        { total && 
                        
                                <LightText>${`${total.toFixed(2)}`}</LightText>
                        }
                        {/* <LightText>${item.item.amount}</LightText> */}
                      </View>
                      <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <LightText style={{ fontSize:12}}>{item.item.time}</LightText>
                        <LightText style={{ fontSize:12}}>Service fee: ${item.item.qfund_fee}</LightText>
                      </View>

                      <View style={{ alignItems: 'flex-end'}}>
                      <View style={{ flexDirection: 'row', marginVertical: 3}}>
                        <LightText style={{ fontSize:12}}>Transaction fee: ${item.item.transaction_fee}</LightText>
                      </View>
                      </View>

                      {(item.item.platform_fee > 0) && (
                        <View style={{ alignItems: 'flex-end'}}>
                      <View style={{ flexDirection: 'row', marginVertical: 3}}>
                        <LightText style={{ fontSize:12}}>Platform fee: ${item.item.platform_fee}</LightText>
                      </View>
                      </View>
                     )} 

                      <View style={{ alignItems: 'flex-end'}}>
                      {/* <View style={{ marginVertical: 3, height: 1, width: 30, backgroundColor:'gray'}}/> */}
                      <View style={{ flexDirection: 'row', marginVertical: 3}}>
                          {(item.item.received)?(
                            <LightText style={{ fontSize:12}}>Net received amount: ${item.item.amount}</LightText>
                          ):(
                            <LightText style={{ fontSize:12}}>Net pay amount: ${item.item.amount}</LightText>
                          )}
                      </View>
                      </View>
                  </View>
                </View>
            </View>
        )
    }

    //Item sparator view
    itemSeparator = () => {
        return (
            <View style={{ height: 1, backgroundColor: colors.lightGray}}/>
        );
      };


      renderModalContent() {
        return(
            <TouchableWithoutFeedback
                onPress={()=>Keyboard.dismiss()}
            >
                <KeyboardAvoidingView behavior="position" enabled>
                <View style={{ padding:10,borderRadius:10, justifyContent: 'center', backgroundColor:colors.white}}>
                <View style={{paddingVertical:10}}>
                    <BoldText style={{fontSize: 20, color: colors.appColor, fontWeight: '600', marginVertical: 10, alignSelf: 'center'}}>Cash Out</BoldText>
                </View>
                <View style={{ borderStyle: 'dashed', borderWidth: .5 }}/>

                <View>
                <View style={{ marginVertical:20}}>
                    <LightText>Cash out Amount</LightText>

                <View style={{marginVertical:10, marginHorizontal:20, flexDirection:'row', padding:10 }}>
                    <View style={{justifyContent:'center'}}>
                        <LightText style={{fontSize:20}}>$</LightText>
                    </View>
                    <TextInput
                            autoCorrect={false}
                            editable = {false}
                            returnKeyType='next'
                            placeholder="Enter Cash out Amount"
                            keyboardType={'number-pad'}
                            placeholderTextColor={colors.lightGray}
                            fontSize={18}
                            value={this.state.confirmAmount.toString()}
                            onChangeText={(discount) => this.getPaymentDetail(discount)}
                            style={{ height: 30, marginLeft:2, width:'90%'}}
                        />
                    </View>
                    </View>
                   </View>
                    {(this.state.confirmAmount > 0 && this.props.payment_Detail !== null)&&(
                    <View style={{ marginHorizontal: 20}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                      <LightText style={{ fontSize:12}}>Transaction fee.</LightText>
                      <LightText style={{ fontSize:12}}>$ {this.props.payment_Detail.transaction_fee}</LightText>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>

                      <LightText style={{ fontSize:12}}>Service fee.</LightText>
                      <LightText style={{ fontSize:12}}>$ {this.props.payment_Detail.qfund_fee}</LightText>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>

                      <LightText style={{ fontSize:12}}>Total Amount: </LightText>
                      <LightText style={{ fontSize:12}}> $ {this.props.payment_Detail.total_amount}</LightText>
                   </View>
                    </View>
                    )}
                   <View style={{ borderStyle: 'dashed', borderWidth: .5, marginTop: 10 }}/>
                    <View style={{ flexDirection:'row', height:40, justifyContent:'space-around'}}>
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                            onPress={()=>{
                                this.setState({modalVisible:false, confirmAmount:''})
                            }}
                        >
                            <BoldText style={{color:colors.strongRed}}>Cancel</BoldText>
                        </TouchableOpacity>
                        <View style={{width:1, backgroundColor:colors.lightGray}}/>
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                            onPress={()=>{
                                this.setState({modalVisible:false})
                                this.props.cashOutBalance(this.props.navigation);
                                // this.props.cashOutBalance(this.state.confirmAmount, this.props.navigation)
                            }}
                        >
                            <BoldText style={{color:colors.appColor}}>Confirm</BoldText>
                        </TouchableOpacity>
                    </View>
            </View>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }



    render(){
        return (
            <View style = {{ flex: 1}}>
                {/* <SafeAreaView style={{ flex: 1}}> */}
                    <View style={{flex: .1}}>
                        <Header
                        color={colors.appColor}
                        value={'My Q-Funds'}
                        />
                    </View>
                    <View style={{ flex: 1}}>
                        <View style={{ flex:1, backgroundColor:colors.appColor, padding: 10, justifyContent:'space-around'}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <LightText style={{ flex: 1, color: colors.white, fontSize:18}}>Total Balance</LightText>
                                <BoldText style={{ flex: 1, color: colors.white, fontSize:20}}> $ {(this.props.transections)? this.props.transections.total_balance : 0}</BoldText>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <LightText style={{ flex: 1, color: colors.white, fontSize:18}}>On-hold amounts</LightText>
                                <BoldText style={{ flex: 1, color: colors.white, fontSize:20}}> $ {(this.props.transections)? this.props.transections.pending_balance : 0}</BoldText>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <LightText style={{ flex: 1, color: colors.white, fontSize:18}}>Available Balance</LightText>
                                <BoldText style={{ flex: 1, color: colors.white, fontSize:20}}> $ {(this.props.transections)? this.props.transections.available_balance : 0}</BoldText>
                            </View>


                            {/* <View style={{ flexDirection: 'row'}}>
                            <View style={{ flex: 1 }}>
                            <LightText style={{ color: colors.white}}>Available Balance</LightText>
                            <BoldText style={{ color: colors.white, fontSize:26}}> $ {(this.props.transections)? this.props.transections.available_balance : 0}</BoldText>

                            </View>
                            <View style={{ flex: 1}}>
                            <LightText style={{ color: colors.white}}>On-hold Balance</LightText>
                            <BoldText style={{ color: colors.white, fontSize:26}}> $ {(this.props.transections)? this.props.transections.pending_balance : 0}</BoldText>
                            </View>
                            </View> */}

                            <View style={{backgroundColor: colors.lightGray, height:1}}/>
                            <View style={{ flexDirection: 'row',paddingTop:5}}>
                                <View style={{ flex:1}}>
                                    <TouchableOpacity 
                                    //  disabled = {(this.props.transections)? (this.props.transections.available_balance > 1.5) ? false : true : false}
                                    style={{ borderColor:colors.white, borderWidth:1, height:30, borderRadius:20, alignItems:'center', justifyContent:'center'}}
                                    onPress={()=> {
                                        if(this.props.transections && (this.props.transections.available_balance > 1.5)){
                                            if(!this.props.stripeid){
                                                this.props.navigation.navigate('WebViewScreen');
                                            }else{
                                                this.setState({ modalVisible: true })
                                                this.getPaymentDetail(this.props.transections.available_balance)
                                            }
                                    }else{
                                        alert('You have no available Q-Funds')
                                    }
                                    }}    
                                    >
                                        <LightText style={{ color: colors.white}}>Cash out</LightText>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex:1, marginLeft:10}}>
                                <TouchableOpacity 
                                // disabled = {(this.props.transections)? (this.props.transections.available_balance > 1.5) ? false : true : false}
                                style={{ borderColor:colors.white, borderWidth:1, height:30, borderRadius:20, alignItems:'center', justifyContent:'center'}}
                                    onPress={()=>{
                                        if(this.props.transections && (this.props.transections.available_balance > 1.5)){
                                        this.props.navigation.navigate('CharityList')
                                        }else{
                                            alert('You have no available Q-Funds')
                                        }
                                    }}
                                >
                                    <LightText style={{ color: colors.white}}>Contribute</LightText>
                                </TouchableOpacity>
                                </View>
                                <View style={{flex:2}}/>
                            </View>
                        </View>
                        <View style={{ flex:3}}>
                            <View style={{height:50,paddingHorizontal:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <LightText>Recents</LightText>
                                <View style={{flexDirection:'row', width:150, alignItems:'center', justifyContent:'flex-end'}}>
                                {/* <LightText>Filter</LightText>
                                <Image
                                    source={require('../../assets/menu-Name.png')}
                                /> */}
                                </View>
                            </View>
                            <View style={{ flex:1}}>
                                {(this.props.transections.result) ? (
                                    <SectionList  
                                    sections={this.props.transections.result}  
                                    renderItem={this.renderItem} 
                                    ItemSeparatorComponent={this.itemSeparator} 
                                    renderSectionHeader={({section}) => <LightText style={{padding:10, backgroundColor:colors.lightGray}}>{section.title}</LightText>}  
                                    keyExtractor={(item, index) => index}
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={() => this.handleRefresh()}  
                                    /> 
                                ) : (null)}
                             
                            </View>
                            
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
                        {(this.state.isRefreshing)?(null):(<Loader loading={this.props.loading} />)}
                    </View>
            </View>
        )
    }

}

const mapStateToProps = state =>{
    return {
        loading: state.user.loading,
        transections: state.user.transections,
        payment_Detail: state.user.payment_Detail,
        stripeid:state.user.stripe_id
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        cashOutBalance:(navigation)=> cashOutBalance(dispatch, navigation),
        getCustomerTransections:(navigation) => getCustomerTransections(dispatch, navigation),
        paymentDetail:(amount, type, navigation) => paymentDetail(amount, type, dispatch, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);