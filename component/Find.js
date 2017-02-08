import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity
} from 'react-native';
var FindDetail = require("./FindDetail");
var Find = React.createClass({
    getDefaultProps: function () {
        return {
            url_api: 'http://api.douban.com/v2/movie/top250'
        }
    },
    getInitialState: function () {
        return {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 != r2})
        }
    },
    render: function () {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
        );
    },
    renderRow: function (rowData) {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=> {this.pushToDetail(rowData)}}
            >
                <View style={styles.bigViewStyle}>
                    <Image
                        source={{uri:rowData.image}}
                        style={styles.iconStyle}
                    />
                    <View style={styles.rightViewStyle}>
                        <Text>{rowData.title}</Text>
                        <Text>{rowData.year}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },
    pushToDetail: function (data) {
        this.props.navigator.push({
            component: FindDetail,
            title: data.title,
            passProps: {data}
        });
    },
    componentDidMount: function () {
        this.loadData();
    },
    loadData: function () {
        fetch(this.props.url_api)
            .then((response)=>response.json())
            .then((responseData)=>{
                var myArr = [];
                for (var i = 0; i < responseData.subjects.length; i++) {
                    //空对象
                    var myObj = {}
                    myObj.title = responseData.subjects[i].title;
                    myObj.image = responseData.subjects[i].images.large;
                    myObj.year = responseData.subjects[i].year;
                    myObj.id = responseData.subjects[i].id;
                    myArr.push(myObj);
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(myArr)
                });
            })
    }
});

const styles = StyleSheet.create({
    bigViewStyle: {
        flexDirection:'row',
        padding:10
    },
    //image
    iconStyle:{
        width:100,
        height:120,
        marginRight:10
    },
    rightViewStyle:{
        justifyContent:'center'
    }
});
module.exports = Find;


