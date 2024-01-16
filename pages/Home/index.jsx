import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";

export default function HomeScreen(){
    const [ isComprometido, setIsComprometido ] = useState(false);
    const [ userId, setUserId ] = useState('');
    const [ userData, setUserData ] = useState(null);
    const navigation = useNavigation(); // Inicialize o hook useNavigation

    const navigateToUserProfile = (userId) => {
        navigation.navigate('ParPerfilScreen', { userId });
    };

    const userRef = firestore()
                .collection('usuarios')
                .doc(userId);

    const fetchUserData = async () => {
        try {
            const userSnapshot = await userRef.get();
            if (userSnapshot.exists) {
                const userData = userSnapshot.data();
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

        function renderItem({ item }){
            <TouchableOpacity>
                <Text></Text>
            </TouchableOpacity>
        }

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
                                <Image style={styles.perfilPar} source={require('../../assets/images/lovetwin.png')}/>
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