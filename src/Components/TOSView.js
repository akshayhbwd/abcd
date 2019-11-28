
import React,{Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { BoldText, LightText } from '../Components/styledTexts';
import Colors from '../styles/colors';

export class TOSView extends Component {
    render(){
    return(

        <View style={{
            marginHorizontal:'5%',
            marginTop:20,
        }}>

            <TouchableOpacity onPress={this.props.action}>
                <BoldText style={{
                    textDecorationLine:'underline',
                    fontSize:16,
                    color:Colors.charcoal,
                }}>{this.props.title}
                </BoldText>
            </TouchableOpacity>
            <LightText style={{
                fontSize:14,
                marginTop:10,
                textAlign:'justify'
            }}>{this.props.detailText}
            </LightText>
                
        </View>
    )
        }
}

export class TOSViewWithBox extends Component {
    render(){
    return(

        <View style={{
            marginHorizontal:'5%',
            marginTop:20,
            borderColor:'gray',
            borderWidth:1,
            alignItems:'center',
            padding:5
        }}>
            <LightText style={{fontStyle: 'italic'}}>{`${this.props.title}: `}
            <LightText style={{
                fontSize:14,
                color:'gray',
                textAlign:'justify'
            }}>{this.props.detailText}
            </LightText>
            </LightText>
                
        </View>
    )
        }
}