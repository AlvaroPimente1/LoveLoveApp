import React, { useState, useEffect } from "react";
import styles from "./style";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import getUserID from "../../utils/getUserID";

export default function MensagensScreen({ route }){
    const casalId = route.params.casalId
    const dadosUsuario1 = route.params.dadosUser1
    const dataAtual = moment().format('YYYYMMDD');
    const userId = getUserID();
    const casalRef = firestore().collection('casais').doc(casalId).collection('mensagens').doc(dataAtual).collection('id').doc(userId);

    const [ isEnviado, setIsEnviado ] = useState(false);
    const [ text, setText ] = useState('');

    const enviarTexto = async () => {
        try{
            await casalRef.set({
                mensagem: text,
                dt_corrente: firestore.FieldValue.serverTimestamp()
            })
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe =  casalRef.onSnapshot((doc) => {
            if (doc.exists) {
                const casalData =  doc.data();
                if(casalData.mensagem){
                    setIsEnviado(true);
                }
            } else {
                setIsEnviado(false);
            }
        }, (error) => {
            console.error("Erro ao observar o documento:", error);
        });
    
        return () => unsubscribe();
    }, [])

    return(
        <SafeAreaView>
            {
                isEnviado ?
                <Text>enviado ja</Text>
                :
                <View>
                <Text>{dadosUsuario1.nome}</Text>

                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Texto"
                />

                <TouchableOpacity onPress={enviarTexto}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
}