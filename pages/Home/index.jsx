import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import styles from "./style";

export default function HomeScreen(){
    const [ isComprometido, setIsComprometido ] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.buscaConteiner}>
                <TextInput
                    style={styles.input}
                    placeholder="Insira o código"
                />
                <TouchableOpacity
                    style={styles.buscaBotao}
                >
                    <Text style={styles.botaoText}>Buscar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}