import React, {Component} from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { 
    Logo
} from '../Components/styledTexts';
import { OTP_SUCCESS } from '../store/ActionTypes';

class Splash extends Component{
    constructor(props){
        super(props);
    }
 
 async componentWillMount(){
        const userToken = await AsyncStorage.getItem('accessToken')
        if(userToken !== null){
            AsyncStorage.getItem('user').then((user) =>{
                user = JSON.parse(user);
                console.log(JSON.stringify(user))
                this.props.updateLocalData(user);
                 if(user.is_business_account === 0){
                    if(user.first_name === ""){
                        this.props.navigation.navigate('Registration')
                    }else{
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'endUserTabNavigator' })],
                      });
                      this.props.navigation.dispatch(resetAction);
                    }
                }else{
                    if(user.business_name === null){
                        this.props.navigation.navigate('BRegistration')
                    }else if(user.stripe_id === null){
                        this.props.navigation.navigate('AddCard', {formPaymentTo: false});
                    }else{
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'marchantTabNavigator' })],
                          });
                          this.props.navigation.dispatch(resetAction);
                    }
                } 
            })
        }else{
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'drawerNavigation' })],
              });
              
              this.props.navigation.dispatch(resetAction);
        }
    }

    render(){
        return(
            <LinearGradient colors={['#FFF', '#FFF']} style={{flex: 1}}>
                <View style={{ flex: 1, alignItems:'center', justifyContent:'center'}}>
                 <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Logo
                        // isWhite={true}
                    />
                </View>
                <View style={{ flex: 1}}/>
               </View>
            </LinearGradient>
        )
    }
}

const mapStateToProps = state =>{
    return {
       
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateLocalData:(user) =>{
            dispatch({
                type: OTP_SUCCESS,
                payload: user
            });
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);