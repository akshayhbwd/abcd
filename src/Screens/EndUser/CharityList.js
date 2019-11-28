import React, { Component } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { donate } from '../../store/actions/user';
import Header from '../../Components/Header';
import colors from '../../styles/colors';
import { LightText, BoldText } from "../../Components/styledTexts";
import { 
    getCharities,
    searchCharities,
    paymentDetail
 } from '../../store/actions/user';

class CharityList extends Component {
    constructor(){
        super();
        this.state = { 
            text: '',
            modalVisible: false,
            confirmAmount:'',
            selected:null,
            error:null
        };
    }

    componentDidMount() {
        this.props.getCharities(this.props.navigation)
      }

      getPaymentDetail(text) {
        this.props.paymentDetail(text, 'donate', this.props.navigation)
        this.setState({confirmAmount: text})
      }
      SearchFilterFunction(text) {
        if(text !== ''){
             this.props.searchCharities(text, this.props.navigation)
        }else{
             this.props.getCharities(this.props.navigation)
        }
        this.setState({text: text})
      }
    
      renderItem = (item) => {
          return (
              <View style={{ padding: 15}}>
                  <TouchableOpacity style={{ flexDirection:'row'}}
                    onPress={()=> this.setState({modalVisible:true, selected: item.item})}
                  >
                    <View style={{ marginHorizontal: 15, justifyContent:'space-around',  }}>
                             <BoldText style={{ color: colors.charcoal, fontWeight:'400', fontSize: 16}}>{`${item.item.charityName}`}</BoldText>

                            <LightText style={{ color: colors.gray,}}>{item.item.category}</LightText>
                    </View>
                  </TouchableOpacity>
              </View>
          )
      }
      empetyList =() =>{
        return (
        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 100 }}>
        <BoldText style={{ color: "grey", justifyContent: "center", fontSize: 20 }}>
            {" "}
            No coupons.
        </BoldText>
        </View>
        );
    }

 //Item sparator view
      ListViewItemSeparator = () => {
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
                    <BoldText style={{fontSize: 20, color: colors.appColor, fontWeight: '600', marginVertical: 10, alignSelf: 'center'}}> Donation Amount</BoldText>
                </View>
                <View style={{ borderStyle: 'dashed', borderWidth: .5 }}/>

                <View>
                <View style={{ marginVertical:20}}>
                    <LightText>Enter Donation Amount</LightText>

                <View style={{marginVertical:10, marginHorizontal:20, flexDirection:'row', padding:10, borderWidth:1, borderColor:colors.lightGray, borderRadius:5}}>
                    <View style={{justifyContent:'center'}}>
                        <LightText style={{fontSize:20}}>$</LightText>
                    </View>
                    <TextInput
                            autoCorrect={false}
                            returnKeyType='next'
                            placeholder="Enter Donation Amount"
                            keyboardType={'number-pad'}
                            placeholderTextColor={colors.lightGray}
                            fontSize={18}
                            onChangeText={(discount) => this.getPaymentDetail(discount)}
                            style={{ height: 30, marginLeft:2, width:'90%'}}
                        />
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

                      <LightText style={{ fontSize:12}}>Platform fee.</LightText>
                      <LightText style={{ fontSize:12}}>$ {this.props.payment_Detail.plateform_fee}</LightText>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>

                      <LightText style={{ fontSize:12}}>Total Amount: </LightText>
                      <LightText style={{ fontSize:12}}> $ {this.props.payment_Detail.total_amount}</LightText>
                   </View>
                    </View>
                        )}
                        <LightText style={{textAlign:'center', marginVertical:10, color:'red'}}>{(this.state.error != null)? this.state.error : ''}</LightText>
                        <LightText style={{textAlign:'center', marginVertical:10, color:colors.gray}}>{(this.state.selected != null)? this.state.selected.charityName : ''}</LightText>
                    </View>
                   </View>
                   <View style={{ borderStyle: 'dashed', borderWidth: .5 }}/>
                    <View style={{ flexDirection:'row', height:40}}>
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                            onPress={()=>{
                                this.setState({modalVisible:false, confirmAmount:'', error: null})
                            }}
                        >
                            <BoldText style={{color:colors.strongRed}}>Cancel</BoldText>
                        </TouchableOpacity>
                        <View style={{width:1, backgroundColor:colors.lightGray}}/>
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}
                            onPress={()=>{
                                
                                if(this.state.confirmAmount.length > 0){
                                this.setState({modalVisible:false})
                                this.props.donate(this.state.confirmAmount, this.state.selected.ein, this.state.selected.charityName, this.props.navigation)
                                }else{
                                    this.setState({error:'Please enter amount'})
                                }
                            }}
                        >
                            <BoldText style={{color:colors.appColor}}>Agree</BoldText>
                        </TouchableOpacity>
                    </View>
            </View>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }


    render() {
     return (
            <View style = {{ flex: 1}}>
                {/* <SafeAreaView style={{ flex: 1}}> */}
                <View style={{flex: .1}}>
                    <Header
                    leftNavigation={this.props.navigation}
                    color={colors.appColor}
                    value={'Search Charity'}
                    />
                </View>
                <View style={{ flex: 1 }}>
                
                <View style={{  }}>
                <View style={{ height: 50, backgroundColor:'#fff', marginHorizontal: 20, alignItems:'center', justifyContent:'center', marginTop: 10,borderRadius: 25,backgroundColor: '#FFFFFF',shadowColor: '#451B2D',shadowOffset: {width: 0, height: 3},shadowOpacity: 0.15, shadowRadius: 21, elevation: 3}}>
                            <View style={{ paddingLeft: 10,height: 40, flexDirection: 'row', alignItems:'center', marginHorizontal: 20}}>
                                <Image
                                    source={require('../../assets/search.png')}
                                    style={{ height: 20, width: 20, tintColor: 'gray'}}
                                />
                            <TextInput
                                style={{ flex:1, paddingLeft: 5}}
                                onChangeText={text => this.SearchFilterFunction(text)}
                                value={this.state.text}
                                placeholder={'Search'}
                                clearButtonMode={'always'}
                                />
                         </View>
                    </View>
                </View>

                <View style={{ marginVertical:10, marginHorizontal: 10, height:50, justifyContent:'center', backgroundColor:'rgb(249,249,249)'}}>
                    <BoldText style={{ color: colors.charcoal, fontWeight:'500'}}> List of Charities</BoldText>
                </View>
                <View style={{ flex: 1}}>
                <FlatList
                    data={this.props.charityList}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    renderItem={this.renderItem}
                    ListEmptyComponent = { this.empetyList}
                    keyExtractor={(item, index) => index.toString()}
                    />
                    </View>
                    <Loader loading={this.props.loading} />

                    <Modal animationType="fade" transparent={true} visible={this.state.modalVisible ? true : false}>
                            <TouchableWithoutFeedback onPress={() => {
                                this.setState({modalVisible: false,error:null})
                            }}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.67)', padding:15 }}>
                                    <TouchableWithoutFeedback>
                                        {this.renderModalContent()}
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        </View>
                {/* </SafeAreaView> */}
      </View>
    );
  }
}

const mapStateToProps = state =>{
    return {
        loading: state.user.loading,
        charityList : state.user.charityList,
        payment_Detail: state.user.payment_Detail
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        getCharities:(navigation) => getCharities(dispatch, navigation),
        searchCharities:(key, navigation) => searchCharities(key, dispatch, navigation),
        donate:(amount, ein, name, navigation)=>donate(amount, ein, name, dispatch, navigation),
        paymentDetail:(amount, type, navigation) => paymentDetail(amount, type, dispatch, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CharityList);