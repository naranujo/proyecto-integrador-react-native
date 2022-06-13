import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import { db, storage } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';

class MyCamera extends Component {

    constructor(props) {
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            url: null
        }
        this.metodosDeCamara = ''
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then((permisos) => {
                if (permisos.granted === true) {
                    this.setState({
                        permission: true,
                    })
                }
            })
            .catch(error => console.log(error))
    }

    sacarFoto() {
        //usar un método de la cámara para sacar la foto.abs
        this.metodosDeCamara.takePictureAsync()
            .then(photo => {
                this.setState({
                    //obtener la url temporal para guardarla en un estado.
                    url: photo.uri,
                    showCamera: false,
                })
            })
            .catch()
    }

    guardarFoto() {
        fetch(this.state.url)
            .then(response => response.blob())
            .then(
                image => {
                    const ref = storage.ref(`photos/${Date.now()}.jpg`);
                    ref.put(image)
                        .then(() => {
                            ref.getDownloadURL()
                                .then(url => {
                                    this.props.onImageUpload(url) //tiene que venir del padre.
                                })
                                .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error))
                }
            )
            .catch(error => console.log(error))
    }

    eliminarPreview() {
        this.setState({
            showCamera: false,
            url: null
        })
    }

    render() {
        return (
            <View>
                {
                    this.state.permission
                    ? this.state.showCamera
                        ?   <View>
                                <View style={styles.cameraBody}>
                                    <Camera
                                        style={styles.cameraBody}
                                        type={Camera.Constants.Type.front}
                                        ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                                    />
                                </View> 
                                <View style={styles.containerButtons}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.sacarFoto()}>
                                        <Text style={styles.buttonText}>Tomar foto</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        :   this.state.url !== null
                            ?   <View>
                                    <View style={styles.cameraBody}>
                                        <Image
                                            style={styles.preview}
                                            source={{ uri: this.state.url }}
                                            resizeMode='contain'
                                        />
                                    </View>
                                    <View style={styles.containerButtons}>
                                        <TouchableOpacity
                                            style={styles.buttonS}
                                            onPress={() => this.guardarFoto()}>
                                            <Text style={styles.buttonText}>Guardar Foto</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.buttonD}
                                            onPress={() => this.eliminarPreview()}>
                                            <FontAwesome name="trash-o" size={20} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            :   <View>
                                    <View style={styles.cameraBody}>
                                        <Camera
                                            style={styles.cameraBody}
                                            type={Camera.Constants.Type.front}
                                            ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                                        />
                                    </View> 
                                    <View style={styles.containerButtons}>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => this.sacarFoto()}>
                                            <Text style={styles.buttonText}>Tomar foto</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                    :   <View style={styles.container}>
                            <Text style={styles.labelPermissions}> No tengo permisos de cámara</Text>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
    },
    cameraBody: {
        width: "40vw",
        height: "calc((40vw / 4) * 3)",
    },
    preview: {
        width: "40vw",
        height: "calc((40vw / 4) * 3)",
    },
    button: {
        width: "40vw",
        backgroundColor: "#28a745",
        paddingVertical: 6,
        marginVertical: 10,
        textAlign: "center",
        borderRadius: 4,
        border: "1px solid #28a745",
        marginHorizontal: "auto",
    },
    buttonS: {
        width: "18vw",
        backgroundColor: "#28a745",
        paddingVertical: 6,
        marginVertical: 10,
        textAlign: "center",
        borderRadius: 4,
        border: "1px solid #28a745",
        marginHorizontal: "auto",
    },
    buttonD: {
        width: "18vw",
        backgroundColor: "#D93030",
        paddingVertical: 6,
        marginVertical: 10,
        textAlign: "center",
        borderRadius: 4,
        border: "1px solid #D93030",
        marginHorizontal: "auto",
    },
    containerButtons: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    buttonText: {
        color: '#fff',
    },
    labelPermissions: {
        color: "#D93030",
        textAlign: "center"
    }
})

export default MyCamera;