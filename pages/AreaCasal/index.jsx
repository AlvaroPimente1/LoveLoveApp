import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import styles from "./style";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";

export default function AreaCasal() {
    const [ dadosCasal, setDadosCasal ] = useState(null);
    const [ dadosUsuario1, setDadosUsuario1 ] = useState(null);
    const [ dadosUsuario2, setDadosUsuario2 ] = useState(null);
    const [ casalId, setCasalId ] = useState(null);

    const localizaColecaoCasal = async () => {
        const userID = getUserID();
        const casaisCollectionRef = firestore().collection('casais');
        try {
            let casalData;
            const querySnapshot = await casaisCollectionRef
                .where('userRef1', '==', userID)
                .get();
    
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                casalData = doc.data();
                setCasalId(doc.id); 
            } else {
                const querySnapshot2 = await casaisCollectionRef
                    .where('userRef2', '==', userID)
                    .get();
                if (!querySnapshot2.empty) {
                    const doc = querySnapshot2.docs[0];
                    casalData = doc.data();
                    setCasalId(doc.id); 
                }
            }
    
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
        localizaColecaoCasal();
    }, []);

    return (
        <>
            {dadosCasal && dadosUsuario1 && dadosUsuario2 ? (
                <SafeAreaView style={styles.container}>
                    <View style={styles.banner}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={styles.icon} source={require('../../assets/images/perfilTeste.jpeg')} /> 
                        
                            <Image style={styles.icon} source={require('../../assets/images/marilia.jpeg')} /> 
                        </View>

                        <View style={{ marginHorizontal: '5%' }}>
                            <Text style={{ fontSize: 30, color: '#fff' }}>Bem vindos, marilialv!</Text>
                            <Text style={styles.textBox}>{dadosUsuario1.nome} e {dadosUsuario2.nome}</Text>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 2 }}>
                        <View style={{ marginHorizontal: 10, marginTop: 8 }}>

                            <View style={styles.containerOpcoes}>
                                <TouchableOpacity style={styles.ButtonOpcoes}>
                                    <Image style={styles.IconButton} source={require('../../assets/images/calendarioIcon.png')}/>
                                    <Text style={styles.textBox}>Calendário</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.ButtonOpcoes}>
                                <Image style={styles.IconButton} source={require('../../assets/images/mailIcon.png')}/>
                                    <Text style={styles.textBox}>Mensagens</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.containerOpcoes}>
                                <TouchableOpacity style={styles.ButtonOpcoes}>
                                <Image style={styles.IconButton} source={require('../../assets/images/restaurantIcon.png')}/>
                                    <Text style={styles.textBox}>Dates</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.ButtonOpcoes}>
                                <Image style={styles.IconButton} source={require('../../assets/images/settings.png')}/>
                                    <Text style={styles.textBox}>Configurações</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            ) : (
                <Text>Carregando informaçoes...</Text>
            )}
        </>
    );
}
