import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import getUserID from "../../utils/getUserID";

export default function ParPerfil({ route, navigation }){
    const { userId } = route.params; 
    const [ userData, setUserData ] = useState(null);

    const userParRef = firestore().collection('usuarios').doc(userId);
    const userRef = firestore().collection('usuarios').doc(getUserID());

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userSnapshot = await userParRef.get();
                if (userSnapshot.exists) {
                    const userData = userSnapshot.data();
                    setUserData(userData);
            } else {
                console.log("Documento de usuário não encontrado.");
            }
            } catch (error) {
                console.error("Erro ao buscar informações do usuário:", error);
            }
        };
    
        fetchUserData();
        }, [userId]);

        const solicitarConexao = async() => {
            await userRef.update({
                solicitacao_feita: firestore.FieldValue.arrayUnion(userId)
            })

            await userParRef.update({
                solicitacoes_recebidas: firestore.FieldValue.arrayUnion(getUserID())
            })

            navigation.goBack()
        }
    
        return (
            <SafeAreaView style={styles.container}>
                {userData ? (
                    
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.containerFoto}>
                        <Image style={styles.fotoPerfil} source={require('../../assets/images/perfilTeste.jpeg')}/> 
                    </View>
                    <Text>Nome: {userData.nome}</Text>
                    <Text>Email: {userData.email}</Text>
                </View>
                ) : (
                <Text>Carregando informações do usuário...</Text>
                )}
                <TouchableOpacity
                    onPress={solicitarConexao}
                >
                    <Text>Conectar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
}