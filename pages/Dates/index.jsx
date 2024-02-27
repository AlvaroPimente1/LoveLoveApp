import React from "react";
import { SafeAreaView, View, Text, FlatList, TextInput } from "react-native";
import { ContainerCenterX } from "../../styled/global.styles";
import styles from "./style";

export default function DateScreen({ route }){
    const casalId = route.params.casalId

    const dadosMocados = [
        {
            key: 1,
            nome: 'restaurante top'
        },

        {
            key: 2,
            nome: 'restaurante firme'
        },

        {
            key: 3,
            nome: 'restaurante italiano'
        }
    ]

    return(
        <ContainerCenterX>
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.input}
                />                 
            </View>

            <Text>{casalId}</Text>
        {
            dadosMocados.map((restaurantes) => {
                return(
                    <View>
                        <Text>{restaurantes.nome}</Text>
                    </View>
                )
            })
        }
        </ContainerCenterX>
    )
}