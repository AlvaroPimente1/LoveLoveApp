import React, { useState } from "react";
import styles from "./style";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";

export default function ParPerfilSolicitacaoScreen({ route, navigation }){
    const user = route.params.user;

    const colecaoUserRef = firestore().collection('usuarios');
    const userRef = colecaoUserRef.doc(getUserID());
    const userParRef = colecaoUserRef.doc(user.id);

    const casalRef = firestore().collection('casais');

    const cleanArrays = {
        solicitacoes_recebidas: [],
        solicitacao_feita: []
    }

    const aceitaSolicitacao = async() => {
        try{
            await userRef.update({
                comprometido: true,
                parceiroRef: user.id,
                ...cleanArrays
            })

            await userParRef.update({
                comprometido: true,
                parceiroRef: getUserID(),
                ...cleanArrays
            })

            await casalRef.add({
                userRef1: getUserID(),
                userRef2: user.id
            })

            navigation.navigate('DrawerNavigatorCasal');
        } catch (error) {
            console.error(error);
        }
    }

    const cancelaSolicitacao = async() => {
        try{
            await userRef.update({
                cleanArrays
            })

            await userRef.update({
                cleanArrays
            })
        } catch(error){
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

            <TouchableOpacity onPress={cancelaSolicitacao}>
                <Text>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}