import React, { useState } from "react";
import styles from "./style";
import { SafeAreaView, View, Text, TouchableOpacity, Image } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";
import CriarShipp from "../../utils/criaShipp";

export default function ParPerfilSolicitacaoScreen({ route, navigation }){
    const user = route.params.user;
    const [ shippCasal, setShippCasal ] = useState('');

    const colecaoUserRef = firestore().collection('usuarios');
    const userRef = colecaoUserRef.doc(getUserID());
    const userParRef = colecaoUserRef.doc(user.id);

    const casaisCollectionRef = firestore().collection('casais');

    const cleanArrays = {
        solicitacoes_recebidas: [],
        solicitacao_feita: []
    }

    const aceitaSolicitacao = async () => {
        try {
            const userId = getUserID();
            const parId = user.id;
            
            const casaisSnapshot1 = await casaisCollectionRef
                .where('userRef1', '==', userId)
                .where('userRef2', '==', parId)
                .get();
    
            const casaisSnapshot2 = await casaisCollectionRef
                .where('userRef1', '==', parId)
                .where('userRef2', '==', userId)
                .get();
    
            const casalExiste = !casaisSnapshot1.empty || !casaisSnapshot2.empty;
    
            if (!casalExiste) {
                await Promise.all([
                    userRef.update({
                        comprometido: true,
                        parceiroRef: parId,
                        ...cleanArrays
                    }),
                    userParRef.update({
                        comprometido: true,
                        parceiroRef: userId,
                        ...cleanArrays
                    }),
                    casaisCollectionRef.add({
                        userRef1: userId,
                        userRef2: parId
                    })
                ]);
                
                navigation.navigate('RotasCasal');

            } else {
                await Promise.all([
                    userRef.update({
                        comprometido: true,
                        parceiroRef: parId,
                        ...cleanArrays
                    }),
                    userParRef.update({
                        comprometido: true,
                        parceiroRef: userId,
                        ...cleanArrays
                    }),
                ]);

                navigation.navigate('RotasCasal');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const cancelaSolicitacao = async() => {
        try{
            await userRef.update({
                solicitacoes_recebidas: firestore.FieldValue.arrayRemove(user.id)
            })

            await userParRef.update({
                solicitacao_feita: []
            })
        } catch(error){
            console.error(error);
        }
    } 

    return(
        <SafeAreaView style={styles.container}>
            <Image style={{ width: 200, height: 200, borderRadius: 50 }} source={{ uri: user.image }}/>
            <Text>{user.nome}</Text>
            <Text>{user.email}</Text>
            <TouchableOpacity onPress={aceitaSolicitacao}>
                <Text>Aceitar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={cancelaSolicitacao}>
                <Text>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}