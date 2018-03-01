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

class LoadingScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {navigate} = this.props.navigation;

        navigate('Pre')
    }

    render() {
        return (
            <ScrollView style={{
                flex: 1,
            }}>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);