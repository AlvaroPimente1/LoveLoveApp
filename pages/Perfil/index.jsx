import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";
import { SafeAreaView, Text, View, Alert, TouchableOpacity, Image } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import styles from "./styles";

export default function PerfilScreen(){
    const [userData, setUserData] = useState(null);

    const copyToClipboard = () => {
        Clipboard.setString(getUserID());
    };
    
    useEffect(() => {
        const userRef = firestore().collection('usuarios').doc(getUserID());
    
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
        }, [getUserID()]);
    return(
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center', marginVertical: 50 }}>
                <View style={styles.containerFoto}>
                    <Image style={styles.fotoPerfil} source={require('../../assets/images/perfilTeste.jpeg')}/> 
                </View>
                
                <View style={styles.containerInformacoes}>
                    <Text>{userData ? userData.nome : "Carregando..."}</Text>
                    <Text>{userData ? userData.email : "Carregando..."}</Text>
                    <TouchableOpacity 
                        style={styles.buttonCopy}
                        onPress={copyToClipboard}
                    >
                        <Text style={styles.buttonCopyText}>Copiar Id</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}