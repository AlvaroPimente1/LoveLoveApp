import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";
import auth from '@react-native-firebase/auth';
import axios from "axios";

export default function TerminoScreen({ navigation }){
    const [conselho, setConselho] = useState('');
    const userRef = firestore().collection('usuarios').doc(getUserID());
    
    const fetchConselho = () => {
        axios.get(`https://api.adviceslip.com/advice?`)
            .then(response => {
                if (response.data && response.data.slip) {
                    setConselho(response.data.slip.advice);
                } else {
                    console.log('Não foi possível localizar conselho');
                }
            })
            .catch(() => {
                console.log('falha ao buscar conselho');
            });
    };

    useEffect(() => {
        const intervalId = setInterval(fetchConselho, 4000); 

        return () => clearInterval(intervalId);
    }, []);


    const desconectarUsuarios = async() => {
        try{
            const userRefData = (await userRef.get()).data()

            const parId = userRefData.parceiroRef;
            const userParRef = firestore().collection('usuarios').doc(parId);

            await userParRef.update({
                comprometido: false,
                parceiroRef: null
            })

            await userRef.update({
                comprometido: false,
                parceiroRef: null
            })

            auth()
            .signOut()
            .then(() => navigation.navigate('RotasSolteiro'));
        } catch(error) {
            console.error(error);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
                <View style={styles.containerSolicitacao}>
                    <Text>Terminou o relacionamento?</Text>
                    <TouchableOpacity
                        style={styles.botaoCancelar}
                        onPress={desconectarUsuarios}
                    >
                        <Text style={styles.textButton}>Desconectar</Text>
                    </TouchableOpacity>
                    </View>
                    
                    <View style={{ marginHorizontal: 20 }}>
                        <Text>{conselho}</Text>
                    </View>
        </SafeAreaView>
    )
}