import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import getUserID from "../../utils/getUserID";
import { ContainerCenterXY } from "../../styled/global.styles";

export default function MensagensScreen({ route }){
    const [isEnviado, setIsEnviado] = useState(false);
    const [text, setText] = useState('');

    const { casalId, userInfo, userParInfo } = route.params;

    const dataAtual = moment().format('YYYYMMDD');
    const userId = getUserID();
    
    const mensagemRef = firestore().collection('casais').doc(casalId).collection('mensagens').doc(dataAtual).collection('id').doc(userId);

    const enviarTexto = async () => {
        try {
            await mensagemRef.set({
                mensagem: text,
                dt_corrente: firestore.FieldValue.serverTimestamp()
            });
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsubscribe =  mensagemRef.onSnapshot((doc) => {
            if (doc.exists) {
                const casalData = doc.data();
                if (casalData?.mensagem) {
                    setIsEnviado(true);
                }
            } else {
                setIsEnviado(false);
            }
        }, (error) => {
            console.error("Erro ao observar o documento:", error);
        });
    
        return () => unsubscribe();
    }, []);

    return(
        <ContainerCenterXY>
            {
                isEnviado ?
                <Text>{userInfo.nome}</Text>
                :
                <View>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Envie sua mensagem do dia..."
                    />
                    <TouchableOpacity onPress={enviarTexto}>
                        <Text>Enviar</Text>
                    </TouchableOpacity>
                </View>
            }
        </ContainerCenterXY>
    );
}
