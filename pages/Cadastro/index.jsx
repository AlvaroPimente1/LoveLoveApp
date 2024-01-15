import React, { useState } from "react";
import auth from '@react-native-firebase/auth';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./style";

export default function CadastroScreen(){
    const [ email, setEmail ] = useState('');

    return(
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
            />

            <Text>{email}</Text>
        </SafeAreaView>
    )
}