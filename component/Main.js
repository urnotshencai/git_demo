import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS
} from 'react-native';
//引入组件
var Home = require("./Home");
var Message = require("./Message");
var Find = require("./Find");
var Mine = require("./Mine");

var Main = React.createClass({
    getInitialState:function () {
        return{
            selectedTabBarItem:'home'
        }

    },
    render:function () {
        return (
            <TabBarIOS tintColor='orange'>
                {/*首页-正在热映*/}
                <TabBarIOS.Item
                    icon={require("./../img/tabbar_home@2x.png")}
                    title="首页"
                    selected={this.state.selectedTabBarItem == 'home'}
                    onPress={()=>(this.setState({
                        selectedTabBarItem:'home'
                    }))}
                >
                   <NavigatorIOS
                       tintColor='orange'
                       style={{flex:1}}
                       initialRoute={{
                           component:Home,  //需要控制哪个版块
                           title:'主页',
                           leftButtonIcon:require("./../img/navigationbar_friendattention@2x.png"),
                           rightButtonIcon:require("./../img/navigationbar_pop@2x.png")
                       }}
                   />
                </TabBarIOS.Item>
                {/*消息*/}
                <TabBarIOS.Item
                    selected={this.state.selectedTabBarItem == 'message'}
                    onPress={()=>(this.setState({
                        selectedTabBarItem:'message'
                    }))}
                    icon={require("./../img/tabbar_message_center@2x.png")}
                    title="消息"
                >
                    <NavigatorIOS
                        style={{flex:1}}
                        initialRoute={{
                            component:Message,  //需要控制哪个版块
                            title:'消息'
                        }}
                    />
                </TabBarIOS.Item>
                {/*发现*/}
                <TabBarIOS.Item
                    selected={this.state.selectedTabBarItem == 'find'}
                    onPress={()=>(this.setState({
                        selectedTabBarItem:'find'
                    }))}
                    icon={require("./../img/tabbar_discover@2x.png")}
                    title="发现"
                >
                    <NavigatorIOS
                        style={{flex:1}}
                        initialRoute={{
                            component:Find,  //需要控制哪个版块
                            title:'发现'
                        }}
                    />
                </TabBarIOS.Item>
                {/*我的*/}
                <TabBarIOS.Item
                    selected={this.state.selectedTabBarItem == 'mine'}
                    onPress={()=>(this.setState({
                        selectedTabBarItem:'mine'
                    }))}
                    icon={require("./../img/tabbar_profile@2x.png")}
                    title="我的"
                >
                    <NavigatorIOS
                        style={{flex:1}}
                        initialRoute={{
                            component:Mine,  //需要控制哪个版块
                            title:'我的'
                        }}
                    />
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
});


const styles = StyleSheet.create({

});

//输出类
module.exports = Main;
