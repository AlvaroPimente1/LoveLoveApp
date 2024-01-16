import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, Animated, FlatList, ActivityIndicatorBase } from "react-native";
import styles from "./style";
import getUserID from "../../utils/getUserID";
import PulsingHeart from "../../animated/pulserHeart";

export default function HomeScreen(){
    const [ userId, setUserId ] = useState('');
    const [ userData, setUserData ] = useState(null);
    const [ isSolicitado, setIsSolicitado ] = useState(false);

    const navigation = useNavigation();

    // Navegar para perfil do usuario selecionado
    const navigateToUserProfile = (userId) => {
        navigation.navigate('ParPerfilScreen', { userId });
    };

    useEffect(() => {
        const userRef = firestore().collection('usuarios').doc(getUserID());
    
        const unsubscribe = userRef.onSnapshot((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                if (Array.isArray(userData.solicitacao_feita) && userData.solicitacao_feita.length >= 1) {
                    setIsSolicitado(true);
                } else {
                    setIsSolicitado(false);
                }
            } else {
                console.log("Documento não encontrado");
            }
        }, (error) => {
            console.error("Erro ao observar o documento:", error);
        });
    
        return () => unsubscribe();
    }, []);

    // Carrega informacoes do usuario buscado
    const userParRef = firestore().collection('usuarios').doc(userId);

    const fetchUserData = async () => {
        try {
            const userParSnapshot = await userParRef.get();
            if (userParSnapshot.exists) {
                const userData = userParSnapshot.data();
                setUserData(userData);
            } else {
                console.log("Documento de usuário não encontrado.");
                setUserData(null);
            }
            } catch (error) {
                console.error("Erro ao buscar informações do usuário:", error);
            }
        }

        useEffect(() => {
            if (userId) {
                fetchUserData();
            }
        }, [userId]);

        return (
            <SafeAreaView style={styles.container}>
                {
                    !isSolicitado ? (
                        <>
                            <View style={styles.buscaConteiner}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Insira o código"
                                    value={userId}
                                    onChangeText={setUserId}
                                />
                                <TouchableOpacity
                                    style={styles.buscaBotao}
                                    onPress={fetchUserData}
                                >
                                    <Text style={styles.botaoText}>Buscar</Text>
                                </TouchableOpacity>
                            </View>
    
                            {userData && (
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => navigateToUserProfile(userId)}
                                        style={styles.containerUser}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={styles.perfilPar} source={require('../../assets/images/perfilTeste.jpeg')}/>
                                            <View style={{ flexDirection: 'column', paddingHorizontal: 10, justifyContent: 'center' }}>
                                                <Text>{userData.nome}</Text>
                                                <Text>{userData.email}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </>
                    ) : (
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <PulsingHeart/>
    
                            <View style={styles.containerSolicitacao}>
                                <Text>Solicitação enviada para Alvaro</Text>
                                <TouchableOpacity
                                    style={styles.botaoCancelar}
                                >
                                    <Text style={styles.textButton}>Cancelar solicitação</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </SafeAreaView>
        );
}