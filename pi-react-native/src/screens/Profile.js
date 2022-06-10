import { useRoute } from '@react-navigation/native';
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {auth} from '../firebase/config';


class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
        }
    }

    componentDidMount(){
      console.log("las props y auth", this.props, auth.currentUser)
    }
    render(){
        console.log(auth.currentUser);
        
        return(
                <View>
                   
                    <Text>{auth.currentUser.displayName}</Text>
                    <Text>{auth.currentUser.email}</Text>
                    <Text>Ultimo inicio de sesion: {auth.currentUser.metadata.lastSignInTime}</Text>

                    <TouchableOpacity onPress={()=>this.props.route.params.logout()}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                
                </View>
        )
    }

}


export default Profile;