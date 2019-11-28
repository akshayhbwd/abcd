import React, { Component } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { 
    fetchMyCoupons,
    deleteCouponFromCart
 } from '../../store/actions/coupons';
import Header from '../../Components/Header';
import { SafeAreaView } from "react-navigation";
import colors from '../../styles/colors';
import General from '../../styles/General';
import { LightText, BoldText } from "../../Components/styledTexts";
import { SwipeListView } from 'react-native-swipe-list-view';


const { width, height } = Dimensions.get('window')



class MyCoupons extends Component {
    constructor(){
        super();
        this.state={
            refreshing:false,
            logoHeight:0
        }
    }

    componentDidMount() {
        this.props.fetchMyCoupons(this.props.navigation)
      }

      handleRefresh = async () => {
        if (this.state.refreshing)
          return;
          this.props.fetchMyCoupons(this.props.navigation)
      };

      renderItem = (item) => {
          return (
              <View style={{paddingHorizontal:10}}>
              <View style={{ marginVertical:10, height:150, borderRadius: 10,
                borderColor:'lightgray', borderWidth:0.3, zIndex:-90,  elevation: 5,
                shadowColor: '#999666', shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.7, shadowRadius: 5,
                width:'100%',
                backgroundColor:'white',}}>
                        <TouchableOpacity style={{ flexDirection:'row', flex: 1,justifyContent:'space-between'}}
                             onPress={()=>{this.props.navigation.navigate('MyCouponDetail',{couponId:item.item.id})}}
                         >
                        <View style={{width:'29%', borderRightColor:'#d3d3d3', borderRightWidth:0.5, alignItems:'center', justifyContent:'center'}} 
                        onLayout={(event) => {
                            var {x, y, width, height} = event.nativeEvent.layout;
                             this.setState({logoHeight:width})
                            }}
                        >
                        <Image
                                        source={{uri:item.item.store_image}}
                                        style={{ width: this.state.logoHeight-10, height: this.state.logoHeight-10, borderRadius: (this.state.logoHeight-10) / 2}}
                                        resizeMode={'cover'}
                                    />
                            </View>

                        <View style={{ width:'69%'}}>
                            <LightText style={{textAlign:'center',padding:5, fontSize:15, fontWeight:'bold'}}>{`${item.item.coupon_title}`}</LightText>

                            <View style={{ flex:1, flexDirection:'row' }}>
                                
                                <View style={{ flex: 2,  }}>
                                    <View style={{flex:.5}}/>
                                    <View style={{ alignItems:'center'}}>
                                  <BoldText style={{ color: colors.appColor, fontSize: 30}}>{item.item.coupon_description}</BoldText>
                                  <BoldText style={{ color: colors.appColor, fontSize: 24}}>Cash Back</BoldText>
                                 </View>
                                    <View style={{flex:.5}}/>
                                </View>
                                <View style={{ flex: 1}}>
                                <Image
                                        source={{uri:item.item.image}}
                                        style={{ width:'100%', height:'70%'}}
                                        resizeMode={'stretch'}
                                    />  
                                    </View> 
                            </View>                                 
                                <LightText style={{textAlign:'justify',padding:5,  fontSize:12, marginBottom:5 }}>{`${item.item.store_description}`}</LightText>
                        </View>
                        <View style={{flex:.2}}/>
                    </TouchableOpacity>
              </View>
              </View>
          )
      }

      empetyList =() =>{
        return (
        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 100 }}>
        <BoldText style={{ color: "grey", justifyContent: "center", fontSize: 20 }}>
            {" "}
            No EcoChecks.
        </BoldText>
        </View>
        );
    }
    onRowDidOpen = (rowKey, rowMap) => {
        console.log('This row opened', rowKey);
        setTimeout(() => {
            this.closeRow(rowMap, rowKey);
        }, 2000);
   }
   closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }


    render() {
     return (
            <View style = {{ flex: 1}}>
                {/* <SafeAreaView style={{ flex: 1}}> */}
                <View style={{flex: .1}}>
                    <Header
                    color={colors.appColor}
                    value={'My EcoChecks'}
                    />
                </View>

                <View style={{ flex: 1,alignItems:'center',paddingHorizontal:0,paddingVertical:7.5}}>
                
                <SwipeListView
                useFlatList
            data={this.props.myCouponsList}
            renderItem={this.renderItem}
            stopLeftSwipe={-1}
            renderHiddenItem={ (data, rowMap) => (

                <View style={{alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
               paddingLeft: 15}}>
                    <BoldText>Left</BoldText>
                    <TouchableOpacity style={{ marginRight: 6}}
                    onPress={()=>{ this.props.deleteCouponFromCart(data.item.id, this.props.navigation)}}
                    >
                    <BoldText style={{ color: 'red', marginRight: 3}}>Delete</BoldText>
                    </TouchableOpacity>
                </View>
            )}
            rightOpenValue={-90}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={this.onRowDidOpen}
            ListEmptyComponent = { this.empetyList}
                    onRefresh={() => this.handleRefresh()}
                    refreshing={this.state.refreshing}
        />
                    <Loader loading={this.props.loading} />
                    </View>
                    
                {/* </SafeAreaView> */}
      </View>
    );
  }
}

const mapStateToProps = state =>{
    return {
        myCouponsList: state.coupon.myCouponList,
        loading: state.coupon.loading
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        fetchMyCoupons:(navigation) => fetchMyCoupons(dispatch, navigation),
        deleteCouponFromCart:(id, navigation) => deleteCouponFromCart(id, dispatch, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCoupons);