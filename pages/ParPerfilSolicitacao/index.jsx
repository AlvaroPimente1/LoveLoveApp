import React, { useState } from "react";
import styles from "./style";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";

export default function ParPerfilSolicitacaoScreen({ route }){
    const user = route.params.user;

    const colecaoUserRef = firestore().collection('usuarios');
    const userRef = colecaoUserRef.doc(getUserID());
    const userParRef = colecaoUserRef.doc(user.id);


    const aceitaSolicitacao = async() => {
        try{
            await userRef.update({
                comprometido: true,
                solicitacoes_recebidas: [],
                solicitacao_feita: []
            })

            await userParRef.update({
                comprometido: true,
                solicitacoes_recebidas: [],
                solicitacao_feita: []
            })

            console.log('deu certo carai')
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text>{user.nome}</Text>
            <Text>{user.email}</Text>
            <TouchableOpacity onPress={aceitaSolicitacao}>
                <Text>Aceitar</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}