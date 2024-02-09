import React from "react";
import styles from "./style";
import { SafeAreaView, Text, View } from "react-native";

export default function MensagensScreen({ route }){
    const casalId = route.params.casalId

    return(
        <SafeAreaView>
            <Text>{casalId}</Text>
        </SafeAreaView>
    )
}