import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import styles from "./style";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";

export default function AreaCasal() {
    const [dadosCasal, setDadosCasal] = useState(null);

    const localizaColecaoCasal = async () => {
        const userID = getUserID();
        const casaisCollectionRef = firestore().collection('casais');
        try {
            const querySnapshot = await casaisCollectionRef
                .where('userRef1', '==', userID)
                .get();

            if (querySnapshot.empty) {
                const querySnapshot2 = await casaisCollectionRef
                    .where('userRef2', '==', userID)
                    .get();
                if (!querySnapshot2.empty) {
                    setDadosCasal(querySnapshot2.docs[0].data());
                }
            } else {
                setDadosCasal(querySnapshot.docs[0].data());
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        localizaColecaoCasal();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {dadosCasal ? (
                <View>
                    <Text>teste: {dadosCasal.userRef2}</Text>
                </View>
            ) : (
                <Text>Carregando informaçoes...</Text>
            )}
        </SafeAreaView>
    );
}
