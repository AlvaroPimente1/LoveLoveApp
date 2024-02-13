import React, { useState } from "react";
import styles from "./style";
import { SafeAreaView, View, Text, TouchableOpacity, Image } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";
import { ButtonConfirmar, TextButton, ButtonCancelar, TextInfos } from "../../styled/global.styles";

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
                        userRef2: parId,
                        arrayIds: [ userId, parId ]
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
            <View style={styles.containerFoto}>
                <Image style={styles.fotoPerfil} source={{ uri: user.image }}/>
            </View>
            <View style={styles.containerInfo}>
                        <View style={styles.itensInfo}>
                            <TextInfos>Nome: {user.nome}</TextInfos>
                            <TextInfos>Email: {user.email}</TextInfos>
                        </View>
            </View>

            <ButtonConfirmar onPress={aceitaSolicitacao}>
                <TextButton>Aceitar</TextButton>
            </ButtonConfirmar>

            <ButtonCancelar onPress={cancelaSolicitacao}>
                <TextButton>Cancelar</TextButton>
            </ButtonCancelar>
        </SafeAreaView>
    )
}