import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    Image,
    Modal,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Keyboard,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../../styles/colors';
import Header from '../../Components/Header';
import { LightText, BoldText } from "../../Components/styledTexts";
import {Button} from '../../Components/button';

class SuccessFull extends Component {
    constructor(){
        super();
        this.state = {
            obj: null
        }
    }
componentDidMount(){
    this.setState({obj: this.props.navigation.state.params.receipt})
}

    render(){
        return (
            <View style={{flex:1, justifyContent:'center', backgroundColor: colors.appColor}}>
            <SafeAreaView style={{ flex: 1}}>
            <View style={{flex: .1}}>
                <Header
                    leftNavigation={this.props.navigation}
                    headercolor={colors.appColor}
                    color={colors.white}
                />
            </View>
            <View style={{flex:1}}>
                <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                    <View style={{marginVertical:5, height:80, width:80, backgroundColor: colors.white, borderRadius:40, alignItems:'center', justifyContent:'center'}}>
                        <Image
                            source={require('../../assets/check-name.png')}
                        />
                    </View>
                    <View style={{marginVertical:5, marginHorizontal:20, alignItems:'center'}}>
                        <BoldText style={{color:colors.white}}>Funds Transferred Successfully</BoldText>
                        {/* <LightText style={{ textAlign:'center', color: colors.lightGray}}>It might take 2-4 hours to reflect in beneficiary account</LightText> */}
                    </View>
                    {(this.state.obj) && 
                    <Image
                    source={ (this.state.obj.image) ? ({uri: this.state.obj.image}) : require('../../assets/user-anticon.png')}
                    style={{height:80, width:80, borderRadius:40}}
                    resizeMode={'contain'}
                />
                    }
                    
                    <View style={{marginVertical:5}}>
                        {(this.state.obj) ? (
                        <LightText style={{color:colors.white}}>{`Transferred to ${this.state.obj.name}`}</LightText>
                        ) : (null)}
                        </View>
                    <View style={{marginVertical:5, paddingHorizontal:40, paddingVertical:10, borderColor:colors.lightGray, borderWidth:1, borderRadius:20}}>
                        <BoldText style={{color:colors.white}}>$ {this.state.obj ? this.state.obj.amount : ''}</BoldText>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View>
                        <Button
                            value={'Close'}
                            color={colors.white}
                            textStyle={{color:colors.appColor}}
                            onPress={() => this.props.navigation.popToTop()}
                        />
                    </View>
                </View>
            </View>
            </SafeAreaView>
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return {
        
    }
};
const mapDispatchToProps = dispatch =>{
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessFull);
