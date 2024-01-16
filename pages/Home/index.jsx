import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";
import getUserID from "../../utils/getUserID";

export default function HomeScreen(){
    const [ isComprometido, setIsComprometido ] = useState(false);
    const [ userId, setUserId ] = useState('');
    const [ userData, setUserData ] = useState(null);
    const [ isSolicitado, setIsSolicitado ] = useState(false);

    const navigation = useNavigation();

    // Navegar para perfil do usuario selecionado
    const navigateToUserProfile = (userId) => {
        navigation.navigate('ParPerfilScreen', { userId });
    };

    const userRef = firestore().collection('usuarios').doc(getUserID());
    const verificaUsuario = async() => {
        try{
            const userSnapshot =  await userRef.get()
            const userData = userSnapshot.data()
            if(Array.isArray(userData.solicitacao_feita) && userData.solicitacao_feita.length >= 1){
                navigation.navigate('LoginScreen')
            }
        } catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        verificaUsuario();
    }, [])

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

    return(
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    )
}