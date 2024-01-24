import React from "react";
import { SafeAreaView, View, Text } from "react-native";

export default function ParPerfilSolicitacaoScreen({ route }){
    const user = route.params.user;

    return(
        <SafeAreaView>
            <Text>{user.nome}</Text>
        </SafeAreaView>
    )
}