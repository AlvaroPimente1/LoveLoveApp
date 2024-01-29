import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";
import auth from '@react-native-firebase/auth';

export default function OptionsScreen({ navigation }){
    const userRef = firestore().collection('usuarios').doc(getUserID());
    
    const desconectarUsuarios = async() => {
        try{
            await userRef.update({
                comprometido: false
            })

            auth()
            .signOut()
            .then(() => navigation.navigate('LoginScreen'));
            console.log('certo');
        } catch(error) {
            console.error(error);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={desconectarUsuarios}>
                <Text>Desconectar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}