/**
 * Created by hugo.queiros on 01/03/16.
 */
'use script';
var React = require('react-native');

/**
 * components for React Native
 * ScrollView is used for adding scroll bars. React Native isn't like web pages
 * AsyncStorage isn't really a component. It's an API used for storing local data in React Native
 * api is a custom module that wraps fetch, React Native's way for making network requests.
 *
 * @type {ReactNative|exports|module.exports}
 */
var {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    View,
    ScrollView,
    TouchableHighlight,
    AsyncStorage
    } = React;


var Button = require('react-native-button');
var GiftedSpinner = require('react-native-gifted-spinner');

var api = require('../src/api.js');

var moment = require('moment');

var TOTAL_NEWS_ITEMS = 10;

var NewsItems = React.createClass({

    /**
     * function used for specifying the default stat for this component. In React Native, the state is used for
     * storing data that is available throught the whole component.
     * Here, I am storing th title of the app, the dataSource for the ListView component, the current new items
     * and a boolean value loaded, which tells wheter the news items are currently being loaded from the network or not.
     *
     * @returns {{title: string, dataSource, news: {}, loaded: boolean}}
     */
    getInitialState: function() {
        return {
            title: 'HN Reader',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            news: {},
            loaded: false
        }
    },

    /**
     * The render function renders the user interface for this component.
     * First I wrap everything in a View. Then, inside we have the header and the body. The header
     * contains the title and the spinner. The body contains the ListView. Everything inside the body is wrapped
     * inside a ScrollView so that a scroll bar is automatically added if the content exceeds the available space.
     *
     * @returns {XML}
     */
    render: function() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.header_item}>
                        <Text style={styles.header_text}>{this.state.title}</Text>
                    </View>
                    <View style={styles.header_item}>
                        {  !this.state.loaded &&
                        <GiftedSpinner />
                        }
                    </View>
                </View>
                <View style={styles.body}>
                    <ScrollView ref="scrollView">
                        {
                            this.state.loaded &&

                            <ListView initialListSize={1} dataSource={this.state.news} style={styles.news} renderRow={this.renderNews}></ListView>
                        }
                    </ScrollView>
                </View>
            </View>
        );

    },
});