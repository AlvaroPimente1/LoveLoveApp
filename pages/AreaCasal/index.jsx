import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Image, ScrollView, Button, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";
import Loading from "../../components/Loading";
import ButtonMenu from "../../components/ButtonsMenu";

export default function AreaCasal({ navigation }) {
    const [ dadosCasal, setDadosCasal ] = useState(null);
    const [ user, setUser ] = useState(null);
    const [ userPar, setUserPar ] = useState(null);
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

            const userData1 = userRef1.exists ? userRef1.data() : null;
            const userData2 = userRef2.exists ? userRef2.data() : null;

            if (userData1 && userData2) {
                if (userData1.uid === getUserID()) {
                    setUser(userData1);
                    setUserPar(userData2);
                } else if(userData2.uid === getUserID()) {
                    setUser(userData2);
                    setUserPar(userData1);
                } 
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
            {dadosCasal && user && userPar ? (
                <SafeAreaView style={styles.container}>
                    <View style={styles.banner}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={styles.icon} source={{ uri: user.image }} /> 
                        
                            <Image style={styles.icon} source={{ uri: userPar.image }} /> 
                        </View>

                        <View style={{ marginHorizontal: '5%' }}>
                            <Text style={{ fontSize: 30, color: '#fff' }}>Bem vindos!</Text>
                            <Text style={styles.textBox}>{user.nome} e {userPar.nome}</Text>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 2 }}>
                        <View style={{ marginHorizontal: 10, marginTop: 8 }}>

                            <View style={styles.containerOpcoes}>
                                <ButtonMenu
                                    icon={require('../../assets/images/calendarioIcon.png')}
                                    label="Calendário"
                                    onPress={() => navigation.navigate('CalendarioScreen', { casalId: casalId })}
                                />

                                <ButtonMenu
                                    icon={require('../../assets/images/mailIcon.png')}
                                    label="Mensagens"
                                    onPress={() => navigation.navigate('MensagemScreen', { casalId: casalId, userInfo: user, userParInfo: userPar, dadosCasal: dadosCasal })}
                                />
                            </View>

                            <View style={styles.containerOpcoes}>
                                <ButtonMenu
                                    icon={require('../../assets/images/restaurantIcon.png')}
                                    label="Dates"
                                    onPress={() => navigation.navigate('DateScreen', { casalId: casalId })}
                                />

                                <ButtonMenu
                                    icon={require('../../assets/images/Amigos.png')}
                                    label="Casais Amigos"
                                    onPress={() => navigation.navigate('CalendarioScreen', { casalId: casalId })}
                                />
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
