import React, {Component} from 'react';
import {
    Text,
    View,
    Button,
    AsyncStorage,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    TouchableOpacity,
    Alert,
    RefreshControl
} from 'react-native';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../actions/index'

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

class TestScreen extends Component {
    static navigationOptions = {
        headerStyle: {backgroundColor: "#49A0B0"},
        headerTitleStyle: {color: "#FFFFFF"},
        headerTitle: 'Drinks',
        headerBackTitleStyle: {color: 'white'},
        headerTintColor: 'white',
    };

    constructor(props) {
        super(props);

        this.state = {drinks: [], locations: []};
    }

    render() {
        return (
            <ScrollView style={{
                flex: 1,
            }}>
                <Text>Hey</Text>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);