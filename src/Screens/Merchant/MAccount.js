import React, { Component } from "react";
import {
    View,
    Image,
    SectionList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { getTransectionList} from '../../store/actions/user';
import Header from '../../Components/Header';
import colors from '../../styles/colors';
import { LightText, BoldText } from "../../Components/styledTexts";

class MAccount extends Component {
    constructor(){
        super();
        this.state = { 
            text: '',
            isRefreshing: false
        };
    }
    
    componentDidMount(){
        this.props.getTransectionList(this.props.navigation);
    }
    componentDidUpdate(prevProps, prevState) {
       if(prevProps.loading != this.props.loading){
            if(!this.props.loading){
                this.setState({ isRefreshing: false})
            }
       }
    }
    handleRefresh(){
        if(this.state.isRefreshing){
            return
        }
        this.setState({ isRefreshing: true})
        this.props.getTransectionList(this.props.navigation);
      };

    renderItem = (item) => {
    //    console.log(JSON.stringify(item))
        return (
            <View style={{ padding: 10 }}>
                <View style={{ flex:1, flexDirection:'row', alignItems:'center'}}
                >
                  <View style={{height:35, width:35, borderRadius:17, alignItems:'center', justifyContent:'center',backgroundColor:colors.lightGray }}>
                          <Image
                              source={require('../../assets/Arrow-up-circle.png')}
                              style={{ height: 20, width: 20, }}
                          />
                  </View>
                  <View style={{ flex:1, marginLeft: 15 }}>
                      <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <LightText>{item.item.text}</LightText>
                        <LightText>{`$${item.item.amount}`}</LightText>
                      </View>
                      <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <LightText style={{ fontSize:12}}>{item.item.time}</LightText>
                        {/* <LightText style={{ fontSize:12}}>{'closing Balance $10'}</LightText> */}
                      </View>
                  </View>
                </View>
            </View>
        )
    }

    //Item sparator view
    itemSeparator = () => {
        return (
            <View style={{ height: 1, backgroundColor: colors.lightGray}}/>
        );
      };
    stopPullToRefresh = ()=>{
        this.setState({ isRefreshing: false})
    }

    render(){
        // if(!this.props.loading){
        //     this.stopPullToRefresh()
        // }
        return (
            <View style = {{ flex: 1}}>
                    <View style={{flex: .1}}>
                        <Header
                        color={colors.appColor}
                        value={'Transaction'}
                        />
                    </View>
                    <View style={{ flex: 1}}>
                        <View style={{ flex:3}}>
                            <View style={{height:50,paddingHorizontal:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <LightText>Recents</LightText>
                                <View style={{flexDirection:'row', width:150, alignItems:'center', justifyContent:'flex-end'}}>
                                {/* <LightText>Filter</LightText> */}
                                {/* <Image
                                    source={require('../../assets/menu-Name.png')}
                                /> */}
                                </View>
                            </View>
                            <View style={{ flex:1}}>
                            
                            {(this.props.transections.result) ? (
                            <SectionList  
                                sections={this.props.transections.result} 
                                renderItem={this.renderItem} 
                                ItemSeparatorComponent={this.itemSeparator} 
                                renderSectionHeader={({section}) => <LightText style={{padding:10, backgroundColor:colors.lightGray}}>{section.title}</LightText>}  
                                keyExtractor={(item, index) => index} 
                                refreshing={this.state.isRefreshing}
                                onRefresh={() => this.handleRefresh()}  
                            /> ) : (null)} 
                            </View>
                            
                        </View>
                    </View>
                    {(this.state.isRefreshing)?(null):(<Loader loading={this.props.loading} />)}
            </View>
        )
    }

}

const mapStateToProps = state =>{
    return {
        transections: state.user.transections,
        loading: state.user.loading,
    }
};
const mapDispatchToProps = dispatch =>{
    return {
        getTransectionList:(navigation)=>getTransectionList(dispatch, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MAccount);