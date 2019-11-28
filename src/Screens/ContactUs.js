import React, { Component } from "react";
import {
    View,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import colors from '../styles/colors';
import { WebView } from 'react-native-webview';

class ContactUS extends Component {
    constructor(){
        super();
    }

      renderLoadingView() {
        return (
          <View style={{backgroundColor: 'rgba(245,245,245, 0.7)',
          height: Dimensions.get('window').height,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignSelf: 'center',
          justifyContent: 'center'}}>
          <ActivityIndicator size="large" color='rgb(54,122,223)' />
      </View>
        );
    }
    render() {
     return (
            <View style = {{ flex: 1}}>
                <View style={{flex: .1}}>
                    <Header
                    leftNavigation={this.props.navigation}
                    color={colors.appColor}
                    value={'Contact Us'}
                    />
                </View>
                <View style={{ flex: 1}}>
                <WebView 
                incognito={true}
                source={{ uri: 'https://www.myqfunds.com/' }} 
                ref="webview"
                startInLoadingState={true}
                renderLoading={this.renderLoadingView}
                />
                </View>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactUS);