import React from "react";
import styles from "./styles";
import { SafeAreaView, View, Text } from "react-native";


export default function CalendarioScreen({ route }){
    const casalId = route.params.casalId
    
    return(
        <SafeAreaView style={styles.container}>
            <Text>{casalId}</Text>
        </SafeAreaView>
    )
}