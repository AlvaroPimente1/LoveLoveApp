import React, { useState, useEffect } from "react";
import styles from "./style";
import { SafeAreaView, View, Text, FlatList, Image } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NotificationsScreen({ navigation }) {
    const [userParIds, setUserParIds] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const userID = getUserID();
        if (!userID) {
            console.log('UserID não encontrado');
            return;
        }

        const unsubscribe = firestore()
            .collection('usuarios')
            .doc(userID)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const userData = documentSnapshot.data();
                    if (userData && Array.isArray(userData.solicitacoes_recebidas)) {
                        setUserParIds(userData.solicitacoes_recebidas);
                        fetchUserDetails(userData.solicitacoes_recebidas);
                    } else {
                        console.log('O campo solicitacoes_recebidas não existe ou não é um array');
                    }
                } else {
                    console.log('Documento não existe');
                }
            }, error => {
                console.error('Erro ao ouvir as alterações do documento:', error);
            });

        return () => unsubscribe();
    }, []);

    const fetchUserDetails = async (userIds) => {
        try {
            const users = await Promise.all(userIds.map(async (id) => {
                const userSnapshot = await firestore()
                    .collection('usuarios')
                    .doc(id) // Alterado para acessar diretamente o documento pelo ID
                    .get();
    
                if (userSnapshot.exists) {
                    return { id, ...userSnapshot.data() }; // Incluindo o ID no objeto retornado
                } else {
                    return null;
                }
            }));
    
            setUserInfo(users.filter(user => user != null));
        } catch (error) {
            console.error('Erro ao buscar detalhes do usuário:', error);
        }
    };
    

    function renderItem({ item }){
        return(
            <TouchableOpacity style={styles.containerUsuarios}
                onPress={() => navigation.navigate('ParPerfilSolicitacaoScreen', { user: item })}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.perfil} source={{ uri: item.image }}/>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 5 }}>
                        <Text>{item.nome}</Text>
                        <Text>{item.email}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={userInfo}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}