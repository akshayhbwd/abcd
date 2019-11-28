import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import {BoldText} from '../Components/styledTexts';
import colors from '../styles/colors';

export default Header = (props) => {
    return (
        <View style={{flex:1}}>
          <View style={[{ flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end', backgroundColor: props.backgroundColor ? props.backgroundColor : colors.appColor},Platform.OS==="android"?{alignItems:'center',}:{alignItems:'flex-end',}]}>
          <View style={{ paddingVertical:10, flex: 0.5, alignItems:'center', justifyContent:'center'}}>
            {props.leftNavigation ? (
            <TouchableOpacity
              onPress={() => {
                  props.leftNavigation.goBack(null);
              }}
            >
              <Image style={{height: 25, width: 25, marginLeft: 10, tintColor:'#fff'}}
                      resizeMode='contain'
                      source={require('../assets/arrow.png')}
              />
            </TouchableOpacity>
            ) : (null)}
            {props.drawer ? (
            <TouchableOpacity
              onPress={() => {
                  props.drawer.dispatch(DrawerActions.toggleDrawer())
              }}
            >
              <Image
                source={require('../assets/menu.png')}
                style={{ height: 20, width: 25, marginBottom: 2, tintColor:'#fff'}}
              />
            </TouchableOpacity>
            ) : (null)}
            </View>
            <View style={{ flex: 2, alignItems:'center', justifyContent:'center', paddingVertical:10 }}>
                <BoldText style={{color: '#FFF', fontSize: 20,}}>{props.value}</BoldText>
           </View>
          <View style={{flex: 0.5}}>
          {props.rightIcon ? (
            <TouchableOpacity
             onPress={()=> {
               props.onPressRight()}}
            >
              <Image style={{height: 25, width: 25, marginLeft: 5, tintColor: props.color}}
                      resizeMode='contain'
                      source={props.rightIcon}
              />
            </TouchableOpacity>
          ) : (null)}

          </View>
          </View>
        {/* <View style={{marginTop: 5, height: 1, backgroundColor: colors.lightGray}}/> */}
        </View>
    )
}