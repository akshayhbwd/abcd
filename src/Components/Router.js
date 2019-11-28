import React from 'react';
import {Image, View, SafeAreaView} from 'react-native';
import {
    createAppContainer,
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
 import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import colors from '../styles/colors';
import Splash from '../Screens/Splash';
import ProfileType from '../Screens/ProfileType';
import ListOfCoupons from '../Screens/EndUser/ListOfCoupons';
import Locations from '../Screens/EndUser/Locations';
import CouponDetail from '../Screens/EndUser/CouponDetail';
import Login from '../Screens/Login';
import Verification from '../Screens/Verification';
import Registration from '../Screens/EndUser/Registration';
import BRegistration from '../Screens/Merchant/BRegistration';
import MAccount from '../Screens/Merchant/MAccount';
import ScanQR from '../Screens/Merchant/ScanQR';
import SuccessFull from '../Screens/Merchant/SuccessFull';
import PaymentTo from '../Screens/Merchant/PaymentTo';
import MProfile from '../Screens/Merchant/MProfile';
import MEditProfile from '../Screens/Merchant/MEditProfile';
import MyCoupons from '../Screens/EndUser/MyCoupons';
import MyCouponDetail from '../Screens/EndUser/MyCouponDetail';
import Account from '../Screens/EndUser/Account';
import CharityList from '../Screens/EndUser/CharityList';
import Profile from '../Screens/EndUser/Profile';
import EditProfile from '../Screens/EndUser/EditProfile';
import AddCard from '../Screens/Merchant/AddCard';
import TOS from '../Screens/TOS';
import WebViewScreen from '../Screens/EndUser/WebViewScreen';
import ContactUs from '../Screens/ContactUs';

export const loginNavigationOptions = createStackNavigator(
    {
        Login: { screen: Login },
        Verification:{ screen: Verification },
        ProfileType:{ screen: ProfileType },
        Registration:{ screen: Registration },
        BRegistration:{ screen: BRegistration },
        AddCard: { screen: AddCard},
        TOS:{ screen:TOS },
    },
    { headerMode: 'none' }
);


export const couponsNavigationOptions = createStackNavigator(
    {
        ListOfCoupons:{ screen: ListOfCoupons },
        Locations:{ screen: Locations },
        CouponDetail:{ screen: CouponDetail },
        },
        { headerMode: 'none' }
    );

export const myCouponsNavigationOptions = createStackNavigator(
    {
        MyCoupons:{ screen: MyCoupons },
        MyCouponDetail:{ screen: MyCouponDetail },
        },
        { headerMode: 'none' }
);

export const profileNavigationOptions = createStackNavigator(
    {
        Profile:{ screen: Profile },
        EditProfile:{ screen: EditProfile },
        WebViewScreen:{ screen: WebViewScreen},
        },
        { headerMode: 'none' }
 );
export const accountNavigationOptions = createStackNavigator(
    {
        Account:{ screen: Account },
        CharityList:{ screen: CharityList },
        SuccessFull:{ screen: SuccessFull },
        WebViewScreen:{ screen: WebViewScreen},
        },
        { headerMode: 'none' }
 );



  
    export const endUserTabNavigator = createBottomTabNavigator(
        {
            Booklet:{
                screen: myCouponsNavigationOptions,
                navigationOptions:{
                    tabBarIcon: ({tintColor}) =>{
                        return(
                            <Image
                            source = {require('../assets/couponTab.png')}
                            style = {{tintColor:tintColor}}
                            />
                        )
                    }
                }
            },
            Search:{
                screen: couponsNavigationOptions,
                navigationOptions:{
                    tabBarIcon: ({tintColor}) =>{
                        return(
                            <Image
                            source = {require('../assets/search.png')}
                            style = {{tintColor:tintColor}}
                            />
                        )
                    }
                }
            },
            'Q-Funds':{
              screen: accountNavigationOptions,
              navigationOptions:{
                  tabBarIcon: ({tintColor}) =>{
                      return(
                          <Image
                          source = {require('../assets/wallet.png')}
                          style = {{tintColor:tintColor}}
                          />
                      )
                  }
              }
          },
          Profile:{
            screen: profileNavigationOptions,
            navigationOptions:{
                tabBarIcon: ({tintColor}) =>{
                    return(
                        <Image
                        source = {require('../assets/user-anticon.png')}
                        style = {{tintColor:tintColor}}
                        />
                    )
                }
            }
        }
        },
        {
            initialRouteName: 'Booklet',        
            tabBarOptions: {
                activeTintColor: colors.appColor,
                inactiveTintColor: colors.gray,
                showLabel: true,
                showIcon: true,
                tabBarPosition: 'bottom',
                labelStyle: {
                    fontSize: 12,
                },
                iconStyle:{
                    width: 30,
                    height: 30
                },
                style: {
                    backgroundColor: 'rgb(245,245,245)',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ededed',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                },
                lazy: true,
                indicatorStyle: '#fff',
            }
        }
      );

      // Marchent
      export const ScanNavigationOptions = createStackNavigator(
        {
            ScanQR:{
                screen: ScanQR
            },
            PaymentTo:{
                screen: PaymentTo
            },
            SuccessFull:{
                screen: SuccessFull
            },
            AddCard:{ screen: AddCard}
            },{
            headerMode: 'none'
            }
        );

        export const MProfileNavigationOptions = createStackNavigator(
            {
                MProfile:{
                    screen: MProfile
                },
                MEditProfile:{
                    screen: MEditProfile
                },
                AddCard:{ screen: AddCard}
                },{
                headerMode: 'none'
                }
            );

     export const marchantTabNavigator = createBottomTabNavigator(
        {
            Account:{
                screen: MAccount,
                navigationOptions:{
                    tabBarIcon: ({tintColor}) =>{
                        return(
                            <Image
                            source = {require('../assets/wallet.png')}
                            style = {{tintColor:tintColor}}
                            />
                        )
                    }
                }
            },
            ScanQR:{
                screen: ScanNavigationOptions,
                navigationOptions:{
                    tabBarIcon: ({tintColor}) =>{
                        return(
                            <Image
                            source = {require('../assets/scane.png')}
                            style = {{tintColor:tintColor}}
                            />
                        )
                    }
                }
            },
            Profile:{
              screen: MProfileNavigationOptions,
              navigationOptions:{
                  tabBarIcon: ({tintColor}) =>{
                      return(
                          <Image
                          source = {require('../assets/user-anticon.png')}
                          style = {{tintColor:tintColor}}
                          />
                      )
                  }
              }
          },
        },
        {
            initialRouteName: 'ScanQR',        
            tabBarOptions: {
                activeTintColor: colors.appColor,
                inactiveTintColor: colors.gray,
                showLabel: true,
                showIcon: true,
                tabBarPosition: 'bottom',
                labelStyle: {
                    fontSize: 12,
                },
                iconStyle:{
                    width: 30,
                    height: 30
                },
                style: {
                    backgroundColor: 'rgb(245,245,245)',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ededed',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                },
                lazy: true,
                indicatorStyle: '#fff',
            }
        }
      );


      export default drawerNavigation = createDrawerNavigator({
        //   Home: { screen: couponsNavigationOptions},
        //   Login: { screen: loginNavigationOptions},

        Home: couponsNavigationOptions,
        Login: loginNavigationOptions,
        'Create business account': loginNavigationOptions,
        'Contact Us' : ContactUs
      }, {
        initialRouteName: 'Home',
        contentOptions: {
        activeTintColor: '#e91e63',
        },
      });


export const appNavigationOptions = createStackNavigator(
    {
        // AddCard:{ screen: AddCard},
        Splash:{
            screen: Splash
        },
        couponsNavigationOptions: {
            screen: couponsNavigationOptions
        },
        loginNavigationOptions:{
            screen:loginNavigationOptions
        },
        endUserTabNavigator:{
            screen: endUserTabNavigator
        },
        marchantTabNavigator:{
            screen: marchantTabNavigator
        },
        drawerNavigation:{
            screen: drawerNavigation
        }
    },{
        headerMode: 'none'
    }
);

export const AppContainer = createAppContainer(appNavigationOptions);