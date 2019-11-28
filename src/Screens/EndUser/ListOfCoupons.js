import React, { Component } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { 
    fetchStoresList,
    searchStoresList,
    resetPage,
    fetchCouponDetail
 } from '../../store/actions/coupons';
import Header from '../../Components/Header';
import colors from '../../styles/colors';
import { LightText, BoldText } from "../../Components/styledTexts";


class ListOfCoupons extends Component {
    constructor(props){
        super(props);
        this.state = { 
            text: '',
            page:1,
            loading:false,
            logoHeight:0
        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () =>{
           this.setState({
            text: '',
            page: 1,
            loading: false
           });
           this.props.fetchStoresList(1);
        });
      }

      SearchFilterFunction(text) {
        if(text !== ''){
            this.props.searchStoresList(text)
        }else{
            this.props.fetchStoresList(1)
        }
        this.setState({text: text})
      }
    
      renderItem = (item) => {
        //   console.log(item)
          return (

            <View style={{paddingHorizontal:10}}>
            <View style={{ marginVertical:10, height:150, borderRadius: 10,
              borderColor:'lightgray', borderWidth:0.3, zIndex:-90,  elevation: 5,
              shadowColor: '#999666', shadowOffset: {width: 0, height: 5},
              shadowOpacity: 0.7, shadowRadius: 5,
              width:'100%',
              backgroundColor:'white',}}>
                      <TouchableOpacity style={{ flexDirection:'row', flex: 1,justifyContent:'space-between'}}
                      onPress={()=> this.props.fetchCouponDetail(item.item.id, item.item.coupon.id, this.props.navigation)}
                         >
                      <View style={{width:'29%', borderRightColor:'#d3d3d3', borderRightWidth:0.5, alignItems:'center', justifyContent:'center'}}
                      onLayout={(event) => {
                        var {x, y, width, height} = event.nativeEvent.layout;
                         this.setState({logoHeight:width})
                        }}
                      >
                          {item.item.image && 
                           <Image
                           source={{uri:item.item.image}}
                           style={{ width: this.state.logoHeight-10, height: this.state.logoHeight-10, borderRadius: (this.state.logoHeight-10) / 2}}
                           resizeMode={'cover'}
                           />
                          }
                      
                          </View>

                      <View style={{ width:'69%'}}>
                          <LightText style={{textAlign:'center',padding:5, fontSize:15, fontWeight:'bold'}}>{`${item.item.business_name}`}</LightText>

                          <View style={{ flex:1, flexDirection:'row' }}>
                              
                              <View style={{ flex: 2,  }}>
                                  <View style={{flex:.5}}/>
                                  <View style={{ alignItems:'center'}}>
                                  <BoldText style={{ color: colors.appColor, fontSize: 30}}>{item.item.coupon.coupon_description}</BoldText>
                                  <BoldText style={{ color: colors.appColor, fontSize: 24}}>Cash Back</BoldText>
                                 </View>
                                  <View style={{flex:.5}}/>
                              </View>
                              <View style={{ flex: 1}}>
                              <Image
                                      source={{uri:item.item.coupon.image}}
                                      style={{ width:'100%', height:'70%'}}
                                      resizeMode={'stretch'}
                                  />  
                                  </View> 
                          </View>                                 
                              <LightText style={{textAlign:'justify',padding:5,  fontSize:12, marginBottom:5 }}>{`${item.item.coupon.store_description}`}</LightText>
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
            No EcoChecks found.
        </BoldText>
        </View>
        );
    }

 //Item sparator view
      ListViewItemSeparator = () => {
        return (
            <View style={{ height: 1, backgroundColor: colors.lightGray}}/>
        );
      };
_handelRefresh=async()=>{
    this.props.resetPage();
    console.log("refresh");
    // this.setState({loading:true});
    this.props.fetchStoresList(1);
    // this.setState({loading:false})
}


_loadMore=({ distanceFromEnd })=>{
    if(!this.onEndReachedCalledDuringMomentum){
        this.props.fetchStoresList(this.props.page);
        this.onEndReachedCalledDuringMomentum = true;
    }
}
    render() {
     return (
            <View style = {{ flex: 1}}>
                <View style={{flex: .1}}>
                    <Header
                    drawer={(this.props.first_name) ? (false) : this.props.navigation}
                    color={colors.appColor}
                    value={'List of EcoChecks'}
                    />
                </View>
                <View style={{ flex: 1}}>
                <View style={{}}>
                <View style={{ height: 50, backgroundColor:'#fff', marginHorizontal: 20, alignItems:'center', justifyContent:'center', marginTop: 10,borderRadius: 25,backgroundColor: '#FFFFFF',shadowColor: '#451B2D',shadowOffset: {width: 0, height: 3},shadowOpacity: 0.15, shadowRadius: 21, elevation: 3}}>
                            <View style={{ paddingLeft: 10,height: 40, flexDirection: 'row', alignItems:'center', marginHorizontal: 20}}>
                                <Image
                                    source={require('../../assets/search.png')}
                                    style={{ height: 20, width: 20, tintColor: 'gray'}}
                                />
                            <TextInput
                                style={{ flex:1, paddingLeft: 5}}
                                onChangeText={text => this.SearchFilterFunction(text)}
                                value={this.state.text}
                                placeholder={'Search EcoChecks'}
                                // clearButtonMode={'always'}
                                />
                                <TouchableOpacity
                                    onPress={()=> this.props.navigation.navigate('Locations')}
                                >
                                <Image
                                    source={require('../../assets/map-pointer.png')}
                                    style={{ height: 20, width: 20, tintColor: colors.appColor}}
                                    resizeMode={'contain'}
                                />
                                </TouchableOpacity>
                         </View>
                    </View>
                    <View style={{marginTop: 15, height: 1, backgroundColor: colors.lightGray}}/>
                </View>
                <View style={{ height: 1, backgroundColor: colors.lightGray}}/>
                <View style={{ flex: 1}}>
                <FlatList
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                   onEndReachedThreshold={0.9}
                    data={this.props.storeList}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    renderItem={this.renderItem}
                    ListEmptyComponent = { this.empetyList}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.props.loading}
                    onRefresh={()=>this._handelRefresh()}
                    onEndReached={this._loadMore.bind(this)}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                    />
                    </View>
                    <Loader loading={this.props.CDLoader} />
                </View>
      </View>
    );
  }
}

const mapStateToProps = state =>{
    return {
        storeList: state.coupon.couponsList,
        loading: state.coupon.loading,
        CDLoader: state.coupon.CDLoader,
        page: state.coupon.page,
        first_name: state.user.first_name
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        searchStoresList:(text) => searchStoresList(text, dispatch),
        fetchStoresList:(page) => fetchStoresList(page,dispatch),
        fetchCouponDetail:(storeId, couponId, navigation) => fetchCouponDetail(storeId, couponId, dispatch, navigation),
        resetPage:() => resetPage(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfCoupons);