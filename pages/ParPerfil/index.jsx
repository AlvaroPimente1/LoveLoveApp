import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, View, Text } from "react-native";

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
        <SafeAreaView>
            {userData ? (
            <View>
                <Text>Nome: {userData.nome}</Text>
                <Text>Email: {userData.email}</Text>
                {/* Adicione outras informações do usuário aqui */}
            </View>
            ) : (
            <Text>Carregando informações do usuário...</Text>
            )}
        </SafeAreaView>
        );
}