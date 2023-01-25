import React, { useState } from 'react';
import {useRoute} from '@react-navigation/native';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import InputText from '../components/InputText';
import Messages from './Messages';

export default function ChatScreen(props) {

    const route = useRoute();
    // console.log(route.params)
    alert(route.params.id_room);
    //  const id_room = 4


    return (
    
        <KeyboardAvoidingView
            style = {styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled
            keyboardVerticalOffset={85}
        >
            
            <TouchableWithoutFeedback onPress={()=>{
                Keyboard.dismiss();
            }}>
            <View style = {{ position: 'relative',  flex:1 }}>
                {/* <Text style={}> Hello{route.params.id_room}</Text> */}
                <Messages />
                <InputText
                    idRoom = {route.params.id_room}
                    // idRoom = {id_room}
                    
                    //4. je recupère via le props de mon parent mon attribu onChangeText et je lui passe le contenu de l'input  
                    onChangeText = {props.text}
                />
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#080713',

    },

})
