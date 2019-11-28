import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { 
    scanQRCode
 } from '../../store/actions/coupons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import colors from '../../styles/colors';
import Loader from '../../Components/Loader';
import Header from '../../Components/Header';

class ScanQR extends Component {
    constructor(){
        super();
        this.state={
            focusedScreen:false
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
        this.setState({ focusedScreen: true })
        );
        navigation.addListener('willBlur', () =>
        this.setState({ focusedScreen: false })
        );
        }
  
    render(){
        const { focusedScreen } = this.state;
        return (
            <View style={{flex:1 }}>
                    <View style={{flex: .1, backgroundColor: colors.appColor}}>
                        <Header
                        headercolor={colors.white}
                        color={colors.black}
                        value={'Scan QR Code'}
                        />
                    </View>

                    <View style={{ flex:1, backgroundColor:'#fff' }}>
                        {focusedScreen&&<QRCodeScanner
                            ref={(node) => { this.scanner = node }}
                            onRead={(e)=> this.props.scanQRCode(e.data, this.props.navigation)}
                            bottomContent={
                            <TouchableOpacity style={styles.buttonTouchable}
                            onPress={()=>{
                                this.scanner.reactivate();
                            }}
                            >
                                <Text style={styles.buttonText}>Rescan</Text>
                            </TouchableOpacity>
                            }
                        />}
                     </View>
                     <Loader loading={this.props.loading} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
    },
    textBold: {
      fontWeight: '500',
      color: '#000',
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
      padding: 16,
    },
  });

const mapStateToProps = state =>{
    return {
        loading: state.coupon.loading
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        scanQRCode:(code, navigation) => scanQRCode(code, dispatch, navigation),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanQR);
