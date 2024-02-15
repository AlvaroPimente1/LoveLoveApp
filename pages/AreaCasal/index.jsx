import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import styles from "./style";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";
import Loading from "../../components/Loading";

export default function AreaCasal({ navigation }) {
    const [ dadosCasal, setDadosCasal ] = useState(null);
    const [ dadosUsuario1, setDadosUsuario1 ] = useState(null);
    const [ dadosUsuario2, setDadosUsuario2 ] = useState(null);
    const [ casalId, setCasalId ] = useState(null);

    const localizaColecaoCasal = async () => {
        const userID = getUserID();
        const casaisCollectionRef = firestore().collection('casais');
        try {
            const userRef = await firestore().collection('usuarios').doc(userID).get();
            const userData = userRef.data();

            if (!userData || !userData.parceiroRef) {
                console.error('Dados do usuário ou parceiro não encontrados.');
                return;
            }
    
            // Procurar por um casal que tenha o userID no array de referências
            const querySnapshot = await casaisCollectionRef
                .where('arrayIds', 'array-contains', userID)
                .get();
    
            let casalData;
    
            // Filtre os resultados para encontrar um documento que também contenha o parceiroRef
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.arrayIds.includes(userData.parceiroRef)) {
                    casalData = data;
                    setCasalId(doc.id);
                }
            });
    
            // Se encontrou o casal, defina os dados do casal e busque mais informações
            if (casalData) {
                setDadosCasal(casalData);
                await fetchDadosCasal(casalData);
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    const fetchDadosCasal = async (casalData) => {
        try {
            const userRef1 = await firestore().collection('usuarios').doc(casalData.userRef1).get();
            const userRef2 = await firestore().collection('usuarios').doc(casalData.userRef2).get();

            if (userRef1.exists) {
                setDadosUsuario1(userRef1.data());
            }
            if (userRef2.exists) {
                setDadosUsuario2(userRef2.data());
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const userRef = firestore().collection('usuarios').doc(getUserID());
        const unsubscribe =  userRef.onSnapshot((doc) => {
            if (doc.exists) {
                const userData =  doc.data();
                if(!userData.comprometido){
                    navigation.navigate('LoginScreen');
                }
            } else {
                console.log("Documento não encontrado");
            }
        }, (error) => {
            console.error("Erro ao observar o documento:", error);
        });
    
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        localizaColecaoCasal();
    }, []);

    return (
        <>
            {dadosCasal && dadosUsuario1 && dadosUsuario2 ? (
                <SafeAreaView style={styles.container}>
                    <View style={styles.banner}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={styles.icon} source={{ uri: dadosUsuario1.image }} /> 
                        
                            <Image style={styles.icon} source={{ uri: dadosUsuario2.image }} /> 
                        </View>

                        <View style={{ marginHorizontal: '5%' }}>
                            <Text style={{ fontSize: 30, color: '#fff' }}>Bem vindos!</Text>
                            <Text style={styles.textBox}>{dadosUsuario1.nome} e {dadosUsuario2.nome}</Text>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 2 }}>
                        <View style={{ marginHorizontal: 10, marginTop: 8 }}>

                            <View style={styles.containerOpcoes}>
                                <TouchableOpacity style={styles.ButtonOpcoes}
                                    onPress={() => navigation.navigate('CalendarioScreen', { casalId: casalId })}
                                >
                                    <Image style={styles.IconButton} source={require('../../assets/images/calendarioIcon.png')}/>
                                    <Text style={styles.textBox}>Calendário</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.ButtonOpcoes}
                                    onPress={() => navigation.navigate('MensagemScreen', { casalId: casalId })}
                                >
                                <Image style={styles.IconButton} source={require('../../assets/images/mailIcon.png')}/>
                                    <Text style={styles.textBox}>Mensagens</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.containerOpcoes}
                                onPress={() => navigation.navigate('CalendarioScreen', { casalId: casalId })}
                            >
                                <TouchableOpacity style={styles.ButtonOpcoes}
                                    onPress={() => navigation.navigate('DateScreen', { casalId: casalId })}
                                >
                                <Image style={styles.IconButton} source={require('../../assets/images/restaurantIcon.png')}/>
                                    <Text style={styles.textBox}>Dates</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.ButtonOpcoes}
                                    onPress={() => navigation.navigate('CalendarioScreen', { casalId: casalId })}
                                >
                                <Image style={styles.IconButton} source={require('../../assets/images/Amigos.png')}/>
                                    <Text style={styles.textBox}>Casais Amigos</Text>
                                </TouchableOpacity>
                            </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            <TouchableOpacity style={styles.ButtonOpcoesDanger}
                                    onPress={() => navigation.navigate('TerminoScreen', { casalId: casalId })}
                            >
                                <Image style={styles.IconButton} source={require('../../assets/images/danger.png')}/>
                                <Text style={styles.textBox}>Perigo</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            ) : (
                <Loading/>
            )}
        </>
    );
}
