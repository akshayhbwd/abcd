import React, { Component } from "react";
import {
    View,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../../Components/Header';
import colors from '../../styles/colors';
import { WebView } from 'react-native-webview';
import {  SaveStripeCode } from "../../store/actions/user"
import { Stripekey_Test, Stripekey_final} from '../../Components/API'


class WebViewScreen extends Component {
    constructor(){
        super();
        this.state = { 
          StripeCode:null,
          urlFinal:`https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${Stripekey_final}&scope=read_write&redirect_uri=https://app.myqfunds.com/create-express-connect`
        };
    }

  async  componentDidMount() {
        if(this.props.first_name && this.props.last_name && this.props.phone_number && this.props.email_address){
          var url = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${Stripekey_final}&scope=read_write&stripe_user[country]=us&stripe_user[email]=${this.props.email_address}&stripe_user[phone_number]=${this.props.phone_number}&stripe_user[first_name]=${this.props.first_name}&stripe_user[last_name]=${this.props.last_name}&redirect_uri=https://app.myqfunds.com/create-express-connect#/`;
          console.log(url)
          this.setState({
            urlFinal:url
          },()=>{
            console.log(url)
          })
          
        }
  if(this.props.navigation.state.params.url){
    this.setState({urlFinal: this.props.navigation.state.params.url})
  }

      }
      _onNavigationStateChange(webViewState){
        console.log(webViewState.url);
        var regex = /[?&]([^=#]+)=([^&#]*)/g;
       var params = {};
       var match;
   
      console.log(params)
      var redirect_url ='https://app.myqfunds.com';
      var pathArray = webViewState.url.split('/')
      var protocol = pathArray[0];
      var host = pathArray[2];
      var url = protocol + '//' + host;
      
      if(url === redirect_url){
        while (match = regex.exec(webViewState.url)) {
          params[match[1]] = match[2];
          console.log("------------------",webViewState.url)
          if(match[1] === 'code'){
            this.setState({
              StripeCode: match[2]
            },()=>{
              console.log(webViewState.url,this.state.StripeCode)
            })
           
          }
        }
        console.log("match url ",url)
        console.log(this.state.StripeCode)
      if(this.state.StripeCode) { this.props.SaveStripeCode({code:this.state.StripeCode},this.props.navigation)}
      }
      // setTimeout(() => {
      //   this.props.SaveStripeCode({code:match[2]},this.props.navigation)
      // }, 4000);
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
                    value={'Stripe'}
                    />
                </View>
                <View style={{ flex: 1}}>
                <WebView 
                incognito={true}
                source={{ uri: this.state.urlFinal }} 
                ref="webview"
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                javaScriptEnabled = {true}
                domStorageEnabled = {true}
                injectedJavaScript = {this.state.cookie}
                startInLoadingState={false}
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
         loading: state.coupon.loading,
         first_name: state.user.first_name,
         last_name: state.user.last_name,
         phone_number:state.user.phone_number,
         email_address:state.user.email_address
    }
};
const mapDispatchToProps = dispatch =>{
    return {
     SaveStripeCode:(body,navigation)  => SaveStripeCode(body,dispatch,navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WebViewScreen);