/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {StackNavigator} from 'react-navigation'

import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import TestScreen from "./src/components/TestScreen";
import userReducers from './src/reducers/user'

let SimpleApp = StackNavigator({
    Loading: {screen: TestScreen},
    Pre: {screen: TestScreen},
    Main: {screen: TestScreen}
}, {
    navigationOptions: {
        title: null,
        header: null,
        left: null
    }
});

let store = createStore(combineReducers({user: userReducers}));
export default class Commservus extends Component {
    render() {
        return (
            <Provider store={store}>
              <SimpleApp/>
            </Provider>
        )
    }
}
