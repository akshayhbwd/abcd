import React, {Component} from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';

export class BoldText extends Component {
    render() {
        let {
            style
        } = this.props;
        if (style == null || style === undefined) {
            style = {}
        }
        return (<Text style={[{fontWeight: 'bold', color: '#212224', fontSize: 20} ,style]} numberOfLines={this.props.numberOfLines}>{this.props.children}</Text>);
    }
}

export class LightText extends Component {
    render() {
        let {
            style
        } = this.props;
        if (style == null || style === undefined) {
            style = {}
        }
        return (<Text style={[{color: '#585858'}, style]}
                    onPress={this.props.onPress}
                      numberOfLines={this.props.numberOfLines ? this.props.numberOfLines : null}>{this.props.children}</Text>);
    }
}

export class Logo extends Component {
    render(){
        let {
            style
        } = this.props;
        if(style == null || style === undefined){
            style = {}
        }
        return (
            <View style={{ alignItems:'center', justifyContent:'center'}}>
                {this.props.isWhite ? (
                    <Image
                    source={require('../assets/qfunds-white.png')}
                    style={{ height: 200, width: 200}}
                    />
                ) : (
                    <Image
                    source={require('../assets/Qfunds.png')}
                    style={{ height: 200, width: 200}}
                    />
                )}

            </View>
        )
    }
}