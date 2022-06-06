import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Button,
} from "react-native";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: null,
            userPassword: null,
            userName: null,
            userImage: "",
            regErr: null,
            addErr: null
        };
    }
    componentDidMount() {
        this.setState({
            regErr: this.props.regErr,
            addErr: this.props.addErr
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Lorem®</Text>
                <Text style={styles.subTitle}>
                    Regístrate para ver fotos y videos de tus amigos.
                </Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={
                        this.state.userEmail === null
                            ? styles.input
                            : this.state.userEmail === ""
                                ? styles.inputNotOK
                                : this.state.regErr === "Email is already in use" ?
                                styles.inputNotOK : styles.inputOK
                        
                    }
                    keyboardType="email-address"
                    placeholder="johndoe@example.com"
                    onChangeText={(text) => this.setState({ userEmail: text })}
                />
                {this.state.userEmail === "" ? (
                    <Text style={styles.helperLabel}>Debes completar este campo</Text>
                ) : null}
                <Text style={styles.label}>Nombre de usuario</Text>
                <TextInput
                    style={
                        this.state.userName === null
                            ? styles.input
                            : this.state.userName === ""
                                ? styles.inputNotOK
                                : this.state.addErr === "Username is already in use" ?
                                styles.inputNotOK : styles.inputOK
                    }
                    keyboardType="email-address"
                    placeholder="John Doe"
                    onChangeText={(text) => this.setState({ userName: text })}
                />
                {this.state.userName === "" ? (
                    <Text style={styles.helperLabel}>Debes completar este campo</Text>
                ) : null}
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={
                        this.state.userPassword === null
                            ? styles.input
                            : this.state.userPassword.length < 8
                                ? styles.input
                                : styles.inputOK
                    }
                    keyboardType="default"
                    placeholder="Password"
                    maxLength="32"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ userPassword: text })}
                />
                {this.state.userPassword === null ? null : this.state.userPassword
                    .length < 8 ? (
                    <Text style={styles.helperLabel}>
                        Introduce por lo menos 8 caracteres alfanuméricos
                    </Text>
                ) : null}
                <Text style={styles.label}>
                    Foto de perfil <Text style={styles.labelAlt}>(opcional)</Text>
                </Text>
                {this.state.userImage !== "" ? (
                    <Image
                        style={styles.profileImage}
                        source={{ uri: this.state.userImage }}
                        resizeMode="contain"
                    />
                ) : (
                    <TouchableOpacity style={styles.profileImage}>
                        <Text style={styles.alternative}>Photo</Text>
                    </TouchableOpacity>
                )}
                {
                    <TouchableOpacity
                        style={
                            this.state.userName !== "" &&
                                this.state.userName !== null &&
                                this.state.userEmail !== "" &&
                                this.state.userEmail !== null &&
                                this.state.userPassword !== null &&
                                this.state.userPassword.length >= 8 &&
                                this.state.userPassword.length <= 32
                                ? styles.boton
                                : styles.botonDisabled
                        }
                        onPress={() => {
                            this.props.route.params.register(
                                this.state.userEmail,
                                this.state.userPassword,
                                this.state.userName,
                                this.state.userImage,
                            )
                        }}
                    >
                        <Text style={styles.textoBoton}>Registrarme</Text>
                    </TouchableOpacity>
                }
                {this.props.regErr !== null ? (
                    <Text style={styles.errores}>{this.props.regErr}</Text>
                ) : null}
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={styles.login}>Ya tengo cuenta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: "flex",
        justifyContent: "center",
        marginVertical: "auto",
        backgroundColor: "#fff",
        height: "100vh",
        padding: 10,
        margin: 0,
    },
    title: {
        fontSize: 38,
        margin: 10,
        fontWeight: "bolder",
        fontFamily: "Palatino",
        textAlign: "center",
    },
    subTitle: {
        margin: 10,
        fontWeight: "bold",
        textAlign: "center",
    },
    label: {
        fontWeight: "bold",
        marginTop: 30,
        marginLeft: "calc(10vw / 2)",
    },
    inputNotOK: {
        width: "90vw",
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        border: "2px solid rgba(0,0,0,0)",
        marginTop: 3,
        marginHorizontal: "auto",
        borderBottomColor: "#D32F2F",
    },
    inputOK: {
        width: "90vw",
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        border: "2px solid rgba(0,0,0,0)",
        marginTop: 3,
        marginHorizontal: "auto",
        borderBottomColor: "#28a745",
    },
    input: {
        width: "90vw",
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        border: "2px solid rgba(0,0,0,0)",
        marginTop: 3,
        marginHorizontal: "auto",
        borderBottomColor: "#ccc",
    },
    boton: {
        width: "90vw",
        backgroundColor: "#28a745",
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
        borderRadius: 4,
        border: "1px solid #28a745",
        marginHorizontal: "auto",
    },
    botonDisabled: {
        width: "90vw",
        backgroundColor: "rgba(0,0,0,0.35)",
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
        borderRadius: 4,
        border: "1px rgba(0,0,0,0.35)",
        marginHorizontal: "auto",
    },
    textoBoton: {
        color: "#fff",
    },
    login: {
        textDecorationLine: "underline",
        textAlign: "center",
        paddingBottom: 10,
    },
    errores: {
        color: "#D32F2F",
        textAlign: "center",
        paddingBottom: 10,
    },
    profileImage: {
        flex: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90vw",
        height: 200,
        borderRadius: 4,
        marginTop: 3,
        border: "1px solid #ccc",
        marginHorizontal: "auto",
    },
    alternative: {
        color: "#ccc",
        fontSize: 24,
        fontWeight: "bold",
    },
    helperLabel: {
        color: "#D32F2F",
        marginTop: 2,
        marginLeft: "calc((10vw / 2))",
    },
    labelAlt: {
        fontWeight: 400,
        color: "#aaa",
    },
});
