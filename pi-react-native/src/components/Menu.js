import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import Home from "../screens/Home";
import Search from "../screens/Search";
import NewPost from "../screens/NewPost";
import Profile from "../screens/Profile";

import {
    Foundation,
    AntDesign,
    MaterialCommunityIcons,
  } from "@expo/vector-icons";

class Menu extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render() {
        return (
            <Tab.Navigator>
            <Tab.Screen
              name="Home"
              children={(props) => <Home user={this.props.route.params.user} {...props} />}
              options={{
                tabBarIcon: () => (
                  <Foundation name="home" size={24} color="black" />
                ),
                headerShown: false,
              }}
              initialParams={""}
            />
            <Tab.Screen
              name="Search"
              children={(props) => <Search {...props} />}
              options={{
                tabBarIcon: () => (
                  <AntDesign name="search1" size={24} color="black" />
                ),
                headerShown: false,
              }}
              initialParams={""}
            />
            <Tab.Screen
              name="NewPost"
              children={(props) => (
                <NewPost user={this.props.route.params.user} {...props} />
              )}
              options={{
                tabBarIcon: () => (
                  <AntDesign name="pluscircleo" size={24} color="black" />
                ),
                headerShown: false,
              }}
              initialParams={""}
            />
            <Tab.Screen
              name="Profile"
              children={(props) => (
                <Profile user={this.props.route.params.user} {...props} />
              )}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons
                    name="human-greeting-variant"
                    size={24}
                    color="black"
                  />
                ),
                headerShown: false,
              }}
              initialParams={{ logout: () => this.logout() }}
            />
          </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({})

export default Menu;
