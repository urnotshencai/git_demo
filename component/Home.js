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

var HomeDetail = require("./HomeDetail");

var Home = React.createClass({
    getDefaultProps: function () {
        return {
            url_api: 'http://api.douban.com/v2/movie/in_theaters'
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
                onPress={()=>{this.pushToDetail(rowData)}}
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
    pushToDetail:function (data) {
        //进行页面跳转
        this.props.navigator.push({
            component:HomeDetail,
            title:data.title,
            //把data值传到跳转的详情页
            passProps:{data}
        });
    },
    componentDidMount: function () {
        this.loadData();
    },
    loadData: function () {
        fetch(this.props.url_api)
            .then((response)=>response.json())
            .then((responseData)=> {
                //alert(responseData.subjects[0].title);
                //请求完成的时候将数据给状态值
                //数组接收数据
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
                //设置状态值给数据
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(myArr)
                });
            })
            .catch((error)=> {
                if (error) {

                }
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
module.exports = Home;


