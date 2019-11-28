/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { AppContainer } from './src/Components/Router';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <View style={{ flex:1}}>
      <Provider store = {store}>
        <AppContainer/>
      </Provider>
      </View>
    );
  }
}

