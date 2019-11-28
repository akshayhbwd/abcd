import React, {Component}  from "react";
import { 
  TouchableOpacity,
  Image,
  View
 } from "react-native";
import {BoldText, LightText} from '../Components/styledTexts';

export class Button extends Component {
  render(){
  return (
    <TouchableOpacity
              style={[{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 45,
                  borderRadius: 22.5,
                  backgroundColor: this.props.color,
                  marginHorizontal:10 ,
                  marginVertical: 40 
                  }, this.props.style]}
                  onPress = {this.props.onPress}
          >
            {this.props.Light ? (
              <LightText style={[{color: 'white', fontSize: 16}, this.props.textStyle]}>{this.props.value}</LightText>
            ): (
              <BoldText style={[{color: 'white'}, this.props.textStyle]}>{this.props.value}</BoldText>
            )
          }
              
         </TouchableOpacity>
  ) 
  }
};
export class OptionButton extends Component {
  render(){
    return (
      <View style={this.props.style}>
      <TouchableOpacity style={{ padding: 10, height: 40, flexDirection: 'row', alignItems:'center', justifyContent:'space-evenly'}}
               onPress={()=> this.props.onPress()}
            >
              <LightText style={{ fontSize: 18, color: (this.props.active) ? this.props.color : 'gray' }}>{this.props.value}</LightText>
              <Image
                style={{ marginLeft: 5 , height: 15, width: 15, tintColor: (this.props.active) ? this.props.color: 'gray'}}
                source={(this.props.active) ? require('../assets/check.png') : require('../assets/uncheck_button.png')}
              />
            </TouchableOpacity>
      </View>
  )
  }
};
