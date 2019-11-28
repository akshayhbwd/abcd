import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { storeByLocation} from '../../store/actions/coupons';
import { 
    Logo, LightText
} from '../../Components/styledTexts';
import MapView, {Marker, Callout, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import Header from '../../Components/Header';
import colors from '../../styles/colors';
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');

const { height, width} = Dimensions.get('screen')

class Locations extends Component {
    constructor(){
        super();
        this.state = {
            latitude: 28.457523,
            longitude: 77.026344,
            searchText:'',
        };
    }

    componentDidMount(){
                //  this.props.storeByLocation(this.state.latitude, this.state.longitude);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                this.props.storeByLocation(position.coords.latitude, position.coords.longitude, '');
            },
            (error) => {
                console.log('error', error)
                // alert(error.message)
                this.setState({error: error.message})
        },
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
        );

        this.props.navigation.addListener('willFocus', () =>{
            this.setState({
             searchText: ''
            })
            this.props.storeByLocation(this.state.latitude, this.state.longitude, '');
         });
    }

    

    render(){
        let {latitude, longitude} = this.state;
        return (
            <View style = {{ flex: 1}}>
                
                    <View style={{flex: .1}}>
                        <Header
                        leftNavigation={this.props.navigation}
                        color={colors.appColor}
                        value={'Businesses in your area'}
                        />
                    </View>
                    <View style={{}}>
                <View style={{ height: 50, backgroundColor:'#fff', marginHorizontal: 20, alignItems:'center', justifyContent:'center', marginTop: 10,borderRadius: 25,backgroundColor: '#FFFFFF',shadowColor: '#451B2D',shadowOffset: {width: 0, height: 3},shadowOpacity: 0.15, shadowRadius: 21, elevation: 3}}>
                            <View style={{ paddingLeft: 10,height: 40, flexDirection: 'row', alignItems:'center', marginHorizontal: 20}}>
                                <Image
                                    source={require('../../assets/search.png')}
                                    style={{ height: 20, width: 20, tintColor: 'gray'}}
                                />
                            <TextInput
                                style={{ flex:1, paddingLeft: 5}}
                                 onChangeText={text => this.props.storeByLocation(this.state.latitude, this.state.longitude, text)}
                                value={this.state.text}
                                placeholder={'Search EcoChecks'}
                                clearButtonMode={'always'}
                                />
                                <TouchableOpacity
                                    onPress={()=> this.props.navigation.goBack()}
                                >
                                <Image
                                    source={require('../../assets/couponTab.png')}
                                    style={{ height: 20, width: 20, tintColor: colors.appColor}}
                                    resizeMode={'contain'}
                                />
                                </TouchableOpacity>
                         </View>
                    </View>
                    <View style={{marginTop: 15, height: 1, backgroundColor: colors.lightGray}}/>
                </View>
                    
                    <View style={{ flex: 1}}>
                    <MapView
                    key={this.props.nearStore}
                        style={{flex: 1}}
                        provider={PROVIDER_GOOGLE}
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0722,
                            longitudeDelta: 0.0221,
                        }}
                    >
                        <Circle center={{latitude: this.state.latitude, longitude: this.state.longitude}} radius={300}
                            fillColor={colors.appColor} strokeColor={'transparent'}/>
                        <Marker coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}}
                />

        { (this.props.nearStore.length > 0) ? (
            this.props.nearStore.map((item, key) => {
                console.log(item)
               return (
                    <Marker coordinate={{latitude: item.lat, longitude: item.lng}}
                          title={item.business_name}
                          description={item.business_address}
                          icon={item.image}
                          key={item.id}
                    >
                        <Callout
                        onPress={()=> this.props.navigation.navigate('CouponDetail',{storeId:item.id})}
                        >
                            <View style={{ height: 80, width: 100, flexDirection:'row'}}>
                            <View style={{ alignItems: 'center', justifyContent:'center', marginHorizontal: 2}}>
                            <Image
                                source={{uri: item.coupon.image}}
                                style={{ height: 50, width: 100, }}
                                resizeMode = {'cover'}
                            />
                            <LightText style={{ maxWidth: 100, fontSize: 12}}
                                numberOfLines={2}
                            >{item.coupon.store_description}</LightText>
                            </View>
                            </View>
                        </Callout>

                    </Marker>
               )
             })
        ):(null)
            }
            </MapView>

                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    marker: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 5,
        borderColor: '#4191AA'
    },
    searchBar: {
      paddingLeft: 10,
      fontSize: 16,
      height: 40,
    }
  });
const mapStateToProps = state =>{
    return {
        nearStore: state.coupon.nearStore
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        storeByLocation:(lat, lng, text) => storeByLocation(lat, lng, text, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);