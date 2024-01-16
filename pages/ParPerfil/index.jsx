import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, View, Text, Image } from "react-native";
import styles from "./style";

export default function ParPerfil({ route }){
        const { userId } = route.params; // Obtém o userId dos parâmetros de rota
        const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        const userRef = firestore().collection('usuarios').doc(userId);
    
        const fetchUserData = async () => {
            try {
            const userSnapshot = await userRef.get();
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
            </SafeAreaView>
        );
}