import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Image, ScrollView, Button } from "react-native";
import styles from "./style";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";

export default function AreaCasal() {
    const [dadosCasal, setDadosCasal] = useState(null);
    const [dadosUsuario1, setDadosUsuario1] = useState(null);
    const [dadosUsuario2, setDadosUsuario2] = useState(null);

    const localizaColecaoCasal = async () => {
        const userID = getUserID();
        const casaisCollectionRef = firestore().collection('casais');
        try {
            let casalData;
            const querySnapshot = await casaisCollectionRef
                .where('userRef1', '==', userID)
                .get();

            if (!querySnapshot.empty) {
                casalData = querySnapshot.docs[0].data();
            } else {
                const querySnapshot2 = await casaisCollectionRef
                    .where('userRef2', '==', userID)
                    .get();
                if (!querySnapshot2.empty) {
                    casalData = querySnapshot2.docs[0].data();
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
        <SafeAreaView style={styles.container}>
            {dadosCasal && dadosUsuario1 && dadosUsuario2 ? (
                <View>
                    <View style={styles.banner}>
                        <Image style={styles.icon} source={require('../../assets/images/perfilTeste.jpeg')} /> 
                        
                        <Image style={styles.icon} source={require('../../assets/images/perfilTeste.jpeg')} /> 
                    </View>
                    <ScrollView>
                        <View style={{ marginHorizontal: 10, marginTop: 8 }}>
                        <Text style={{ fontSize: 23 }}>Bem vindos, {dadosUsuario1.nome} e {dadosUsuario2.nome}!</Text>
                        </View>
                    </ScrollView>
                </View>
            ) : (
                <Text>Carregando informaçoes...</Text>
            )}
        </SafeAreaView>
    );
}
