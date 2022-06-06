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
import { db, auth } from "../firebase/config";

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            description: null,
            likes: 0,
            comments: 0,
            errores: null,
            user: auth.currentUser,
            permisos: false,
            showCamera: false,
        };
    }
    agregarPost(URI, description) {
        db.collection("posts")
            .add({
                owner: this.state.user.email,
                description: description,
                postedAt: Date.now(),
                likes: this.state.likes,
                comments: this.state.comments,
            })
            .then((res) => alert("Posteado exitosamente"))
            .catch((err) => {
                this.setState({ errores: err.message });
            });
    }

    render() {
        return (
            <View>
                <Text style={styles.label}>
                    Imagen del post
                </Text>
                {this.state.image !== null ? (
                    <Image
                        style={styles.profileImage}
                        source={{ uri: this.state.image }}
                        resizeMode="contain"
                    />
                ) : (
                    <TouchableOpacity style={styles.profileImage}>
                        <Text style={styles.alternative}>Photo</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.label}>Pie de foto</Text>
                <TextInput
                    style={
                        this.state.description === null
                            ? styles.input
                            : this.state.description === ""
                                ? styles.inputNotOK
                                : styles.inputOK
                    }
                    keyboardType="email-address"
                    placeholder="Something that describes the image"
                    multiline={true}
                    onChangeText={(text) => this.setState({ description: text })}
                />
                {this.state.description === "" ? (
                    <Text style={styles.helperLabel}>Debes completar este campo</Text>
                ) : null}
                <TouchableOpacity
                    style={
                        this.state.description !== "" && this.state.description !== null && this.state.image !== null ?
                        styles.boton : 
                        styles.botonDisabled
                    }
                    disabled={
                        this.state.description !== "" && this.state.description !== null && this.state.image !== null ?
                        false : 
                        true
                    }
                    onPress={() =>
                        this.agregarPost(this.state.image, this.state.description)
                    }
                >
                    <Text style={styles.textoBoton}>Postear</Text>
                </TouchableOpacity>
                {this.state.errores !== null ? (
                    <Text style={styles.errores}>{this.state.errores}</Text>
                ) : null}
            </View>
        );
    }
}

export default NewPost;

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
        height: 100,
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
