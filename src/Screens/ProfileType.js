import React, { Component } from "react";
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import { selectUserType } from '../store/actions/user';
import { 
    Logo,
    BoldText,
    LightText
} from '../Components/styledTexts';
import colors from '../styles/colors';
import {
    Button,
    OptionButton
} from '../Components/button';

class ProfileType extends Component {
    constructor(){
        super();
    }

    render(){
        return (
            <View style={{ flex:1, backgroundColor: colors.white }}>
                <View style={{ flex:1, justifyContent:'flex-end'}}>
                    <Logo style={{ color: colors.appColor}}/>
                </View>
                <View style={{ flex:.5 }}/>
                <View style={{ flex:1.5, alignItems:'center', justifyContent:'space-between'}}>
                    <BoldText style={{ color: colors.appColor}}> Choose Option </BoldText>
                    <LightText style={{ color: colors.gray, fontSize: 18, textAlign: 'center' }}>{'Do you want to open \n business account'}</LightText>
                    <View style={{ height: 50, marginHorizontal:50, flexDirection:'row', alignItems:'center', backgroundColor: colors.white, borderRadius: 25,backgroundColor: '#FFFFFF',shadowColor: '#451B2D',shadowOffset: {width: 0, height: 5},shadowOpacity: 0.10, shadowRadius: 21}}>
                        <OptionButton
                            style={{ flex: 1 }}
                            value={'No'}
                            active= { (this.props.userType === 0) ? true : false }
                            color={colors.appColor}
                             onPress={ () => this.props.selectUserType(0)}
                        />
                        <View style={{width:2, height:40, backgroundColor:colors.lightGray}}/>
                        <OptionButton
                            style={{ flex: 1 }}
                            value={'Yes'}
                            active= {(this.props.userType === 1) ? true : false }
                            color={colors.appColor}
                             onPress={ () => this.props.selectUserType(1)}
                        />
                    </View>
                </View>
                <View style={{ flex:2, justifyContent:'center' }}>
                <Button
                    value={'Continue'}
                    color={colors.appColor}
                    onPress ={() =>{
                        if(this.props.userType === 0){
                            this.props.navigation.navigate('Registration')
                        }else{
                            this.props.navigation.navigate('BRegistration')
                        }
                    }}
                    />
                </View>
            </View>
        )
    }
}


const mapStateToProps = state =>{
    return {
        userType: state.user.userType
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        selectUserType:(userType) =>selectUserType(userType, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileType);