import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from '../components/myCamera';

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            permisos: false,
            errores: null,
            showCamera: true,
            likes: [],
            comments: [],
            showCamera: true,
            description: null,
            url: '',
            // user: auth.currentUser,
        }
    }

    agregarPost(image, description, likes, comments) {
        db.collection('posts').add({
            createdAt: Date.now(),
            owner: auth.currentUser.email,
            description: description,
            likes: likes,
            comments: comments,
            url: image
        })
            .then(response => {

                console.log("Posteo Realizado");
                this.setState({
                    description: '',
                },
                    () => this.props.navigation.navigate('Home')
                )
            }
            )
            .catch(error => console.log(error))
    }

    onImageUpload(url) {
        this.setState({
            url: url,
            showCamera: false,
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.label}>Imagen del post</Text>
                    <View style={styles.containerCamera}>
                        {
                            this.state.showCamera
                            ? <MyCamera style={styles.camara} onImageUpload={url => this.onImageUpload(url)} />
                            : null
                        }
                    </View>
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
                    {
                        this.state.description === ""
                        ? <Text style={styles.helperLabel}>Debes completar este campo</Text>
                        : null
                    }
                    <TouchableOpacity
                        style={
                            this.state.description !== "" && this.state.description !== null && this.state.image !== null
                            ? styles.boton
                            : styles.botonDisabled
                        }
                        disabled={
                            this.state.description !== "" && this.state.description !== null && this.state.image !== null
                            ? false
                            : true
                        }
                        onPress={() =>
                            this.agregarPost(this.state.url, this.state.description, this.state.likes, this.state.comments)
                        }
                    >
                        <Text style={styles.textoBoton}>Postear</Text>
                    </TouchableOpacity>
                    {
                        this.state.errores !== null
                        ? <Text style={styles.errores}>{this.state.errores}</Text>
                        : null
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100vh'
    },
    containerCamera: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 3,
        marginHorizontal: "auto",
        marginBottom: 10
    },
    camara: {
        marginBottom: 20
    },
    titleCamera: {
        marginBottom: 20
    },
    field: {
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding: 3,
        marginBottom: 8
    },
    button: {
        borderRadius: 2,
        padding: 3,
        backgroundColor: 'green',
    },
    buttonText: {
        color: '#fff'
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
        marginTop: 15,
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
})


export default NewPost;