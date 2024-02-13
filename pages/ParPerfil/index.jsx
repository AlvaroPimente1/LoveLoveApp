import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import getUserID from "../../utils/getUserID";
import Loading from "../../components/Loading";
import { ButtonConfirmar, TextButton, TextInfos } from "../../styled/global.styles";

export default function ParPerfil({ route, navigation }){
    const { userId } = route.params; 
    const [ userData, setUserData ] = useState(null);
    const [ textStatus, setTextStatus ] = useState('');

    const userParRef = firestore().collection('usuarios').doc(userId);
    const userRef = firestore().collection('usuarios').doc(getUserID());

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userSnapshot = await userParRef.get();
                if (userSnapshot.exists) {
                    const userData = userSnapshot.data();
                    setUserData(userData);
                    if(userData.comprometido){
                        setTextStatus('Indisponível');
                    } else {
                        setTextStatus('Disponível');
                    }
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
                    
                <View>
                    <View style={styles.containerFoto}>
                        <Image style={styles.fotoPerfil} source={{ uri: userData.image }}/> 
                    </View>
                    <View style={styles.containerInfo}>
                        <View style={styles.itensInfo}>
                            <TextInfos>Nome: {userData.nome}</TextInfos>
                            <TextInfos>Email: {userData.email}</TextInfos>
                            <TextInfos>Status: {textStatus}</TextInfos>
                        </View>
                        {
                                userData.comprometido ? <Text></Text>
                                :
                                <ButtonConfirmar
                                style={styles.button}
                                    onPress={solicitarConexao}
                                >
                                        <TextButton>Conectar</TextButton>
                                </ButtonConfirmar>
                            }
                    </View>
                </View>
                ) : (
                    <Loading/>
                )}
                <Text></Text>
            </SafeAreaView>
        );
}