import React, { Component } from "react";
import {
  View,
  ScrollView,
  SafeAreaView
} from "react-native";
import { connect } from 'react-redux';
import colors from '../../styles/colors';
import Header from '../../Components/Header';
import { Button } from '../../Components/button';
import { CreditCardInput } from "react-native-credit-card-input";
import Stripe from 'react-native-stripe-api';
import { saveCardToken } from '../../store/actions/user';
import { LightText } from "../../Components/styledTexts";
import { live_apiKey,dev_apiKey} from '../../Components/API'

const client = new Stripe(live_apiKey);

class AddCard extends Component {
    constructor() {
      super();
      this.state = {
          cardValue: null,
          formPaymentTo: null
      }
    }
    componentDidMount(){
        this.setState({formPaymentTo: this.props.navigation.state.params.formPaymentTo})
    }
   async addCard(){
    //    console.log(JSON.stringify(this.state.cardValue.values))
       if(this.state.cardValue != null){
       let expiry = this.state.cardValue.values.expiry.split('/')
       console.log(expiry)
        const token = await client.createToken({
            number: this.state.cardValue.values.number ,
            exp_month: expiry[0], 
            exp_year: expiry[1], 
            cvc: this.state.cardValue.values.cvc,
         });

         if (token.error){
             alert(token.error.code)
         }else{
             this.props.saveCardToken(token.id, token.card.id,  this.state.formPaymentTo, this.props.navigation)
         }
        }else{
            alert('Please enter card details')
        }
    }

    render(){
        return (
          <View style = {{ flex: 1}}>
                <View style={{flex: 0.09, backgroundColor: colors.appColor}}>
                        <Header
                        headercolor={colors.appColor}
                        color={colors.white}
                        value={'Payment Card'}
                        leftNavigation={(this.state.formPaymentTo) ? this.props.navigation : null}
                        />
                    </View>
                    <ScrollView style={{ flex: 1}}>
                        <SafeAreaView style={{ flex: 1}}>
                        <View style={{ marginVertical: 20 }}>
                            <CreditCardInput 
                            requiresName = {true}
                            requiresPostalCode={true}
                            horizontal={false}
                            labels={{name:`CARDHOLDER'S NAME`, expiry:'Expire', number:'CARD NUMBER', cvc:'CVC/CCV', postalCode:'ZIP CODE' }}
                            onChange={(value)=>{
                                this.setState({cardValue: value})
                            }} />
                        </View>
                        <View style={{flex: 1 }}>
                            <Button
                                    style={{marginVertical: 20}}
                                    value={'Add card'}
                                    color={colors.appColor}
                                    Light={true}
                                    textStyle={{fontSize: 20}}
                                    onPress ={() =>{this.addCard()}}
                                />
                            </View>
                            <View style={{flex: 1 }}>
                                <Button
                                    style={{marginVertical: 0}}
                                    value={'Add card later'}
                                    color={colors.appColor}
                                    Light={true}
                                    textStyle={{fontSize: 20}}
                                    onPress ={() =>{
                                        if(this.state.formPaymentTo){
                                            this.props.navigation.goBack();
                                        }else{
                                        this.props.navigation.navigate('marchantTabNavigator')
                                        }
                                    }}
                                />
                            </View>
                            <View style={{ paddingVertical: 50, paddingHorizontal: 50, alignItems:'center', justifyContent: 'space-between'}}>
                                <LightText style={{ textAlign: 'center'}}>This card will be used to make cash back transactions.</LightText>
                            </View>
                            <View style={{height: 50}}/>
                            </SafeAreaView>
                    </ScrollView>
                    <Loader loading={this.props.loading} />
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return{
        user: state.user,
        loading: state.user.loading,
    }
  };
  
  const mapDispatchToProps = dispatch =>{
    return {
        saveCardToken:(token, card_id, formPaymentTo, navigation) => saveCardToken(token, card_id, formPaymentTo, dispatch, navigation)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);