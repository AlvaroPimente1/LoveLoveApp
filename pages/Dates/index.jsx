import React from "react";
import { SafeAreaView, View, Text } from "react-native";

export default function DateScreen({ route }){
    const casalId = route.params.casalId

    return(
        <SafeAreaView>
            <Text>{casalId}</Text>
        </SafeAreaView>
    )
}