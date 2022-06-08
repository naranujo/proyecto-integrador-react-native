import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth, db } from "../firebase/config";

import {
    Foundation,
    AntDesign,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

import Register from "../screens/Register";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Search from "../screens/Search";
import NewPost from "../screens/NewPost";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

class MainNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            registerErrors: null,
            addUserErrors: null,
            
        };
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if(user){
                 this.setState({
                loggedIn: true,
                user: user,
            });
            }
           
        });
    }
    login(mail, pass){
        auth.signInWithEmailAndPassword(mail, pass)
            .then(response => this.setState({
                loggedIn:true
            }))
            .catch( error => console.log(error))

    }
    register(userEmail, userPassword, userName, userImage) {
        if (this.state.registerErrors === null && this.state.addUserErrors === null) {
            let usuarios = []
            let emails = []
            db.collection("users").get()
                .then(res => {
                    res._delegate._snapshot.docChanges.forEach((doc) => {
                        usuarios.push(doc.doc.data.value.mapValue.fields.name.stringValue)
                        emails.push(doc.doc.data.value.mapValue.fields.email.stringValue)
                    })
                    if (usuarios.includes(userName) && !emails.includes(userEmail)) {
                        this.setState({
                            addUserErrors: "Username is already in use",
                        });
                        console.log("El nombre ya está en uso");
                    } else if (emails.includes(userEmail) && !usuarios.includes(userName)) {
                        this.setState({
                            registerErrors: "Email is already in use",
                        });
                        console.log("El email ya está en uso");
                    } else if (emails.includes(userEmail) && usuarios.includes(userName)) {
                        this.setState({
                            registerErrors: "Email is already in use",
                            addUserErrors: "Username is already in use",
                        });
                        console.log("El email ya está en uso","El nombre ya está en uso");
                    } else if (!emails.includes(userEmail) && !usuarios.includes(userName)) {
                        db.collection("users")
                            .add({
                                email: userEmail,
                                username: userName,
                                photo: userImage,
                            })

                            .then((res) => {
                                console.log("Usuario agregado", "users/Collection");
                                alert("Usuario agregado")
                            })
                            .catch((err) => {
                                this.setState({
                                    addUserErrors: err.message,
                                });
                            });
                        auth
                            .createUserWithEmailAndPassword(userEmail, userPassword)
                            .then((res) => {
                                console.log(
                                    "Usuario registrado exitosamente",
                                    "method/Authentication",res
                                );
                               
                            })
                            .catch((err) => {
                                this.setState({
                                    registerErrors: err.message,
                                });
                            });
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log("Error")
            this.setState({
                registerErrors: null,
                addUserErrors: null,
            })
        }
    }
    logout(){
            auth.signOut()
            .then( response => this.setState({
                loggedIn: false
            }))
            .catch( error => console.log(error))
    }
    
    render() {
        return this.state.loggedIn === false ? (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Register"
                        children={(props) => (
                            <Register regErr={this.state.registerErrors} addErr={this.state.addUserErrors} {...props} />
                        )}
                        options={{ headerShown: false }}
                        initialParams={{
                            register: (mail, pass, name, image) => this.register(mail, pass, name, image)
                        }}
                    />
                    
                    <Stack.Screen 
                            name='Login'
                            component = { Login }
                            options = {{headerShown: false}}
                            initialParams = {
                                {   login: (mail, pass)=>this.login(mail, pass),
                                }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        ) : (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Home"
                        children={(props) => <Home user={this.state.user} {...props} />}
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
                        children={(props) => <NewPost user={this.state.user} {...props} />}
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
                        children={(props) => <Profile user={this.state.user} {...props} />}
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
            </NavigationContainer>
        );
    }
}

export default MainNavigation;
