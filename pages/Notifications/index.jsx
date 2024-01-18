import React, { useState, useEffect } from "react";
import styles from "./style";
import { SafeAreaView, Text, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";

export default function NotificationsScreen(){
    const [ userParId, setUserParId ] = useState(null);

    const fetchUserAndSolicitacoes = async () => {
        try {
          // Substitua 'usuários' pelo nome da sua coleção e o ID do documento pelo ID real do documento do usuário
            const documentSnapshot = await firestore()
                .collection('usuarios')
                .doc(getUserID())
                .get();
        
            if (documentSnapshot.exists) {
                const userData = documentSnapshot.data();
        
                if (userData && Array.isArray(userData.solicitacoes_recebidas)) {
                setUserParId(userData.solicitacoes_recebidas);
        
                console.log('IDs das solicitações recebidas:');
                } else {
                    console.log('O campo solicitacoes_recebidas não existe ou não é um array');
                }
            } else {
                console.log('Documento não existe');
            }
            } catch (error) {
                console.error('Erro ao buscar documento:', error);
            }
        };   
        
    useEffect(() => {
        fetchUserAndSolicitacoes();
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.containerSolicitacao}>
                <Text>{userParId}</Text>
            </View>
        </SafeAreaView>
    )
}