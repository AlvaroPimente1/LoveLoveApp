import React from "react";
import { View, ActivityIndicator, Text, StyleSheet, SafeAreaView } from "react-native";

export default function Loading(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.aviso}>
                <ActivityIndicator size="large" color="#1a8fff" />
                <Text style={{ color: '#1a8fff', marginTop: 5 }}>Carregando informações</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#ffede6',
        alignItems: 'center',
        justifyContent: 'center'
    },

    aviso: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ebd9d2',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ff7e93',
    },
})