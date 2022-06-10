import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth, db } from "../firebase/config";




import Register from "../screens/Register";
import Login from "../screens/Login";
import Comment from "../screens/Comment";
import Menu from "./Menu";


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
      if (user) {
        this.setState({
          loggedIn: true,
          user: user,
        });
      }
    });
  }
  login(mail, pass) {
    auth
      .signInWithEmailAndPassword(mail, pass)
      .then((response) =>
        this.setState({
          loggedIn: true,
        })
      )
      .catch((error) => console.log(error));
  }
  register(userEmail, userPassword, userName, userImage) {
    if (
      this.state.registerErrors === null &&
      this.state.addUserErrors === null
    ) {
      let usuarios = [];
      let emails = [];
      db.collection("users")
        .get()
        .then((res) => {
          res._delegate._snapshot.docChanges.forEach((doc) => {
            usuarios.push(doc.doc.data.value.mapValue.fields.name.stringValue);
            emails.push(doc.doc.data.value.mapValue.fields.email.stringValue);
          });
          if (usuarios.includes(userName) && !emails.includes(userEmail)) {
            this.setState({
              addUserErrors: "Username is already in use",
            });
            console.log("El nombre ya está en uso");
          } else if (
            emails.includes(userEmail) &&
            !usuarios.includes(userName)
          ) {
            this.setState({
              registerErrors: "Email is already in use",
            });
            console.log("El email ya está en uso");
          } else if (
            emails.includes(userEmail) &&
            usuarios.includes(userName)
          ) {
            this.setState({
              registerErrors: "Email is already in use",
              addUserErrors: "Username is already in use",
            });
            console.log("El email ya está en uso", "El nombre ya está en uso");
          } else if (
            !emails.includes(userEmail) &&
            !usuarios.includes(userName)
          ) {
            db.collection("users")
              .add({
                email: userEmail,
                username: userName,
                photo: userImage,
              })

              .then((res) => {
                console.log("Usuario agregado", "users/Collection");
                alert("Usuario agregado");
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
                  "method/Authentication",
                  res
                );
              })
              .catch((err) => {
                this.setState({
                  registerErrors: err.message,
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Error");
      this.setState({
        registerErrors: null,
        addUserErrors: null,
      });
    }
  }
  logout() {
    auth
      .signOut()
      .then((response) =>
        this.setState({
          loggedIn: false,
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
            {this.state.loggedIn === true ?
            <Stack.Group>
            <Stack.Screen name= "Menu" component={Menu} initialParams={{user:this.state.user}}/>
            <Stack.Screen name= "Comment" component={Comment}/>
            </Stack.Group>
            :
            <Stack.Group>
          <Stack.Screen
            name="Register"
            children={(props) => (
              <Register
                regErr={this.state.registerErrors}
                addErr={this.state.addUserErrors}
                {...props}
              />
            )}
            options={{ headerShown: false }}
            initialParams={{
              register: (mail, pass, name, image) =>
                this.register(mail, pass, name, image),
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
            initialParams={{ login: (mail, pass) => this.login(mail, pass) }}
          />
          </Stack.Group>
             }
        </Stack.Navigator>
      </NavigationContainer>
    ) 
  }
}

export default MainNavigation;
